// 1 Задание

// let mult = function(...arr) {
//     const result = 'Произведение цифр будет:'
//     console.log(result);   
//     let mult = 1;
//     for (let i = 0; i < arr.length; i++) {
//         mult *= arr[i];
//     }
//     return mult; 
// }

// let sum = function(...arr) {
//     const result = 'Cумма цифр будет:'
//     console.log(result);    
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i];
//     }
//     return sum; 
// }

// let getResult = function(arr, callback) {
//     return callback(...arr);
// }


// console.log(getResult([3, 4, 1, 9], mult)); 

// console.log(getResult([3, 4, 1, 9], sum)); 

///////////////////////////////////////////////////////////////

// 2 задание

// function compareAges(a, b) { 
// 	if (a.age > b.age) return 1;
// 	if (a.age < b.age) return -1;
// 	return 0;
// }

// function getSortedArrayObj(arr, callback) {
//     for (let i = 0; i < arr.length; i++) {
// 		for (let j = i; j < arr.length; j++) {
//             if (callback(arr[i], arr[j]) > 0) {
//                 arr[i] > arr[j];
//                 if (callback) {
//                     let temp = arr[i];
//                     arr[i] = arr[j];
//                     arr[j] = temp;
//                 }
//             }
						
//         }
//     }
//     return arr;
// }

// const users = [
// 	{name: 'Jon', age: 22},
// 	{name: 'Richard', age: 18},
// 	{name: 'Anton', age: 32},
// 	{name: 'Lida', age: 23},
// 	{name: 'Bob', age: 44}
// ];

// console.log(getSortedArrayObj(users, compareAges));

///////////////////////////////////////////////////////////////

// 3 задание

// const array1 = [1, '4', 9, 'two'];

// const array2 = [1, '4', false, 9, 'two'];

// const reverseArr = function(arr) {
//     console.log(arr.reverse()); 
// }

// const toNumberArr = function(arr) {
//     arr = arr.map(Number);
//     for (let i = 0; i < arr.length; i++) {
//         if (isNaN(arr[i])) {
//             arr.pop();
//         }
//     }
//     console.log(arr);
// }

// const each = function(arr, callback) {
//     callback(arr);
// }


// console.log(each(array1, reverseArr));

// console.log(each(array2, toNumberArr));

///////////////////////////////////////////////////////////////

// 4 задание

// let i = 0;

// function incrementByOne() {
//     let currentDate = Date();
//     i++;
//     console.log(currentDate);
// }

// const intervalID = setInterval(function() {
//     incrementByOne();
//     if (i === 10) {
//         clearInterval(intervalID);
//         console.log('30 секунд прошло!');
//     }
// }, 3000)

///////////////////////////////////////////////////////////////

// 5 задание

// function calling() {
//     console.log('Звоню!')
// };

// function beeps() {
//     setTimeout(() => {
//         console.log('Идут гудки...')
//     }, 1000);
// }

// function talk(callback) {
//     setTimeout(() => {
//         console.log('Разговор')
//     }, 2000);

// }

// calling();
// beeps();
// talk();

///////////////////////////////////////////////////////////////