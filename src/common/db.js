import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://ev3_express:HkXJePGMusql7jq4@cluster-express.w1aab.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


export default client