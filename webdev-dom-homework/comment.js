
let comments = [];
renderComments(1);

function getComment() {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 500) {
          throw new Error('Server is broken'); 
        }
      })
      .then((responseData) => {
        comments = responseData.comments;
        renderComments();
      })
      .catch((error) => {
        if (error.message === 'Server is broken') {
          alert('Сервер сломался, попробуй позже');
          return;
        }
        if (error.message === 'Failed to fetch') {
          alert('Кажется, у вас сломался интернет, попробуйте позже');
          return;
        }
      })
}

getComment();


const currentDateString = (date) => {

  const options = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    const newDate = new Date(date); 
    return newDate.toLocaleDateString('ru-RU', options).replace(',', '');
} 

function renderComments(isFirstOpen = 0) {
    const commentsList = document.querySelector('ul.comments')
    if (isFirstOpen) {
      isFirstOpen = false;
      commentsList.innerHTML = `
        <li class="comment" style="display: flex;">
        Комментарии загружаются... 
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
        </li>`;

    } else {    
        commentsList.innerHTML = comments.reduce((result, comment, index) => {
          return result + `<li class="comment" data-index="${index}">
                  <div class="comment-header">
                      <div>${comment.author.name}</div>
                      <div id="date-input">${currentDateString(comment.date)}</div>
                  </div>
                  <div class="comment-body">
                      <div class="comment-text">
                          ${quote(comment.text)}
                      </div>
                  </div>
                  <button class="delete-button" data-index="${index}">Удалить</button>
                  <div class="comment-footer">
                  
                      <div class="likes">
                          <span class="likes-counter">${comment.likes}</span>
                          <button data-index="${index}" class="${comment.isliked ? 'like-button -active-like' : 'like-button'}"></button>
                      </div>
                  </div>
              </li>`;
      }, "");

      addListenerOnComments();

    }




    // console.log(commentsHtml);

  // commentsElement.innerHTML = commentsHtml
};

function renderForm(loadingStatus) {
  const addForm = document.querySelector('div.add-form');

  switch (loadingStatus) {
      case 1:
          addForm.innerHTML = ` 
          <div style="display: flex;">
            Комментарий добавляется на сервер...
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
          </div>
          `
          break;

      case 2:
          addForm.innerHTML = ` 
          <div style="display: flex;">Комментарий загружается...</div>
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
          </div>
          `
          break;

      default: addForm.innerHTML = `    
          <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="input-name" />
          <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
            id="input-comment"></textarea>
          <div class="add-form-row">
              <button class="add-form-button" id="button-add-comment">Написать</button>
          </div>`;
          // Добавляю событие на клик по кнопке добавить
          const buttonAddComment = document.querySelector('button.add-form-button');
          document.addEventListener('keyup', (e) => {
              if (e.code == 'Enter') addComment();
          });
          buttonAddComment.addEventListener('click', addComment);
  }
}
renderForm();

function addListenerOnComments() {
  const currentComments = document.querySelectorAll('li.comment');

  for (const comment of currentComments) {
      comment.addEventListener('click', (e) => {
          const index = comment.dataset.index;
          const likeButton = e.currentTarget.querySelector('button.like-button');
          // const editButton = e.currentTarget.querySelector('.edit-button');
          const deleteButton = e.currentTarget.querySelector('.delete-button');
          // const editTextarea = e.currentTarget.querySelector('textarea');

          // if (e.target === editTextarea) { return }
          if (e.target === likeButton) { changeLikesListener(index); return; }
          // if (e.target === editButton) { changeCommentListener(index); return; }
          if (e.target === deleteButton) { initDeleteButtonsListeners(index); return }

          commentResponseListener(index);
      })
  }
}





function safeInputText(str) {
  return str.replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

}

function quote(str) {
  return str.replaceAll('<', '<blockquote class="blockquote">')
    .replaceAll('>', '</blockquote>');
}

const initDeleteButtonsListeners = (index) => {
  comments.splice(index, 1);
  renderComments();
};

const commentResponseListener = (index) => {
  const inputComment = document.querySelector('.add-form-text');
  inputComment.value = '<<' + comments[index].author.name + ':' + '\n' +
        '>' + comments[index].text + '>>'; 
      renderComments();
};

const changeLikesListener = (index) => {

  function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
  } 
  const currentLikeButton = document.querySelectorAll('.like-button')[index];
  currentLikeButton.classList.add('loading-like')
  delay(2000)
      .then(() => {
          if (comments[index].isLiked) {
              comments[index].isLiked = false;
              comments[index].likes -= 1;
          } else {
              comments[index].isLiked = true;
              comments[index].likes += 1;
          }
          renderComments();
      })

  };


const changeCommentListener = (index) => {
  if (comments[index].isEdit === false) {
    comments[index].isEdit = true;
  } else {
      // Нахожу textarea
      let currentTextarea = document.querySelectorAll('.comment')[index].querySelector('textarea');

      if (currentTextarea.value !== '') {
          comments[index].isEdit = false;
          comments[index].text = safeInputText(currentTextarea.value);
      }
  }

  renderComments();

};


function addComment() {

  const nameInputElement = document.querySelector('input.add-form-name');
  const commentInputElement = document.querySelector('.add-form-text');
  const currentDate = new Date;

  function clearInputs() {
    nameInputElement.classList.remove('error__name')
    nameInputElement.placeholder = 'Введите ваше имя';
    commentInputElement.classList.remove('error__name')
    commentInputElement.placeholder = 'Введите ваш комментарий';
  }

  if (nameInputElement.value === '') {
    nameInputElement.classList.add('error__name');
    nameInputElement.placeholder = 'Поле не может быть пустым!';
    commentInputElement.value = '';
    setTimeout(clearInputs, 1500);

  } else if (commentInputElement.value === '' || commentInputElement.value === '\n') {
    commentInputElement.classList.add('error__name');
    commentInputElement.placeholder = 'Поле не может быть пустым!';
    commentInputElement.value = '';
    setTimeout(clearInputs, 1500);

  } else {
      const currentComment = commentInputElement.value;
      const currentName = nameInputElement.value;
      // подписываемся на успешное завершение запроса с помощью then
      renderForm(1);
      function postComment() {
        fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments", {
          method: "POST",
          body: JSON.stringify({
            date: currentDate,
            likes: 0,
            isLiked: false, 
            text: safeInputText(commentInputElement.value),
            name: safeInputText(nameInputElement.value),
            forceError: true,
          })
        })
          .then(response => {
            if (response.status === 201) {
              response.json().then(message => console.log(message));
              renderForm(2);
              return getComment();
            }

            if (response.status === 400) {
              throw new Error('Short name or comment');
            }

            if (response.status === 500) {
              console.warn('Server is broken');
              postComment();
              throw new Error('Server is broken');
            }

          })
          .then((responseData) => {
            console.log(responseData);
            renderForm();
          })
          .catch((error) => {
            const restore = () => {
              renderForm();
              document.querySelector('input.add-form-name').value = currentName;
              document.querySelector('.add-form-text').value = currentComment;
            }

            console.warn(error);
            if (error.message === 'Short name or comment') {
              alert('Что-то пошло не так:\n' +
              'Имя или текст не должны быть короче 3 символов\n');
            }

            if (error.message === 'Server is broken') {
              restore();
            }
            
            if (error.message === 'Failed to fetch') {
              alert('Кажется, у вас сломался интернет, попробуйте позже');
              restore();
            }
          })

          // renderComments();
  
          nameInputElement.value = "";
          commentInputElement.value = "";
      }
      postComment();

  }

}







  console.log("It works!");
