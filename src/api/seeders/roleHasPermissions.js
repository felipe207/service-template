const restful = require('node-restful')
const mongoose = restful.mongoose

const roleHasPermissionsSchema = new mongoose.Schema({
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },
  });

module.exports = restful.model('RoleHasPermissions', roleHasPermissionsSchema)