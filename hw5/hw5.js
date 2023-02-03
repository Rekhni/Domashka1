// 1 задание

// const arr = [1, 5, 4, 10, 0, 3];

// for (let i = 0; i <= arr[3]; i++) {
//     if (arr[i] === arr[4]) {
//         break;
//     }
//     console.log(arr[i]);
// }   

///////////////////////////////////////////

// 2 задание

// const arr = [1, 5, 4, 10, 0, 3];

// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 4) {
//         console.log(`4 находится под индексом ${i}`);
//     }
// }

///////////////////////////////////////////

// 3 задание

// let arr = [1, 3, 5, 10, 20];

// arr = arr.join(' ');

// console.log(arr);

///////////////////////////////////////////

// 4 задание

// const arr = [];
// const newArr = [];

// for (let i = 0; i <= 10; i++) {
//     arr.push(Math.floor(Math.random() * 10));
//     if (arr[i] % 2 == 0) {
//         newArr.push(arr[i]);
//     } else {
//         continue;
//     }
// }

// console.log(arr);
// console.log(newArr);

///////////////////////////////////////////

// 5 задание

// let bigArr = [];

// for (let i = 0; i <= 2; i++) {
//         smallArr = [];
//         for (let j = 0; j < 3; j++){
//             randNum = Math.floor(Math.random() * 10);
//             smallArr.push(randNum);
//         }
//     bigArr.push(smallArr);
// }

// console.log(bigArr);

///////////////////////////////////////////

// 6 задание

// let arr = [1, 1, 1];

// arr = arr.concat([2, 2, 2]);
// console.log(arr);

///////////////////////////////////////////

// 7 задание

// let arr = [9, 8, 7, 'a', 6, 5];

// arr = arr.sort();
// arr.pop();

// console.log(arr);

///////////////////////////////////////////

// 8 задание

// let userInput = Number(prompt('Введите число от 1 до 10'));
// let arr = [9, 8, 7, 6, 5];

// let search = arr.includes(userInput);

// console.log(search);

///////////////////////////////////////////

// 9 задание

// string = 'abcdef';

// arrString = string.split('');

// revArrString = arrString.reverse();

// revString = revArrString.join('');
// console.log(revString);

///////////////////////////////////////////

// 10 задание

// let arr = [];
// let sum = 0

// for (let i = 0; i < 6; i++) {
//     randNum = Math.floor(Math.random() * 10);
//     arr.push(randNum);
//     sum += randNum;
// }

// console.log(arr);
// let averageNum = Math.floor(sum / arr.length);
// console.log(averageNum);

///////////////////////////////////////////

// 11 задание

// let arr = [[1, 2, 3], [4, 5, 6]];

// let newArr = [];

// for (let minArr of arr) {
//     for (let el of minArr) {
//         newArr.push(el);
//     }
// }

// console.log(newArr);

///////////////////////////////////////////

// 12 задание

// let arr = [];

// for (let i = 0; i < 6; i++) {
//     randNum = Math.floor(Math.random() * 10);
//     arr.push(randNum);
// }
// console.log(arr);

// for (let j = 0; j < arr.length; j++) {
//     sum = arr[j] + arr[j + 1] 
//     if (isNaN(sum)) {
//         continue;
//     } else {
//         console.log(sum);
//     }
// }











