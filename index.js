const fs = require('fs');
const csvWriter = require('csv-write-stream');
const heapSort = require('./heapSort').heapSort;
const insertionSort = require('./insertionSort').insertionSort;
const bubbleSort = require('./bubbleSort').bubbleSort;
const countingSort = require('./countingSort').countingSort;



let data = CSV(100, 1000); // param1*param2 = maximum number of elements in an array



let writer = csvWriter({headers: ['number', 'bubbleSort', 'heapSort', 'insertionSort', 'countingSort']});



writer.pipe(fs.createWriteStream('./data.csv'));

for (let i = 0; i < data.length; i++) {
  writer.write(data[i]);
}

console.log('done');
writer.end();

/**
 * Generate Array
 * @param {number} size array size 
 * @param {number} numOfIntegers number of integers of each number
 */
function generateArray(size, numOfIntegers) {

  let arr = [];


  
  let timeArrayStart = Date.now();
  

  for (let i=0; i<= size; i++) {
    arr.push(Math.floor(Math.random()*numOfIntegers));
  }

  let timeArrayStop = Date.now();
  //console.log("time taken to generate the array " + (timeArrayStop - timeArrayStart) + " milliseconds.");

  return arr;
}

/**
 * 
 * @param {number} numOfSteps how many data points
 * @param {*} arraySize how big the array is
 */
function CSV(numOfSteps, arraySize) {
  
  let arr1 = [];

  for (let i = 0; i <= numOfSteps; i++) {
    let obj = {};
    let num = arraySize*i;
    obj.number = num;
    let generatedArray = [];

    generatedArray = generateArray(num, 10000);
    console.log(generatedArray);
    let t3 = Date.now();
    
    bubbleSort(generatedArray);

    let tt3 = Date.now() - t3;

    obj.bubbleSort = tt3;
    
    generatedArray = generateArray(num, 10000);

    let t0 = Date.now();
    
    heapSort(generatedArray);
    
    let t = Date.now() - t0;

    obj.heapSort = t;
    
    generatedArray = generateArray(num, 10000);

    let t1 = Date.now();
    insertionSort(generatedArray);

    let tt = Date.now() - t1;

    obj.insertionSort = tt;

    generatedArray = generateArray(num, 10000);

    let countSortStart = Date.now();

    countingSort(generatedArray);

    let countSortTime = Date.now() - countSortStart;

    obj.countingSort = countSortTime;


    arr1.push(obj);
  }

  return arr1;

}