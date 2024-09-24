const RoleHasPermissions = require('./roleHasPermissions')
const ModelHasRoles = require('./modelHasRoles')
const Roles = require('./roles')
const Permissions = require('./permissions')
const errorHandler = require('../common/errorHandler')
const apiResponse = require('../common/apiResponse')

Roles.after('post', errorHandler).after('put', errorHandler)
Permissions.after('post', errorHandler).after('put', errorHandler)
RoleHasPermissions.after('post', errorHandler).after('put', errorHandler)
ModelHasRoles.after('post', errorHandler).after('put', errorHandler)

module.exports = {
    register: function(router, route){
        // roles
        router.post(`${route}/role`, async (req, res) => {
            try {
                let role = new Roles(req.body);

                $roleExistente = await Roles.findOne({ name: role.name });

                if ($roleExistente) {
                    return apiResponse(res, true, 'O grupo já existe', null,400);
                    // return res.status(400).send({ error: 'O grupo já existe' });
                }

                if (!role.guard_name) {
                    role.guard_name = 'web';
                }

                const savedRole = await role.save();

                // res.status(200).send(savedRole)
                return apiResponse(res, false, 'Grupo criado com sucesso', savedRole, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao criar o grupo', null, 500);
            }
        });

        router.get(`${route}/role`, async (req, res) => {
            try {
                const roles = await Roles.find();
                // res.status(200).send(roles);
                return apiResponse(res, false, 'Grupos listados com sucesso', roles, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao listar os grupos', null, 500);
            }
        });

        router.put(`${route}/role/:id`, async (req, res) => {
            try {
                const role = await Roles.findByIdAndUpdate(req.params.id, req.body, { new: true });
                // res.status(200).send(role);
                return apiResponse(res, false, 'Grupo atualizado com sucesso', role, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send
                return apiResponse(res, true, 'Erro ao atualizar o grupo', null, 500);
            }
        }
        );

        router.delete(`${route}/role/:id`, async (req, res) => {
            try {
                const role = await Roles.findByIdAndDelete(req.params.id);
                // res.status(200).send(role);
                return apiResponse(res, false, 'Grupo deletado com sucesso', role, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao deletar o grupo', null, 500);
            }
        });
        // 
        // permissions
        router.post(`${route}/permission`, async (req, res) => {
            try {
                let permission = new Permissions(req.body);
                const savedPermissions = await permission.save();

                // res.status(200).send(savedPermissions)
                return apiResponse(res, false, 'Permissão criada com sucesso', savedPermissions, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao criar a permissão', null, 500);
            }
        });

        router.get(`${route}/permission`, async (req, res) => {
            try {
                const permissions = await Permissions.find();
                // res.status(200).send(permissions);
                return apiResponse(res, false, 'Permissões listadas com sucesso', permissions, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao listar as permissões', null, 500);
            }
        });

        router.put(`${route}/permission/:id`, async (req, res) => {
            try {
                const permission = await Permissions.findByIdAndUpdate(req.params.id, req.body, { new: true });
                // res.status(200).send(permission);
                return apiResponse(res, false, 'Permissão atualizada com sucesso', permission, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send
                return apiResponse(res, true, 'Erro ao atualizar a permissão', null, 500);
            }
        }
        );

        router.delete(`${route}/permission/:id`, async (req, res) => {
            try {
                const permission = await Permissions.findByIdAndDelete(req.params.id);
                // res.status(200).send(permission);
                return apiResponse(res, false, 'Permissão deletada com sucesso', permission, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao deletar a permissão', null, 500);
            }
        });
        // 
        //ModelHasRoles
        router.post(`${route}/modelHasRole`, async (req, res) => {
            try {
                let modelHasRole = new ModelHasRoles(req.body);
                const savedRole = await modelHasRole.save();

                // res.status(200).send(savedModelHasRole)
                return apiResponse(res, false, 'Modelo de grupo criado com sucesso', savedRole, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao criar o modelo de grupo', null, 500);
            }
        });

        router.get(`${route}/modelHasRole`, async (req, res) => {
            try {
                const modelHasRoles = await ModelHasRoles.find();
                // res.status(200).send(modelHasRoles);
                return apiResponse(res, false, 'Modelos de grupo listados com sucesso', modelHasRoles, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao listar os modelos de grupo', null, 500);
            }
        });

        router.put(`${route}/modelHasRole/:id`, async (req, res) => {
            try {
                const modelHasRole = await ModelHasRoles.findByIdAndUpdate(req.params.id, req.body, { new: true });
                // res.status(200).send(modelHasRole);
                return apiResponse(res, false, 'Modelo de grupo atualizado com sucesso', modelHasRole, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send
                return apiResponse(res, true, 'Erro ao atualizar o modelo de grupo', null, 500);
            }
        }
        );

        router.delete(`${route}/modelHasRole/:id`, async (req, res) => {
            try {
                const modelHasRole = await ModelHasRoles.findByIdAndDelete(req.params.id);
                // res.status(200).send(modelHasRole);
                return apiResponse(res, false, 'Modelo de grupo deletado com sucesso', modelHasRole, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao deletar o modelo de grupo', null, 500);
            }
        });

        //RoleHasPermission
        router.post(`${route}/roleHasPermission`, async (req, res) => {
            try {
                let roleHasPermission = new RoleHasPermissions(req.body);
                const savedRoleHasPermission = await roleHasPermission.save();

                // res.status(200).send(savedRoleHasPermission)
                return apiResponse(res, false, 'Grupo de permissão criado com sucesso', savedRoleHasPermission, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao criar o grupo de permissão', null, 500);
            }
        });

        router.get(`${route}/roleHasPermission`, async (req, res) => {
            try {
                const roleHasPermission = await RoleHasPermissions.find();
                // res.status(200).send(roleHasPermission);
                return apiResponse(res, false, 'Grupos de permissão listados com sucesso', roleHasPermission, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao listar os grupos de permissão', null, 500);
            }
        });

        router.put(`${route}/roleHasPermission/:id`, async (req, res) => {
            try {
                const role = await RoleHasPermissions.findByIdAndUpdate(req.params.id, req.body, { new: true });
                // res.status(200).send(role);
                return apiResponse(res, false, 'Grupo de permissão atualizado com sucesso', role, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send
                return apiResponse(res, true, 'Erro ao atualizar o grupo de permissão', null, 500);
            }
        }
        );

        router.delete(`${route}/roleHasPermission/:id`, async (req, res) => {
            try {
                const roleHasPermission = await RoleHasPermissions.findByIdAndDelete(req.params.id);
                // res.status(200).send(roleHasPermission);
                return apiResponse(res, false, 'Grupo de permissão deletado com sucesso', roleHasPermission, 200);
            } catch (err) {
                console.log(err);
                // res.status(500).send(err);
                return apiResponse(res, true, 'Erro ao deletar o grupo de permissão', null, 500);
            }
        });
    }
}