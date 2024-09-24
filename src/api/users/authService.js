const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('./users')
const env = require('../../.env')
// const env = require('../.env')
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/
const crypto = require('crypto');

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const login = async (req, res, next) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    try {
        const user = await Users.findOne({ email });
        console.log('user:',user.password);
        console.log('password   :',password);
        console.log('env.authSecret:',env.authSecret);
        
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, env.authSecret, {
                expiresIn: '1 day'
            });
            const { name, email } = user;
            return res.json({ name, email, token });
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
        }
    } catch (err) {
        console.log('erro:',err);
        return sendErrorsFromDB(res, err);
    }
};

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}


const signup = async (req, res, next) => {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] });
    }

    if (!password.match(passwordRegex)) {
        console.log('ln 98');
        return res.status(400).send({
            errors: [
                'A senha precisa ter: uma letra maiúscula, uma letra minúscula, um número, um caractere especial(@#$%) e tamanho entre 6 - 20.'
            ]
        });
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] });
    }

    try {
        const user = await Users.findOne({ email });

        if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] });
        } else {
            const newUser = new Users({ name, email, password: passwordHash });
            await newUser.save();
            login(req, res, next);
        }
    } catch (err) {
        console.log('erro:',err);
        // console.log('res:',res);
        return sendErrorsFromDB(res, err);
    }
};


module.exports = { login, signup, validateToken }