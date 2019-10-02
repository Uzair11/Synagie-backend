// src/rules/user.rules.ts

import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import * as jwt from 'jsonwebtoken'
import * as nconf from 'nconf';

import { User } from '../models/User'

const jwtSecret = nconf.get('jwtSecret');

interface jwtInterface {
    id: String
}

export const userValidate = {
    forRegister: [
        check('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => User.findOne({ where: { email } }).then(u => !!!u)).withMessage('Email exists'),
        check('password')
            .isLength({ min: 8 }).withMessage('Invalid password'),
        check('user_role')
            .exists().withMessage('User Role is Required')
            .isIn(['admin', 'warehousestaff', 'enterprise', 'multitenant'])
            .withMessage('Invalid User Role'),
        check('first_name')
            .isLength({ min: 1 }).withMessage('First Name is Required'),
        check('last_name')
            .isLength({ min: 1 }).withMessage('Last Name is Required'),
    ],
    forLogin: [
        check('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => User.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid email or password'),
        check('password')
            .isLength({ min: 1 }).withMessage('Password Required')
    ],
    isAuthenticated: async (req, res, next) => {
        const jwtToken = req.headers.token;
        try {
            const decoded: Object = await jwt.verify(jwtToken, jwtSecret);
            const user = User.findOne({ where: { email: decoded['id'] } })
            if (user) {
                next();
            }
        } catch (ex) {
            res.status(401);
            return res.json({
                'error': 'NOT_AUTHORIZED'
            });
        }
    }
}
