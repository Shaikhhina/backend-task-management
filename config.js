const mongoose = require('mongoose'); // Corrected require statement

const db = async () => {
    try {
        const response = await mongoose.connect("mongodb://127.0.0.1:27017/task_management", { useNewUrlParser: true, useUnifiedTopology: true });

        if (response) {
            console.log("connected");
        }
    } catch (error) {
        console.log('Connection error:', error); // Logging detailed error
    }
}

db();
