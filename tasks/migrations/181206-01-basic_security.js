'use strict'
const path = require('path')
const Parse = require('parse/node')

/**
 * Do not delete this export as it is needed by the runner
 */
exports.getVersion = () => {
  return __filename.replace(path.join(__dirname, '/'), '')
}

/**
 * Write your up migration here
 *   On success call cb(null, true)
 *   On error call cb(err, false)
 *
 * @param {Object} db is an instance to the mongodb driver
 * @param {Object} cb is the callback, expects an error and a result (err, result)
 */
exports.up = async (db, cb) => {
  const ADMINISTRATOR = 'Administrador'
  const OPERATOR = 'Operador'

  Parse.initialize(process.env.APP_ID, process.env.PARSE_SERVER_JAVASCRIPT_KEY)
  Parse.serverURL = process.env.PARSE_SERVER_URL
  Parse.masterKey = process.env.PARSE_SERVER_MASTER_KEY

  try {
    const adminRole = await getRoleByName(ADMINISTRATOR)
    const operatorRole = await getRoleByName(OPERATOR)
    const adminUser = await getUserByName(ADMINISTRATOR)
    const operatorUser = await getUserByName(OPERATOR)
    await assignUserToRole(adminRole, adminUser)
    await assignUserToRole(operatorRole, operatorUser)
  } catch (e) {
    console.error(e)
    cb(e, false)
  }

  cb(null, true)
}

const getRoleByName = async (name) => {
  const rolesQuery = new Parse.Query(Parse.Role)
  rolesQuery.equalTo('name', name)
  let role = await rolesQuery.first()
  if (!role) {
    role = await createRoleByName(name)
  }
  return role
}

const createRoleByName = async (name) => {
  const roleACL = new Parse.ACL()
  roleACL.setPublicReadAccess(true)
  const role = new Parse.Role(name, roleACL)
  return role.save()
}

const getUserByName = async (name) => {
  const usersQuery = new Parse.Query(Parse.User)
  usersQuery.equalTo('username', name)
  let user = await usersQuery.first()
  if (!user) {
    user = await createUserByName(name)
  }
  return user
}

const createUserByName = async (name) => {
  const user = new Parse.User()
  return user.save({ username: name, password: 'abcd1234' })
}

const assignUserToRole = async (role, user) => {
  try {
    role.getUsers().add(user)
    await role.save({}, { useMasterKey: true })
  } catch (e) {
    console.error(e)
  }
}
