const quizIdGenerator = (userName,suffixNumber)=>{
        
        let prefix = userName.substring(0,3).toUpperCase();
        const zeros = (5-(suffixNumber.toString().length))
        for(let i=1;i<=zeros;++i){
            prefix+="0"
        }
        return `${prefix}${suffixNumber}`;
}

module.exports = quizIdGenerator
