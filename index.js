const express = require('express')
const app = express()
const patientsRouter = require('./src/routes/v1/patients')
const historyRouter = require('./src/routes/v1/history')
const AuthRouter = require('./src/routes/v1/auth')
const {verifyToken} = require('./src/middlewares/verifyJWT')
const {isAdmin} = require('./src/middlewares/IsAdmin')

require('dotenv').config()

const LOCALHOST = process.env.HOST;
const DB_PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const APP_PORT = process.env.APP_PORT;

// Connecting to  MongoDB
const mongoose = require('mongoose')
if(process.env.environment == 'development')
{
    mongoose.connect(`mongodb://${LOCALHOST}:${DB_PORT}/${DATABASE}`);
}
if(process.env.environment == 'staging')
{
    mongoose.connect(process.env.MONGO_CLOUD_CONNECTION);

}
const db = mongoose.connection;
db.on('error',(e)=>{
    console.error(e)
})

db.once('open', ()=>{
    console.log('Connected to DB successfully')
})

// middlwares
app.use(express.json())

// for testing
app.get('/', (req, res)=>{
    res.send('<h1>This is Clinic Restful API</h1>')
});

// call routers

app.use('/api/v1/patients',[
    verifyToken,
    isAdmin
],patientsRouter);
app.use('/api/v1/history',[
    verifyToken
],historyRouter);
app.use('/api/v1/auth',AuthRouter);

app.listen(APP_PORT)