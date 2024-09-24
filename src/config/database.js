const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// module.exports = mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });

// const dbURL = 'mongodb://127.0.0.1:27017/mymoney';  
const dbURL = process.env.MONGO_URL || 'mongodb://l127.0.0.1:27017/mymoney';

mongoose.connect(dbURL, { useNewUrlParser: true})
  .then(() => console.log('Conectado ao MongoDB com sucesso'))
  .catch(err => console.error('Erro ao se conectar ao MongoDB:', err));

//isso dá a flag ausente no retorna da api
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'.";
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'.";
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'.";

module.exports = mongoose;