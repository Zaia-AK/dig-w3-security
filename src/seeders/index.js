const mongoose = require('mongoose')
require('dotenv').config()

const LOCALHOST = process.env.HOST;
const DB_PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

const seed = require('./rolesSeeder')
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

db.once('open', async ()=>{
    console.log('Connected to DB successfully')
    console.log('Seeding Started')
    await seed()
    console.log('Data seeded')
    db.close()
})