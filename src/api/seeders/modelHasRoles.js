const restful = require('node-restful')
const mongoose = restful.mongoose

const modelHasRolesSchema = new mongoose.Schema({
    modelId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  });

module.exports = restful.model('ModelHasRoles', modelHasRolesSchema)