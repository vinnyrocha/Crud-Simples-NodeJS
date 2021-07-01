const express = require("express");
const router = express.Router();
const User = require("./User");


//retorna todos os usuários

router.get("/users", (req, res) => {
    User.findAll().then(users => {
        res.statusCode = 200;
        res.send(users);
    });
});


// retorna usuario pelo id

router.get("/users/:id", (req, res) => {
     if(isNaN(req.params.id)){
        res.sendStatus(400);
     }else{
         var id = parseInt(req.params.id);

            User.findOne({where:{id: id}}).then( usuario => {
                if(usuario != undefined ){
                    res.statusCode = 200;
                    res.json(usuario);
                }else{
                    res.sendStatus(404);
                }
            
            });
     
    
    }
});



// cadastra usuario
router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined){

            
            User.create({
                email: email,
                password: password
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });

            res.statusCode = 200;
            res.send("Uauário cadastrado com sucesso !");


        }else{
            //res.redirect("/");
            res.statusCode = 422;
            res.send("Uauário já cadastrado");
            
        }
    });
});


// update usuario
router.post("/users/update", (req, res) => {
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;
    
    User.update({email: email, password: password },{
        where: {
            id: id
        }
    }).then(() => {
        res.statusCode = 200;
        res.send("Usuário alterado com sucesso !");
    }).catch(err => {
        res.send(err);
    });
});



router.post("/users/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.statusCode = 200;
                res.send("Usuário deletado com sucesso !");
            });
        }else{// NÃO FOR UM NÚMERO
            res.sendStatus(404);
            res.send("Nao é um numero");
        }
    }else{ // NULL
        res.sendStatus(404);
        res.send("erro");
    }
});


// deleta usuario passando id pela url
router.delete("/users/delete/:id", (req, res) => {
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.statusCode = 200;
                res.send("Usuário deletado com sucesso !");
            });
        }else{// NÃO FOR UM NÚMERO
            res.sendStatus(404);
            res.send("Nao é um numero");
        }
    }else{ // NULL
        res.sendStatus(404);
        res.send("erro");
    }
});







module.exports = router;