const restful = require('node-restful')
const mongoose = restful.mongoose
const { update } = require('lodash')

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  guard_name: {type:String, required: true }
});

module.exports = restful.model('Roles', roleSchema)