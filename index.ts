// src/index.ts
import * as fs from 'fs';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as nconf from 'nconf';


const PRIVATE_CONFIG_FILE = 'private.json';
const PRODUCTION_CONFIG_FILE = 'production.json';
const DEVELOPMENT_CONFIG_FILE = 'dev.json';
const CONFIG_FILE = process.env.NODE_ENV === 'development' ?
    (fs.existsSync(`config/${PRIVATE_CONFIG_FILE}`) ? PRIVATE_CONFIG_FILE : DEVELOPMENT_CONFIG_FILE)
    : PRODUCTION_CONFIG_FILE;

nconf.file({
    file: `config/${CONFIG_FILE}`
})
    .env({
        separator: '__'
    })
    .argv();


import { userRouter } from './routes/users.routes';
import { ordersRouter } from './routes/orders.routes';


const app = express();
const port = nconf.get('port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res, next) => {
    res.json('Hello world');
});

app.use(userRouter);
app.use('/sales/order', ordersRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
