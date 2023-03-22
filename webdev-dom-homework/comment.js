const buttonElement = document.getElementById('add-button');
const commentsElement = document.getElementById('comments');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const dateInputElement = document.getElementById('date-input');

let comments = [];

const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments", {
  method: "GET",
});

fetchPromise.then((response) => {
  // Запускаем преобразовываем "сырые" данные от API в json формат
  response.json().then((responseData) => {
    // получили данные и рендерим их в приложении
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: currentDateString(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });

    comments = appComments;
    renderComments();
  });
});

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
    
    // for (const likeButtonElement of likeButtonsElements) {
    //     likeButtonElement.addEventListener('click', () => {
    //         const index = likeButtonElement.dataset.index;
    //         likeButtonElement = likeButtonElement.style.backgroundImage;
    //         if (likeButtonElement.url("data:image/svg+xml,%3Csvg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M11.11 16.9482L11 17.0572L10.879 16.9482C5.654 12.2507 2.2 9.14441 2.2 5.99455C2.2 3.81471 3.85 2.17984 6.05 2.17984C7.744 2.17984 9.394 3.26975 9.977 4.75204H12.023C12.606 3.26975 14.256 2.17984 15.95 2.17984C18.15 2.17984 19.8 3.81471 19.8 5.99455C19.8 9.14441 16.346 12.2507 11.11 16.9482ZM15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z' fill='%23BCEC30' /%3E%3C/svg%3E")) {
    //             likeButtonElement.url("data:image/svg+xml,%3Csvg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z' fill='%23BCEC30'/%3E%3C/svg%3E");
    //             comments[index].likes += 1;
               
    //         } else if (likeButtonElement.url("data:image/svg+xml,%3Csvg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z' fill='%23BCEC30'/%3E%3C/svg%3E")) {
    //             likeButtonElement.url("data:image/svg+xml,%3Csvg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M11.11 16.9482L11 17.0572L10.879 16.9482C5.654 12.2507 2.2 9.14441 2.2 5.99455C2.2 3.81471 3.85 2.17984 6.05 2.17984C7.744 2.17984 9.394 3.26975 9.977 4.75204H12.023C12.606 3.26975 14.256 2.17984 15.95 2.17984C18.15 2.17984 19.8 3.81471 19.8 5.99455C19.8 9.14441 16.346 12.2507 11.11 16.9482ZM15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z' fill='%23BCEC30' /%3E%3C/svg%3E");
    //             comments[index].likes -= 1;
    //         }

            
        
    


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


renderComments();



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





    // const date = new Date();

    // let year = date.getFullYear();
    // let month = date.getMonth() + 1;
    // let day = date.getDay();
    // let hour = date.getHours();
    // let minute = date.getMinutes();

    // if (day < 10) {
    //   day = '0' + day;
    // }
    // if (month < 10) {
    //   month = '0' + month;
    // }
    // if (hour < 10) {
    //   hour = '0' + hour;
    // }
    // if (minute < 10) {
    //   minute = '0' + minute;
    // };

    // const currentDate = day + '.' + month + '.' + year + '  ' + hour + ':' + minute;


    // comments.push({
    //     name: safeInputText(nameInputElement.value),
    //     date: currentDateString,
    //     commentary: safeInputText(commentInputElement.value),
    //     likes: 0,
    //     liked: false,
    //     isEdit: false,
    //     editButtonText: ['Edit', 'Save'],
    // });

    if (commentInputElement.value === "") {
      return;
    }

    // подписываемся на успешное завершение запроса с помощью then
    fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value,
        date: currentDateString(),
        text: commentInputElement.value,
        likes: 5,
        isLiked: false,
      })
    }).then(() => {
        fetch("https://webdev-hw-api.vercel.app/api/v1/Reha/comments", {
          method: "GET",
        }).then((res) => {
          res.json().then((afterResult) => {
            // получили данные и рендерим их в приложении
            comments = afterResult.comments;
            renderComments();
          });
        });
    })

    nameInputElement.value = "";
    commentInputElement.value = "";

    renderComments();

    // renderComments();



    // const oldCommentsElement = commentsElement.innerHTML;
    // commentsElement.innerHTML = 
    //   oldCommentsElement +
    //   `<li class="comment last-comment">
    //     <div class="comment-header">
    //       <div>${nameInputElement.value}</div>
    //       <div>${currentDate}</div>
    //     </div>
    //     <div class="comment-body">
    //       <div class="comment-text">
    //         ${commentInputElement.value}
    //       </div>
    //     </div>
    //     <div class="comment-footer">
    //       <div class="likes">
    //         <span class="likes-counter">${comments.likes}</span>
    //         <button class="like-button"></button>
    //       </div>
    //     </div>
    //   </li>`
    //   return;

   
    renderComments();


  });






  console.log("It works!");
