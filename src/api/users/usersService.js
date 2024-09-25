const Users = require('./users')
const errorHandler = require('../common/errorHandler')
const apiResponse = require('../common/apiResponse')

Users.after('post', errorHandler).after('put', errorHandler)

module.exports = {
    register: function(router, route) {
        router.post(route, async (req, res) => {
            try {
                let user = new Users(req.body);
                user.password = user.generateHash(user.password);

                const savedUser = await user.save();
                return apiResponse(res,false,'Usuário criado com sucesso!', savedUser, 200);
            } catch (err) {
                console.log(err);
                return apiResponse(res,true,'Erro ao criar o usuário', null, 500);

            }
        });

        router.get(route, async (req, res) => {
            try {
                const users = await Users.find();
                return apiResponse(res,false,'Usuários listados com sucesso!', users, 200);
            } catch (err) {
                console.log(err);
                return apiResponse(res,true,'Erro ao listar os usuários', null, 500);
            }
        });

        router.put(`${route}/:id`, async (req, res) => {
            try {
                const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return apiResponse(res,false,'Usuário atualizado com sucesso!', user, 200);
            } catch (err) {
                console.log(err);
                return apiResponse(res,true,'Erro ao atualizar o usuário', null, 500);
            }
        }
        );

        router.delete(`${route}/:id`, async (req, res) => {
            try {
                const user = await Users.findByIdAndDelete(req.params.id);
                return apiResponse(res,false,'Usuário deletado com sucesso!', user, 200);
            } catch (err) {
                console.log(err);
                return apiResponse(res,true,'Erro ao deletar o usuário', null, 500);
            }
        });

        router.get(`${route}/count`, async (req, res) => {
            try {
                const count = await Users.countDocuments();
                return apiResponse(res,false,'Contagem realizada com sucesso!', { count }, 200);
            } catch (err) {
                console.log(err);
                return apiResponse(res,true,'Erro ao realizar a contagem', null, 500);
            }
        });

    }
}