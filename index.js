var express = require("express");
var bodyparser = require("body-parser");
var request = require("request");
var jade = require("jade");
var app  = express();

app.set("views",__dirname);
app.set("view engine","jade");

app.get("/",(req,res)=>{
    let options = {
        url: "http://localhost:3000/api/v1/course/list",
        method: "GET"
    }

    request(options,(err,response)=>{
        if(err) throw err;
        res.render("Cliente",{courses: response.body});
    })
});

app.post("/consultar/matricula",(req,res)=>{
    let options = {
        url: "http://localhost:5000/api/v1/course/enrollment/"+req.body.idStudent,
        method: "GET"
    }

    request(options,(err,response)=>{
        if(err) throw err;
        res.render("CursosMatriculados",{idStudent: req.body.idStudent,courses: response.body});
    })
})

app.post("/consultar/matricula",(req,res)=>{
    let options = {
        url: "http://localhost:5000/api/v1/course/enrollment/",
        method: "POST",
        'form': {
            'idCourse': req.body.idCourse,
            'idStudent': req.body.idStudent
        }
    }

    request(options,(err,response)=>{
        if(err) throw err;
        if(response.body=='false'){
            alert("No se pudo matricular, por qué no realizo el pago correspondiente");
        }else{
            alert("Alumno Matriculado");
        }
    })
})

app.post("/pagarCurso",(req,res)=>{
    let options = {
        'url': "http://localhost:4000/api/v1/course/payments",
        'method': "POST",
        'form': {
            'idCourse': req.body.idCourse,
            'idStudent': req.body.idStudent,
            'payment': req.body.payment
        }
    }

    request(options,(err,response)=>{
        if(err) throw err;
        if(response.body!=null){
            res.render('ConstanciaMatricula',{result: response.body});
        }
    })
})


app.listen(3030,(req,res)=>{
    console.log("Aplicación corriendo en puerto 3030");
})