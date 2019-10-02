import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';
import * as jwt from 'jsonwebtoken';
import * as nconf from 'nconf';

import * as passport from '../middlewares/passport-auth';

import { UserAddModel } from '../models/User';
import { UserService } from '../services/user';


const jwtSecret = nconf.get('jwtSecret');


const userService = new UserService();

export const UserController = {
    register: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json(errors.array());

        const payload = matchedData(req) as UserAddModel;
        const user = userService.register(payload);

        return user.then(u => res.json(u));
    },

    login: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json(errors.array());

        const payload = matchedData(req) as UserAddModel;
        console.log(payload, 'payload');
        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if (err) {
                return next(err);
            }
            if (passportUser) {
                const user = passportUser;
                var superUser = false;
                if (user.user_role === 'super_user') {
                    superUser = true;
                }
                user.token = jwt.sign({ id: user.email }, jwtSecret);
                return res.json({ 'token': user.token, 'is_superuser': superUser, 'role': user.user_role });
            }

            return res.status(400).json(info);
        })(req, res, next);
    },

    get: (req, res) => {

        // const payload = matchedData(req) as UserAddModel
        const token = userService.getUserById('14J191');


        return token.then(t => res.json(t));
    },

    getAll: async (req, res) => {

        const PAGE_SIZE = req.query.size != undefined ? Number(req.query.size) : 100;
        const isPaginated = req.query.page != undefined ? true : false;
        const coloumnSort = req.query.coloumn_sort != undefined ? req.query.coloumn_sort : 'created_datetime';
        const sortType = req.query.sort_type != undefined ? req.query.sort_type : 'ASC';
        if (!isPaginated) {
            const users = await userService.getAllUsers();
            return res.json(users);
        } else {
            const offset = (Number(req.query.page) - 1) * PAGE_SIZE;
            const { count, rows } = await userService.getPaginatedUsers(offset, PAGE_SIZE, coloumnSort, sortType);
            return res.json({ totalCount: count, users: rows });
        }
    },
    updateUserPassword: (req, res) => {
        const payload = (req.body);
        const updated = userService.updateUserPassword(payload.id, payload.password);
        return updated.then(t => res.json(t));
    },
    resetUserPassword: (req, res) => {
        const payload = (req.body);
        const updated = userService.resetUserPassword(payload.email, payload.password);
        return updated.then(t => res.json(t));
    }

};
