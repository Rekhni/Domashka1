// 1 задание

// let str = 'js';

// console.log(str.toUpperCase());

////////////////////////////////////////

// 2 задание

// const arr = ['ремонт', 'РЕклама', 'рЕжим', 'дом', 'АвТомОбиль'];
// substr = 'ре';
// newArr = [];

// const searchStart = (array, startwith) => {
//     for (i = 0; i < array.length; i++) {
//         if (array[i].toLowerCase().startsWith(startwith.toLowerCase())){
//             newArr.push(array[i]);
//         } else {
//             continue;
//         }
//     }
//     return newArr;
// }   


// console.log(searchStart(arr, substr));

/////////////////////////////////////////////////////////////////

// 3 задание

// let float = 32.58884;

// let int1 = Math.floor(float);
// console.log(`Округление до меньшего целого ${int1}`);

// let int2 = Math.ceil(float);
// console.log(`Округление до большего целого ${int2}`);

// let int3 = Math.round(float);
// console.log(`Округление до ближайшего целого ${int3}`);

/////////////////////////////////////////////////////////////////

// 4 задание

// const nums = [52, 53, 49, 77, 21, 32];


// function biggestSmallest(arr) {
//     const biggest = Math.max(...arr);
//     const smallest = Math.min(...arr);

//     return `Наибольшее число будет ${biggest}\n
// Наименьшее число будет ${smallest}`;
// }

// console.log(biggestSmallest(nums));

/////////////////////////////////////////////////////////////////

// 5 задание

// function randomNumber(minValue, maxValue) {
//     let randNum = Math.round(Math.random() * (maxValue - minValue)) + minValue;
//     return randNum;
// }

// console.log(randomNumber(1, 10));

/////////////////////////////////////////////////////////////////

// 6 задание

// function getRandomArrNum(n) {
//     arr = []
//     halfArr = Math.floor(n/2);
//     for (i = 0; i < halfArr; i++) {
//         let randNum = Math.round(Math.random() * n);
//         arr.push(randNum);
//     }
//     return arr;
// }

// console.log(getRandomArrNum(12));

/////////////////////////////////////////////////////////////////

// 7 задание 

// function getRandomNum(a, b) {
//     let randNum = Math.round(Math.random() * (b - a)) + a;
//     return randNum;
// }

// console.log(getRandomNum(1, 100));

/////////////////////////////////////////////////////////////////

// 8 задание

// let currentDate = new Date();

// console.log(currentDate);

/////////////////////////////////////////////////////////////////

// 9 задание

// let myDate = new Date();

// myDate.setDate(myDate.getDate() + 73);

// console.log(myDate);

/////////////////////////////////////////////////////////////////

// 10 задание

// function userDate() {
//     myDate = new Date("8/2/1999");
//     let minute = myDate.getMinutes();
//     let second = myDate.getSeconds();
//     const days = ['Воскресенье', 'Cуббота', 'Понедельник', 'Вторник',
//                   'Среда', 'Четверг', 'Пятница'];
                  
//     const Month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
//                    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

//     if (minute < 10) {
//          minute = "0" + minute;
//     }
//     if (second < 10) {
//         second = "0" + second;
//     }
     
//     fullDate = "Дата: " + myDate.getDate() + " " + Month[myDate.getMonth()] + " " + myDate.getFullYear() +
//                 ", " + days[myDate.getDay()] + "\n" +  "Время: " + myDate.getHours() + ":" + minute + 
//                 ":" + second;   
//     return fullDate;
// }

// console.log(userDate());

/////////////////////////////////////////////////////////////////









