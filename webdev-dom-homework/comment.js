const buttonElement = document.getElementById('add-button');
const commentsElement = document.getElementById('comments');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const dateInputElement = document.getElementById('date-input');

let comments = [];

const getComment = () => {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments", {
        method: "GET",
    })
      .then(response => {
        return response.json();
      })
      .then((responseData) => {
        // comments = responseData.comments;
        // получили данные и рендерим их в приложении
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: currentDateString(comment.date),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
          };
        })


        comments = appComments;
        renderComments();
      });
}

getComment();

const postComment = () => {

  return fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      date: currentDateString(),
      text: commentInputElement.value,
      likes: 5,
      isLiked: false,
    })
  })
}



const currentDateString = () => {

  const currentDate = new Date;
  const dateFormat = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    }
  const timeFormat = {
      hour: '2-digit',
      minute: '2-digit',
    }

    return currentDate.toLocaleDateString('ru-RU', dateFormat) +
    ' ' + currentDate.toLocaleTimeString('ru-RU', timeFormat);
} 


// const comments = [
//     {
//         name: "Micheal Scott",
//         date: "12.02.22 12:18",
//         commentary: "This will be my first comment",
//         likes: 3,
//         liked: false,
//         isEdit: false,
//         editButtonText: ['Edit', 'Save'],
//     },
//     {
//         name: "Chris Brown", 
//         date: "03.02.22 19:22",
//         commentary: " I like how this page is designed! ❤",
//         likes: 75,
//         liked: true,
//         isEdit: false,
//         editButtonText: ['Edit', 'Save'],
//     },
// ];


const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment">
                  <div class="comment-header">
                      <div>${comment.name}</div>
                      <div id="date-input">${comment.date}</div>
                  </div>
                  <div class="comment-body">
                      <div class="comment-text" data-index="${index}">
                          ${comment.isEdit ? `<textarea type="textarea" class="add-form-text" rows="4" cols="49">${comment.text}</textarea>` : quote(comment.text)}
                      </div>
                  </div>
                  <button class="delete-button">Удалить</button>
                  <div class="comment-footer">
                  
                      <div class="likes">
                          <span class="likes-counter">${comment.likes}</span>
                          <button data-index="${index}" class="${comment.liked ? 'like-button -active-like' : 'like-button'}"></button>
                      </div>
                  </div>
              </li>`;
      }).join("");



    // console.log(commentsHtml);

  commentsElement.innerHTML = commentsHtml;

  changeLikesListener();
    
  initDeleteButtonsListeners();
    
  commentResponseListener();
    
  changeCommentListener();

};





function safeInputText(str) {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;")

}

function quote(a) {
  return a.replaceAll('QUOTE_BEGIN', '<blockquote class="blockquote">')
    .replaceAll('QUOTE_END', '</blockquote>');
}

const initDeleteButtonsListeners = () => {
  const deleteButtonsElements = document.querySelectorAll(".delete-button");

  for (const deleteButtonElement of deleteButtonsElements) {
      deleteButtonElement.addEventListener('click', (event) => {
          event.stopPropagation();
          const index = deleteButtonElement.dataset.index;
          comments.splice(index, 1);
          renderComments();
      });
  } 
};

const commentResponseListener = () => {
  const responseButtonsElements = document.querySelectorAll('.comment-text');

  for (const responseButton of responseButtonsElements) {
    responseButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = responseButton.dataset.index;
      commentInputElement.value = 'QUOTE_BEGIN' + comments[index].name + ':' + '\n' +
        '>' + comments[index].commentary + 'QUOTE_END'; 
      renderComments();
    });
  }
};

const changeLikesListener = () => {
    const likeButtonsElements = document.querySelectorAll('.like-button');

    for (const likeButtonElement of likeButtonsElements) {
      likeButtonElement.addEventListener('click', (event) => {
        event.stopPropagation()
        const index = likeButtonElement.dataset.index;

        if (comments[index].liked === true) {
          comments[index].liked = false;
          comments[index].likes -= 1;
        } else {
          comments[index].liked = true;
          comments[index].likes += 1;
        };

        renderComments();
      })
    }
    

  };


const changeCommentListener = (event) => {
  const editButtonsElements = document.querySelectorAll('.edit-button');

  for (let editButtonElement of editButtonsElements) {
    editButtonElement.addEventListener('click', (event) => {
      event.stopPropagation()
      const index = editButtonElement.dataset.index;

      if (!comments[index].isEdit) {
        comments[index].isEdit = true;
      }  else {
          let currentTextarea = document.querySelectorAll('.comment')[index].querySelector('textarea');
          if (currentTextarea.value !== '') {
            comments[index].isEdit = false;
            comments[index].commentary = safeInputText(currentTextarea.value);
          }
      };

      renderComments();

    });

  }

  const allTextareas = document.querySelectorAll('textarea');
  
  for (let textarea of allTextareas) {
    textarea.addEventListener('click', (event) => {
      event.stopPropagation()
    });
  }
};



buttonElement.addEventListener("click", () => {

    nameInputElement.classList.remove('error');
    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error')
    if (nameInputElement.value === "") {
      // nameInputElement.style.backgroundColor = "red";
      nameInputElement.classList.add('error');
      return;
    }
    if (commentInputElement.value === "") {
      commentInputElement.classList.add('error');
      return;
    }
  
  
    if (commentInputElement.value === "") {
      return;
    }
  
  // подписываемся на успешное завершение запроса с помощью then
  
    postComment().then(() => {
       return getComments();
    })
  
    renderComments();
  
    nameInputElement.value = "";
    commentInputElement.value = "";
  
})







  console.log("It works!");
