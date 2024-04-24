const mongoose = require('mongoose');

const dbConnection = async function () {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongodb sucessfully");
        
    } catch (error) {

        console.log("Error connecting to mongodb", error);
        
        
    }
    
}

module.exports = dbConnection;