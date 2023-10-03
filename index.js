import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

                    //DB work
mongoose.connect('mongodb://127.0.0.1:27017/Student');
//define today list schema
const todayListSchema=new mongoose.Schema({name:String});
//Create model
const TodayTask=mongoose.model("TodayTask",todayListSchema);
//model for work list
const WorkTask=mongoose.model("WorkTask",todayListSchema);

const app=express();
const PORT=3000;

//date
const date=new Date();
const currentYear=date.getFullYear();
const options={
    weekday:'long',
    month:'long',
    day:'numeric',
};
const current=date.toLocaleDateString('en-US',options);

app.set('view-engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//root route
app.get('/',(req,res)=>{
    TodayTask.find()
    .then((tasksArr)=>{
        res.render('index.ejs',{
            tasks:tasksArr,
            heading:current,
            year:currentYear,
        });
    })
});
app.get('/work',(req,res)=>{
    WorkTask.find()
    .then((workArr)=>{
        res.render('toDayList.ejs',{
            tasks:workArr,
            heading:'Work List',
            year:currentYear,
        });
    })
});
//route for submit form
app.post('/submitToday',(req,res)=>{
    let task=req.body.task;
    const newTask=new TodayTask({name:task});
    newTask.save()
    .then(()=>res.redirect('/'))
    .catch((error)=>console.log(error));
})
app.post('/submitWork',(req,res)=>{
    let task=req.body.task;
    const workTask=new WorkTask({name:task});
    workTask.save()
    .then(()=>res.redirect('/work'))
    .catch((error)=>console.log(error));
});
//api request
app.get('/delApi',async(req,res)=>{
    let delItem=req.query.item;
    console.log(delItem);
    const result=await TodayTask.deleteOne({_id:delItem});
    const result2=await WorkTask.deleteOne({_id:delItem});
    res.redirect('/');
});
//listen the port
app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`);
});