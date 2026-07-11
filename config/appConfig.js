require("dotenv").config();

module.exports ={
    db: {
        uri: process.env.MONGO_URI
    },
    
    server: {
        port: process.env.PORT || 5000
    }
};