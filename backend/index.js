const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const Question = require('./Schema');
const logReq = require('./LoginSchema');

const app = express();

app.use(bodyParser.json());

mongoose
    .connect('mongodb+srv://Vahe:pass555@cluster0.08b0r.mongodb.net/quiztry?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true })
    .then((res)=>console.log('Connected to DB'))
    .catch((error)=>console.log(error))

app.get('/', async (req, res) => {
           try{
            const quiz = await Question.find()
            res.status(200).send(quiz); 
           }catch(err){
            console.error(err);
            res.status(400).send({message: "Something went wrong, please try again latter."})
           }
        })


        app.get('/Admin',(req, res)=>{
        Question.find((err, data)=>{
        if (err) {
            console.log(err);
        }
        res.json(data);
    })
})

app.post('/Admin',((req, res)=>{
    const {questionTitle, answers, correctAnswer} = req.body;
    const newQuestion = new Question({questionTitle, answers, correctAnswer});
    newQuestion.save().then((result)=> res.send(result)).catch((error)=>console.log(error))
}))

app.delete('/deleteQuestion/:id', (req, res) => {
    const id = req.params.id;
    Question.deleteOne({_id: id}, (err) => {
        if (err) {
            res.status(400).send({message: err.message});
        }}
    );
});

app.put('/editQuestion/:id', (req,res)=>{
    const id = req.params.id;
    const {questionTitle, answers, correctAnswer} = req.body;
    const editQuestion = new Question({questionTitle, answers, correctAnswer});
    Question.findOneAndUpdate({_id:id}, {questionTitle: editQuestion.questionTitle, answers: editQuestion.answers, correctAnswer: editQuestion.correctAnswer,}).then((result)=> res.send(result)).catch((error)=>console.log(error))
})

app.post('/login',async (req,res)=>{
    const {username, password} = req.body;
    let data = {}
    try{
        data = await logReq.findOne({username:username, password:password})
    }catch(e){
        console.error(e);
        res.status(400).send({message: e.message});
    }
    res.status(200).send(data)
})


app.listen(5000, ()=>{console.log('Server Started')});