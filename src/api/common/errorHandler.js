const _= require('lodash');

module.exports = (req, res, next) => {

    const bundle = res.locals.bundle;
    
    //a lista de erros fica dentro de bundle.errors
    if(bundle.errors) {
        const errors = parseErrors(bundle.errors);
        res.status(500).json({ errors });
    } else {
        next();
    }
}

const parseErrors = (nodeRestfulErrors) => {
    const errors = [];

    //os errors é um objeto que retorna atualmente essa interação é o que permite pegar a mensagem de erro
    _.forIn(nodeRestfulErrors, error => errors.push(error.message));
    return errors;
}