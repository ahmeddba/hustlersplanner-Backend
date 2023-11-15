const express = require('express');
const connect = require('./ConfigDB/database')
const app = express();
app.use(express.json());
require('dotenv').config();

app.use((req,res) => {
    res.send("API is running...")
})

const PORT = process.env.PORT || 7888;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

connect();



app.use('/api/tasks', require('./Routes/taskRoute'));
app.use('/api/users', require('./Routes/UserRoute'));

