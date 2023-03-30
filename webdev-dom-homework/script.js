
'use strict';

// Вопрос: считается ли это инкапсуляцией или больше издевательство 
// над кодом?

// Объект комментариев со свойствами и методами
const comments = {
    comments: [],
    get:        //Загрузить с комментарии с сервера
        function () {
            return fetch('https://webdev-hw-api.vercel.app/api/v1/Reha/comments')
                .then(response => {
                    switch (response.status) {
                        case 200:
                            return response.json();

                        case 500:
                            throw new Error('Server is broken');
                    }
                })

                .then(responseData => {
                    this.comments = responseData.comments;
                    this.render();

                }).catch(error => {
                    console.log(error.message);
                    switch (error.message) {
                        case 'Server is broken':
                            alert('Сервер сломался, попробуй позже');
                            break;

                        case 'Failed to fetch':
                            alert('Кажется, у вас сломался интернет, попробуйте позже');
                    }
                });
        },
    render: //Отрисовать, при true аргументе рисует заглушку
        function (isFirstOpen = 0) {
            const commentsList = document.querySelector('ul.comments');
            if (isFirstOpen) {
                commentsList.innerHTML = `
            <li class="comment" style="display: flex;">
            Downloading the comments... 
    
            <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            </li>`;

            } else {
                commentsList.innerHTML = this.comments.reduce((result, comment, index) => {
                    return result + `
        <li class="comment" data-id="${comment.id}" data-index="${index}">
            <div class="comment-header">
            <div>${comment.author.name}
            </div>
            <div>${this.getDate(comment.date)}
            </div >
            </div >
            <div class="comment-body">
            <div class="comment-text">   
                ${this.makeQuote(comment.text)}            
            </div>
            </div>
            <div class="comment-footer">
            <button class="delete-button">Delete</button>
      
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
            </div>
            </div>
        </li >`
                }, '');

                this.addListener();
            }
        },
    getDate: // Используется при рендере для создания JS-объекта даты
        function (date) {
            const options = {
                year: '2-digit',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }
            const newDate = new Date(date);
            return newDate.toLocaleString('ru-RU', options).replace(',', '');
        },
    addListener: // Делегирование на один листенер различных таргетов
        function () {
            const currentComments = document.querySelectorAll('li.comment');

            for (const comment of currentComments) {
                comment.addEventListener('click', (e) => {
                    const index = comment.dataset.index;
                    const likeButton = e.currentTarget.querySelector('button.like-button');
                    const deleteButton = e.currentTarget.querySelector('.delete-button');

                    if (e.target === likeButton) { this.like(index); return; }
                    if (e.target === deleteButton) { this.delete(index); return }

                    this.replyComment(index);
                })
            }
        },
    replyComment:       //Ответ на комментарий в виде цитаты
        function (index) {
            const inputComment = document.querySelector('.add-form-text');
            inputComment.value = '⟪' + this.comments[index].text +
                '\n' + this.comments[index].author.name + '⟫';
            this.render();
        },
    makeQuote: function (str) {
        return str.replaceAll('⟪', '<blockquote class="blockquote">')
            .replaceAll('⟫', '</blockquote>');
    },
    delete:
        function (index) {
            this.comments.splice(index, 1);
            this.render();
        },
    like:
        function (index) {
            const currentLikeButton = document.querySelectorAll('.like-button')[index];
            currentLikeButton.classList.add('loading-like')
            delay(2000)
                .then(() => {
                    if (this.comments[index].isLiked) {
                        this.comments[index].isLiked = false;
                        this.comments[index].likes -= 1;
                    } else {
                        this.comments[index].isLiked = true;
                        this.comments[index].likes += 1;
                    }
                    this.render();
                })
        },
    edit: // Пока не работает, ждем возможностей от API
        function (index) {

            if (this.comments[index].isEdit === false) {
                this.comments[index].isEdit = true;

            } else {
                let currentTextarea = document.querySelectorAll('.comment')[index].querySelector('textarea');

                if (currentTextarea.value !== '') {
                    this.comments[index].isEdit = false;
                    this.comments[index].text = safeInput(currentTextarea.value);
                }
            }
            this.render();
        }
}

// Объект формы добавления комментариев со свойствами и методами
const addForm = {
    formElement: document.querySelector('.add-form'),
    stub: document.querySelector('.stub'),
    inputName: document.querySelector('input.add-form-name'),
    inputComment: document.querySelector('.add-form-text'),
    // Функция переключает отображение заглушки и формы
    toggleStub: function (displayStub) {
        if (displayStub) {
            this.stub.style.display = "flex";
            this.formElement.style.display = "none";

        } else {
            this.stub.style.display = "none";
            this.formElement.style.display = "flex";
        }
    },

    addListeners:
        function () {
            const buttonAddComment = document.querySelector('.add-form-button');
            buttonAddComment.addEventListener('click', this.addComment);

            document.addEventListener('keyup', (e) => {
                if (e.code == 'Enter') this.addComment();
            });
        },

    addComment:
        function () {
            const currentDate = new Date;
            // Таймаут красного фона на полях
            function clearInputs() {
                addForm.inputName.classList.remove('error__name')
                addForm.inputName.placeholder = 'Введите ваше имя';
                addForm.inputComment.classList.remove('error__name')
                addForm.inputComment.placeholder = 'Введите ваш комментарий';
            }

            if (addForm.inputName.value === '') {
                addForm.inputName.classList.add('error__name');
                addForm.inputName.placeholder = 'Поле не может быть пустым!';
                addForm.inputComment.value = '';
                setTimeout(clearInputs, 1500);

            } else if (addForm.inputComment.value === '' || addForm.inputComment.value === '\n') {
                addForm.inputComment.classList.add('error__name');
                addForm.inputComment.placeholder = 'Поле не может быть пустым!';
                addForm.inputComment.value = '';
                setTimeout(clearInputs, 1500);

            } else {
                // Заглушка на время отправки коммента на сервер
                addForm.toggleStub(1);

                function postComment() {
                    fetch('https://webdev-hw-api.vercel.app/api/v1/Reha/comments', {
                        method: "POST",

                        body: JSON.stringify({
                            date: currentDate,
                            likes: 0,
                            isLiked: false,
                            text: safeInput(addForm.inputComment.value),
                            name: safeInput(addForm.inputName.value),
                            // Чтобы сервер падал в 50% случаев
                            forceError: true,
                        })

                    }).then(response => {
                        switch (response.status) {

                            case 201:
                                response.json().then(message => console.log(message));
                                return comments.get();

                            case 400:
                                throw new Error('Short value');

                            case 500:
                                console.warn('Server is broken');
                                postComment();
                                throw new Error('Server is broken');
                        }

                    }).then((responseData) => {
                        console.log(responseData);
                        addForm.toggleStub(0);
                        addForm.inputName.value = '';
                        addForm.inputComment.value = '';

                    }).catch(error => {
                        console.warn(error);
                        switch (error.message) {

                            case 'Short value':
                                alert('Что-то пошло не так:\n' +
                                    'Имя или текст не должны быть короче 3 символов\n');
                                addForm.toggleStub(0);
                                break;

                            case 'Server is broken':
                                addForm.toggleStub(0);
                                break;

                            case 'Failed to fetch':
                                alert('Кажется, у вас сломался интернет, попробуйте позже');
                                addForm.toggleStub(0);
                                break;
                        }
                    });
                }
                postComment();
            }
        },
}
// Функции либо общие, либо не относящиеся ни к какому объекту.
function safeInput(str) {
    return str.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

comments.render(1);//Заглушка на комментариях
addForm.addListeners(); //Добавляю обработчики событий на форму
comments.get();// Получаем с сервера и отрисовываем