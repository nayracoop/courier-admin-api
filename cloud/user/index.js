const assignRole = async (user) => {
  await user.fetch({ useMasterKey: true })
  const query = new Parse.Query(Parse.Role)
  query.equalTo('users', user)
  const role = await query.first()
  user.set('role', role ? role.toJSON() : null)
}

const changeRoles = async (user, roleId) => {
  const query = new Parse.Query(Parse.Role)
  query.equalTo('users', user)
  const role = await query.first()
  if (role.id !== roleId) {
    await removeFromRole(user, role)
    await assignToRole(user, roleId)
  }
}

const assignToRole = async (user, roleId) => {
  const query = new Parse.Query(Parse.Role)
  query.get(roleId)
  const role = await query.first()
  await role.getUsers().add(user)
  await role.save({}, { useMasterKey: true })
  user.set('role', role ? role.toJSON() : null)
}

const removeFromRole = async (user, role) => {
  await role.getUsers().remove(user)
  await role.save({}, { useMasterKey: true })
}

const buildQuery = () => {
  const query = new Parse.Query(Parse.User)
  query.ascending('name')
  query.doesNotExist('deletedAt')
  query.include('email')
  return query
}

module.exports = {
  createUser: async (req, res) => {
    try {
      const sessionToken = req.user.getSessionToken()
      if (!sessionToken) {
        throw new Error('Usuario inválido')
      }
      const { email, username, password, role } = req.params
      const parseUser = new Parse.User()
      parseUser.setEmail(email)
      parseUser.setUsername(username)
      parseUser.setPassword(password)
      await parseUser.save({}, { useMasterKey: true })
      await assignToRole(parseUser, role.objectId)
      return res.success(parseUser.toJSON())
    } catch (e) {
      console.error(e)
      return res.error(e)
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = []
      const sessionToken = req.user.getSessionToken()
      if (!sessionToken) {
        throw new Error('Usuario inválido')
      }
      const query = buildQuery()
      const parseUsers = await query.find()
      for (const parseUser of parseUsers) {
        await assignRole(parseUser)
        let user = parseUser.toJSON()
        users.push(user)
      }
      return res.success(users)
    } catch (e) {
      console.error(e)
      return res.error(e)
    }
  },
  getUserById: async (req, res) => {
    try {
      const sessionToken = req.user.getSessionToken()
      if (!sessionToken) {
        throw new Error('Usuario inválido')
      }
      const query = buildQuery()
      const parseUser = await query.get(req.params.id)
      await assignRole(parseUser)
      return res.success(parseUser.toJSON())
    } catch (e) {
      console.error(e)
      return res.error(e)
    }
  },
  updateUser: async (req, res) => {
    try {
      const sessionToken = req.user.getSessionToken()
      if (!sessionToken) {
        throw new Error('Usuario inválido')
      }
      const { id, email, username, password, role } = req.params
      const query = buildQuery()
      const parseUser = await query.get(id)
      parseUser.setEmail(email)
      parseUser.setUsername(username)
      if (password) {
        parseUser.setPassword(password)
      }
      await parseUser.save({}, { useMasterKey: true })
      await changeRoles(parseUser, role.objectId)
      return res.success(parseUser.toJSON())
    } catch (e) {
      console.error(e)
      return res.error(e)
    }
  }
}
