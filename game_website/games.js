

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


