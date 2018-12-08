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
  Parse.initialize(process.env.APP_ID, process.env.PARSE_SERVER_JAVASCRIPT_KEY)
  Parse.serverURL = process.env.PARSE_SERVER_URL

  let roleACL = new Parse.ACL()
  roleACL.setPublicReadAccess(true)

  let rolesQuery = new Parse.Query(Parse.Role)
  rolesQuery.equalTo('name', 'Administrador')
  let adminRole = await rolesQuery.first()

  try {
    if (!adminRole) {
      adminRole = new Parse.Role('Administrador', roleACL)
      adminRole = await adminRole.save()
    }

    rolesQuery.equalTo('name', 'Operador')
    let operatorRole = await rolesQuery.first()

    if (!operatorRole) {
      operatorRole = new Parse.Role('Operador', roleACL)
      operatorRole = await operatorRole.save()
    }

    let usersQuery = new Parse.Query(Parse.User)

    usersQuery.equalTo('username', 'admin')
    let userAdmin = await usersQuery.first()

    if (!userAdmin) {
      userAdmin = new Parse.User()
      userAdmin = await userAdmin.save({ username: 'admin', password: 'abcd2134' })
    }

    usersQuery.equalTo('username', 'operator')
    let userOperator = await usersQuery.first()

    if (!userOperator) {
      userOperator = new Parse.User()
      userOperator = await userOperator.save({ username: 'operator', password: 'abcd2134' })
    }

    adminRole.getUsers().add(userAdmin)
    adminRole.save()
    operatorRole.getUsers().add(userOperator)
    operatorRole.save()
  } catch (e) {
    console.error(e)
    cb(e, false)
  }

  cb(null, true)
}
