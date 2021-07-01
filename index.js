const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connection = require("./database/database");

const usersController = require("./users/UsersController");
const User = require("./users/User");


const cors = require("cors");
app.use(cors());



// View engine
app.set('view engine','ejs');


// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })



app.use("/",usersController);




app.listen(3000, () => {
    console.log("O servidor está rodando!")
})