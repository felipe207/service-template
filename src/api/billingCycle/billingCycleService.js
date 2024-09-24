const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')
const apiResponse = require('../common/apiResponse')

module.exports = {
    register: function(router, route) {
        router.post(route, async (req, res) => {
            try {
                const billingCycle = new BillingCycle(req.body);
                const savedBillingCycle = await billingCycle.save();
                // res.status(200).send(savedBillingCycle);
                return apiResponse(res,false,'Ciclo de pagamento criado com sucesso!', savedBillingCycle,200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res,true,'Erro ao criar o ciclo de pagamento', null, 500);
            }
        });

        router.get(route, async (req, res) => {
            try {
                const billingCycles = await BillingCycle.find();
                // res.status(200).send(billingCycles);
                return apiResponse(res,false,'Ciclos de pagamento listados com sucesso!', billingCycles, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res,true,'Erro ao listar os ciclos de pagamento', null, 500);
            }
        });

        router.put(`${route}/:id`, async (req, res) => {
            try {
                const billingCycle = await BillingCycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
                // res.status(200).send(billingCycle);
                return apiResponse(res,false,'Ciclo de pagamento atualizado com sucesso!', billingCycle, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send
                return apiResponse(res,true,'Erro ao atualizar o ciclo de pagamento', null, 500);
            }
        }
        );

        router.delete(`${route}/:id`, async (req, res) => {
            try {
                const billingCycle = await BillingCycle.findByIdAndDelete(req.params.id);
                // res.status(200).send(billingCycle);
                return apiResponse(res,false,'Ciclo de pagamento deletado com sucesso!', billingCycle, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res,true,'Erro ao deletar o ciclo de pagamento', null, 500);
            }
        });
        

        router.get(`${route}/count`, async (req, res) => {
            try {
                const count = await BillingCycle.countDocuments();
                // res.status(200).send({ count });
                // res.status(200).json({ count });
                return apiResponse(res,false,'Contagem de ciclos de pagamento realizada com sucesso!', { count }, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                // res.status(500).json({ errors: [err] });
                return apiResponse(res,true,'Erro ao contar os ciclos de pagamento', null, 500);
            }
        });

        router.get(`${route}/summary`, async (req, res) => {
            try {
                const result = await BillingCycle.aggregate([{
                    //$project (agregation) é pra criar um novo objeto
                    $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
                }, {
                    //group by no mongo
                    $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
                }, {
                    //isso omite o id do json final
                    $project: { _id: 0, credit: 1, debt: 1 }
                }]);
                // res.status(200).send(result[0] || { credit: 0, debt: 0 });
                // res.status(200).json(result[0] || { credit: 0, debt: 0 });
                return apiResponse(res,false,'Resumo dos ciclos de pagamento realizada com sucesso!', result[0] || { credit: 0, debt: 0 }, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).json({ errors: [err] });
                return apiResponse(res,true,'Erro ao realizar o resumo dos ciclos de pagamento', null, 500);
            }
        });



        // Adicione outras rotas conforme necessário (PUT, DELETE, etc.)
    }
};
