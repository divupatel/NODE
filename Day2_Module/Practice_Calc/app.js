const Calc = require('./Calc');


var data = process.argv;
console.log(data);

switch(data[4]){
    case '+':
        console.log("Addition of A and B is :",Calc.sum(parseInt(data[2]),parseInt(data[3])));
        break;
    case '-':
        console.log("Subtraction of A and B is :",Calc.sub(parseInt(data[2]),parseInt(data[3])));
        break;
    case '*':
        console.log("Multiplication of A and B is :",Calc.multi(parseInt(data[2]),parseInt(data[3])));
        break;
    case '/':
        if(parseInt(data[3]) === 0){
            console.log("Error: Division by zero");
        } else {
            console.log("Division of A and B is :",Calc.div(parseInt(data[2]),parseInt(data[3])));
        }
        break;
    default:
        console.log("Error: Invalid operator");
        break;

}
