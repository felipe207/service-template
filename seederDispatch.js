// const mongoose = require('./src/config/database')
const restful = require('node-restful')
const mongoose = restful.mongoose
const dbURL = process.env.MONGO_URL || 'mongodb://l127.0.0.1:27017/mymoney';
const Role = require('./src/api/seeders/roles')
const Permission = require('./src/api/seeders/permissions')
const RoleHasPermission = require('./src/api/seeders/roleHasPermissions')
const ModelHasRoles = require('./src/api/seeders/modelHasRoles')

console.log('Modelo Role:', Role);

const collectionIsEmptyOrNotExist = async (roles) => {
    try {
        const collections = await mongoose.connection.db.listCollections({ name: roles }).toArray();
        if (collections != undefined && collections.length === 0) {
            return true;
        } else {
            const count = await mongoose.connection.db.collection(roles).countDocuments();
            return count === 0;
        }
    } catch (error) {
        // console.error('Erro ao verificar a coleção:', error);
        return false;
    }
};

let objetos = [{
    "roles": [
        { name: 'Cliente', guard_name: 'web' },
        { name: 'Administrador', guard_name: 'web' }
    ]
},
{
    "permissions": [
        { name: 'Alterar Usuarios', guard_name: 'web' },
        { name: 'Exlucir Usuarios', guard_name: 'web' }
    ]
}
];

objetos.forEach(obj => {
    if (obj.roles) {
        obj.roles.forEach(role => {
            addObjs('roles', role);
        });
    }
    if (obj.permissions) {
        obj.permissions.forEach(permission => {
            addObjs('permissions', permission);
        });
    }
});

async function addObjs(modelName, objects) {
    try {
        let collectionName = modelName;
        let isCollectionEmptyOrNotExist = await collectionIsEmptyOrNotExist(collectionName);
        if (isCollectionEmptyOrNotExist) {
            for (let objectData of objects) {
                try {
                    let documento;
                    if (modelName == 'roles') {
                        documento = new Role(objectData);
                    } else if (modelName == 'permissions') {
                        documento = new Permission(objectData);
                    }
                    await documento.save();
                    console.log(`Documento ${documento.name} adicionado com sucesso`);
                } catch (documentoError) {
                    console.error(`Erro ao salvar o documento ${objectData.name}:`, documentoError);
                }
            }
        } else {
            console.log('A coleção já existe e não está vazia. Nenhum documento foi adicionado.');
        }
    } catch (error) {
        console.error('Erro ao adicionar documentos:', error);
    }
}


async function main() {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        for (let obj of objetos) {
            if (obj.roles) {
                await addObjs('roles', obj.roles);
            }
            if (obj.permissions) {
                await addObjs('permissions', obj.permissions);
            }
        }
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    } finally {
        console.log('Fechando conexão com o MongoDB...');
        mongoose.connection.close();
    }
}

main();
