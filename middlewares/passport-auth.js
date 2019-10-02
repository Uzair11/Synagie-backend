// import jwtSecret from './jwtConfig';
// import * as bcrypt from 'bcrypt'
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;
const db = require('../db/db');

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('../models/User');

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) => {
            try {
                User.findOne({
                    where: {
                        username: username,
                    },
                }).then(user => {
                    if (user != null) {
                        console.log('username already taken');
                        return done(null, false, {
                            message: 'username already taken',
                        });
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            User.create({
                                username,
                                password: hashedPassword,
                            }).then(user => {
                                console.log('user created');
                                // note the return needed with passport local
                                // remove this return for passport JWT to work
                                return done(null, user);
                            });
                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, done) => {
            console.log(User, 'uuser');
            User.findOne({
                where: {
                    email,
                },
            })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            errors: 'email or password is invalid',
                        });
                    }
                    // var hash = bcrypt.hashSync(password, 29);
                    bcrypt.compare(password, user.hashpw, function (err, res) {
                        console.log('resss', res, password, user.hashpw);
                        if (!res) {
                            return done(null, false, {
                                errors: 'email or password is invalid',
                            });
                        }
                        return done(null, user);
                    });
                })
                .catch(done => console.log('eerror'));
        },
    ),
);

module.exports = passport;
