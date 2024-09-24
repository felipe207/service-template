//o node restful é a ponte do mongo com o express
const { update } = require('lodash')
const restful = require('node-restful')
const moongose = restful.mongoose
const crypto = require('crypto');

const usersSchema = new moongose.Schema({
    _id: { type: moongose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email : { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: true },

    telefone: { type: String, required: false },
    cpf: { type: String, required: false },
    birthDate: { type: Date, required: false },
    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
    active: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, required: false }
})

// Método para gerar um hash da senha
usersSchema.methods.generateHash = function(password) {
    // return crypto.createHash('sha256').update(password).digest('hex');
    return password;
  };
  
  // Método para verificar se a senha é válida
  usersSchema.methods.validPassword = function(password) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return this.password === hash;
  };

module.exports = restful.model('Users', usersSchema)

