const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();
//console.log(JSON.stringify(process.env.CREDENTIALS))

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
// const CREDENTIALS = process.env.CREDENTIALS

class FirestoreClient {
    constructor() {
        this.firestore = new Firestore({
            projectId: CREDENTIALS.project_id,
            keyFilename: 'services/cc-tema-3-345108-e5177af1b1df.json'
        })
    }
    
    async save(collection, data) {
        const docRef = this.firestore.collection(collection).doc();
        await docRef.set(data)
    }

    async update(collection, data) {
        const docRef = this.firestore.collection(collection).doc(data.docName)
        await docRef.update(data)
    }

    async getAll(collection) {
        const snapshot = await this.firestore.collection(collection).get()
        var documents = []
        snapshot.forEach(doc => {
            documents.push(doc.data())
        })
        return documents;
    }

    async saveSubCollection(rootCol, rootDocName, subCol, subColData) {
        const docRef = this.firestore.collection(rootCol.doc(rootDocName).collection(subCol)).doc(subColData.docName);
        await docRef.set(subColData);
    }
}

const firestoreClient = new FirestoreClient();

const user = {
    docName: "FirstUser",
    username: "stefan",
    password: "password"
}

const save = async () => {
    await firestoreClient.save("users", user);
};

module.exports = {
    firestoreClient
}