const express = require('express');
const PORT = 8080;
const bodyparser = require('body-parser');
const { logging } = require('./middleware')
const { userRouter } = require('./routes');
const {initializeDB} = require('./config/dbConfig');

const app = express();
app.use(bodyparser.json());
app.use(logging);
app.use("/user", userRouter);
(async () => {
    initializeDB();
    app.listen(PORT, () => {
        console.log(`peticiones en el puerto ${PORT}`);
    })    
})();

