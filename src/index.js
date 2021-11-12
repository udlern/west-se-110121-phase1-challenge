//Get images from server and add contents of object to DOM
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/images")
    .then((response) => response.json())
    .then((imageElements) =>
      imageElements.forEach((imageElement) => {
        const imageTitle = document.querySelector("#card-title");
        imageTitle.innerText = imageElement.title;
        const image = document.querySelector("#card-image");
        image.setAttribute("src", imageElement.image);
        const likeCount = document.querySelector("#like-count");
        likeCount.innerText = `${imageElement.likes} likes`;
        //Adding click event and listener on heart like button to increase likes whenever clicked
        const likeButton = document.querySelector("#like-button");
        likeButton.addEventListener("click", (event) =>
          handleHeartClick(event, imageElement.likes)
        );
      })
    );
   // Getting comments and removing current li's on html and replacing them with comments from the server 
  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((comments) => {
      const ulContainer = document.querySelector("#comments-list");
      const firstLi = document.querySelector('#first-li')
      const secondLi = document.querySelector('#second-li')
      const thirdLi = document.querySelector('#third-li')
      firstLi.remove()
      secondLi.remove()
      thirdLi.remove()
      comments.forEach((comment) => {
        const li = document.createElement("li");
        li.innerText = comment.content;
        ulContainer.appendChild(li);
      });
    });
});

//Function to handle heart click like button event
function handleHeartClick(event, imageLikes) {
  const likeCount = document.querySelector("#like-count");
  likeCount.innerHTML = `${imageLikes + 1} likes`;
}

//Adding click event and listener to post button 
const postButton = document.querySelector(".comment-button");
postButton.addEventListener("click", handlePostClick);

//Function to handle adding comments and them posting to the comment board when post button is clicked
function handlePostClick(event) {
  event.preventDefault();
  const commentValue = document.querySelector(".comment-input").value;
  const ulContainer = document.querySelector("#comments-list");
  const li = document.createElement("li");
  li.innerText = commentValue;
  ulContainer.appendChild(li);
  document.querySelector(".comment-input").value = ''
}
