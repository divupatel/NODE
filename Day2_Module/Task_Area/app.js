
const area = require('./area')

var data = process.argv;

console.log(data);

switch(data[4]){
    case 'triangle':
        console.log("Triangle area is :",area.triangle_area(parseInt(data[2]),parseInt(data[3])));
        break;
    case 'rectangle':
        console.log("Rectangle area is :",area.rectangle_area(parseInt(data[2]),parseInt(data[3])));
        break;
    default:
        console.log("Invalid shape");
        break;
 
}

// console.log(area.triangle_area(parseInt(data[2]),parseInt(data[3]))); // Output: 25
// console.log(area.rectangle_area(parseInt(data[2]),parseInt(data[3]))); // Output: 25