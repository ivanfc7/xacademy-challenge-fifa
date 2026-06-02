const express = require('express');
const cors = require('cors');
const PORT = 8080;
const bodyparser = require('body-parser');
const { logging, passport } = require('./middleware')
const { userRouter, playerRouter, authRouter } = require('./routes');
const {initializeDB} = require('./config/dbConfig');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger");

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyparser.json());
app.use(logging);
app.use(passport.initialize());
const options = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css'
  };
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, options) 
);

app.use("/user", userRouter);
app.use("/player", playerRouter);
app.use("/auth", authRouter);

(async () => {
    initializeDB();
    app.listen(PORT, () => {
        console.log(`peticiones en el puerto ${PORT}`);
    })    
})();