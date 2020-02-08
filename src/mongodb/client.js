import { MongoClient } from 'mongodb';

const defaultConfig = {
    dbName: 'MyDb',
};
class MondoClientSetup {
    constructor(config) {
        const { 
            dbName, 
            path
        } = Object.assign({}, defaultConfig, config);

        this.dbName = dbName;
        this.path = path;
        this.dataBase = null;
    }

    async init() {
        const client = new MongoClient('mongodb://localhost:27017');

        try {
            await client.connect();
            console.log('connected');

            const db = client.db(this.dbName);
            return db;
        } catch (err) {
            console.log(err.stack);
        }

        client.close();  
    }
    async add(collectionName, data) {
        try {
            const db = await this.init();

            if (Array.isArray(objectOrArray)) {
                await db.collection(collectionName).insertMany(objectOrArray);
                console.log('added items');
                return;
            }

            await db.collection(collectionName).insertOne(data);
            console.log('added one item');
        } catch(err) {
            console.log(err.stack);
        }
    }

    async find(collectionName, query) {
        try {
            const db = await this.init();

            const found = await db.collection(collectionName)
                .find(query)
                .toArray();
            
            return found;
        } catch(err) {
            console.log(err.stack);
        }
    }
}

export default MondoClientSetup;