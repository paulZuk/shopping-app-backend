import { MongoClient } from 'mongodb';

const defaultConfig = {
    dbName: 'MyDb',
};
class MondoClientSetup {
    constructor(config) {
        const { 
            dbName 
        } = Object.assign({}, defaultConfig, config);

        this.dbName = dbName;
        this.dataBase = null;
    }

    init(callback) {
        MongoClient.connect("mongodb://localhost:27017", (err, database) => {
            if(err) {
                throw err;
            }
            this.dataBase = database.db(this.dbName);
            callback(this.dataBase);
        });
    }
    add(collectionName, objectOrArray) {
        this.dataBase.collection(collectionName, (err, coll) => {

            if (Array.isArray(objectOrArray)) {
                coll.insertMany(objectOrArray);
                return;
            }

            coll.insertOne(objectOrArray, (err, res) => {
                console.log('Added to database');
            });
        });
    }
    update(collectionName, query, updatedData) {
        this.dataBase.collection(collectionName, (err, coll) => {
            coll.updateOne(query, updatedData, (err, res) => {
                console.log(`Data updated ${res}`)
            });
        });
    }
    find(collectionName, query, callback) {
        this.dataBase.collection(collectionName)
            .find(query)
            .toArray((err, res) => {
            if(err) throw err;
            callback(res)
        });
    }
}

export default MondoClientSetup;