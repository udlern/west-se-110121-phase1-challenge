fetch('http://localhost:3000/images/1')
.then(resp => resp.json())
.then(renderImage)

function renderImage (image) {
  const h2 = getEl('card-title')
  h2.textContent = image.title
  const cardImage = getEl('card-image')
  cardImage.src = image.image
  const likeCount = getEl('like-count')
  likeCount.textContent = `${image.likes} likes`
  const commentContainer = getEl('comments-list')
  commentContainer.innerHTML = ''
  const firstLi = createElement('li')
  firstLi.innerText = image.comments[0].content
  const secondLi = createElement('li')
  secondLi.innerText = image.comments[1].content
  const thirdLi = createElement('li')
  thirdLi.innerText = image.comments[2].content
  commentContainer.append(firstLi,secondLi,thirdLi)
  const likeButton = getEl('like-button')
  likeButton.addEventListener('click', () => incrementLikes(likeCount, image.likes))
  const postButton = document.querySelector('.comment-button')
  postButton.addEventListener('click', () => handleCommentClick(event, commentContainer))
}

function handleCommentClick (event, commentList) {
  event.preventDefault()
  const commentText = getEl('comment').value
  commentList.append(commentText)
  document.getElementById('comment').value = ''
}

let count = 0
function incrementLikes (likeCount, likes) {
count += likes + 1
console.log(count)
likeCount.innerText = `${count} likes`
}

function getEl(id) {
  return document.getElementById(id)
}

function createElement(element) {
  return document.createElement(element)
}