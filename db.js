import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+://ev3_express:MDFvdKcY7iA3mBnM@cluster-express.w1aab.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


export default client