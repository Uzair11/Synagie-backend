import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'bluebird';
import * as nconf from 'nconf';


import { User, UserModel, UserAddModel, UserViewModel } from '../models/User';
import * as express from 'express';
// import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as passport from '../middlewares/passport-auth';
import * as Sequelize from 'sequelize';
import { UpdateOptions } from 'sequelize';


const USER_ATTRIBUTES: string[] = ['user_id', 'created_datetime', 'email', 'user_role', 'company', 'is_banned'];

export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = nconf.get('jwtSecret')

    public static get userAttributes() {
        return ['id', 'email'];
    }
    private static _user
    public static get user() {
        return UserService._user;
    }

    //TODO: Handle err case and return something
    public register({ email, password, user_role: userRole, first_name: firstName, last_name: lastName }: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                let company;
                let firsthalf;
                if (userRole === 'admin') {
                    company = 'BTFL Admin';
                    firsthalf = 'ADM-' + email.slice(0, 3);
                }
                else if (userRole === 'warehousestaff') {
                    company = 'BTFL Warehouse Staff';
                    firsthalf = 'WHS-' + email.slice(0, 3);
                }
                else if (userRole === 'enterprise' || userRole === 'multitenant') {
                    userRole = 'merchant';
                    company = 'BTFL Enterprise';
                    firsthalf = 'ENT';
                    if (userRole === 'multitenant') {
                        firsthalf = 'MT';
                    }
                }
                let userId = firsthalf
                    + Math.floor(Math.random() * 10)
                    + Math.floor(Math.random() * 10)
                    + Math.floor(Math.random() * 10)
                    + Math.floor(Math.random() * 10);
                firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1);
                lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1);
                return User.create({ email, hashpw: hash, user_role: userRole, user_id: userId, company, first_name: firstName, last_name: lastName },
                    { fields: ['email', 'hashpw', 'user_role', 'user_id', 'company', 'first_name', 'last_name'] })
                    .then(u =>
                        this.getUserById(u.user_id)).catch(err => err.errors);
            });
    }

    public verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }

                UserService._user = User.findById(decoded['id']);
                resolve(true);
                return;
            });
        }) as Promise<boolean>;
    }


    public getUserById(id: string, attributes: string[] = ['user_id', 'first_name']) {
        return User.findOne({ attributes: attributes, where: { user_id: id } });
        // .then(employee => res.json({status: res.statusCode, data: employee}))
    }

    public getAllUsers() {
        return User.findAll({ attributes: USER_ATTRIBUTES });
    }

    public getPaginatedUsers(offset: number, limit: number, columnSort: string, sortType: string) {
        return User.findAndCountAll({ attributes: USER_ATTRIBUTES, offset: offset, limit: limit, order: [[columnSort, sortType]] });
    }
    public updateUserPassword(id, password) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                const update: UpdateOptions = {
                    where: { user_id: id },
                    limit: 1
                };
                User.update({ hashpw: hash }, update);
            });

    }
    public resetUserPassword(email, password) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                const update: UpdateOptions = {
                    where: { email: email },
                    limit: 1
                };
                User.update({ hashpw: hash }, update);
            });

    }
}
