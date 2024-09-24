//o node restful é a ponte do mongo com o express
const restful = require('node-restful')
const moongose = restful.mongoose

const creditSchema = new moongose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

const debtSchema = new moongose.Schema({
    name: { type: String, required: true },
    //essa msg sobrescreve o tratamento de erro do mongoose
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
    status: {
        type: String, required: false, uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    }
})    

const billingCycleSchema = new moongose.Schema({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
})



module.exports = restful.model('BillingCycle', billingCycleSchema)
