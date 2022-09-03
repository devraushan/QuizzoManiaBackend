const connectToMongo = require("../db");
const Quiz = require("../Models/Quiz");


const joiningKeyGen=async ()=>{
    try {
        
        connectToMongo();
        let quizList = await Quiz.find({});  
        
        
        const date = new Date();
        const prefixList =[1000];
        for (let x in quizList){
            prefixList.push(parseInt(quizList[x].joiningKey.slice(-4)))
        }
        let max = Math.max(...prefixList);
        const suffix = max+1;
        const month = date.getMonth()<10?`0${date.getMonth()+1}`:`${date.getMonth()+1}`;
        const day = date.getDate()<10?`0${date.getDate()}`:`${date.getDate()}`;
        return `${month}${day}${suffix}`
    } catch (error) {
        console.error(error);

    }
    
}
// joiningKeyGen().then((data)=>console.log(data));
module.exports= joiningKeyGen
