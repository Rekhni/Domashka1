
const monthInNum = () => {
    userInput = Number(prompt('Введите номер месяца'));
    
    if (userInput === 12 || userInput === 1 || userInput === 2)  {
        return `${userInput}-ый месяц года это "Зима"`;
    } else if (userInput === 3 || userInput === 4 || userInput === 5) {
        return `${userInput}-ый месяц года это "Весна"`;
    } else if (userInput === 6 || userInput === 7 || userInput === 8) {
        return `${userInput}-ый месяц года это "Лето"`;
    } else if (userInput === 9 || userInput === 10 || userInput === 11) {
        return `${userInput}-ый месяц года это "Осень"`;
    } else {
        return 'Такого месяца не существует';
    }
}


const wordGuess = () => {
    arr = ['Яблоко', 'Груша', 'Дыня', 'Виноград', 'Персик', 'Апельсин', 'Мандарин'];
    arr = arr.sort((a, b) => Math.random() - 0.5);
    alert(arr);
    firstWord = prompt('Чему равнялся первый элемент массива?')
    secondWord = prompt('Чему равнялся последний элемент массива?')
    if (firstWord.toLowerCase() == arr[0].toLowerCase() && 
    secondWord.toLowerCase() == arr[arr.length - 1].toLowerCase()) {
        return 'Поздравляю! Вы угадали оба слова!';
    } else if (firstWord.toLowerCase() == arr[0].toLowerCase() || 
    secondWord.toLowerCase() == arr[arr.length - 1].toLowerCase()) {
        return 'Вы были близки к победе!';
    } else {
        return 'Вы ответили неверно(';
    }
}

