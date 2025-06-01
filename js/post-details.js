let userElementHeader = document.querySelector(".header__user__info");
let logoutMenu = document.querySelector(".header__logout");

let userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
let userNameElement = document.querySelector(".header__user__name")
//user name
userNameElement.textContent = userInfo.username;

// logout
userElementHeader.addEventListener("click", () => {
  logoutMenu.style.display = logoutMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function(e) {
  if (!userElementHeader.contains(e.target)) {
    logoutMenu.style.display = "none";
  }
});

logoutMenu.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
   window.location.href = "index.html";
})



//get post from local storage
function loadingPost(){
    let postData = JSON.parse(localStorage.getItem("onePost"));
    let postDetails = document.querySelector(".post-details")
    let postsItem = document.createElement("div");
        postsItem.classList.add("posts__item");
        postDetails.append(postsItem);
        
        //postsItemHeader
        let postsItemHeader = document.createElement("div");
        postsItemHeader.classList.add("posts__item__header");
        postsItem.append(postsItemHeader);

        let postsItemHeaderPublisher = document.createElement("div");
        postsItemHeaderPublisher.classList.add("posts__item__header__publisher");
        postsItemHeader.append(postsItemHeaderPublisher);

        let userIcon = document.createElement("i");
        userIcon.classList.add("fa-solid", "fa-user");
        postsItemHeaderPublisher.append(userIcon);

        let publisherName = document.createElement("h4");
        publisherName.textContent = `${postData.publisher}`;
        postsItemHeaderPublisher.append(publisherName);


        //postsItemText
        let postsItemText = document.createElement("p");
        postsItemText.classList.add("posts__item__text");
        postsItemText.textContent = `${postData.post}`;
        postsItem.append(postsItemText);

        
        //postsItemImage
        let postsItemImage = document.createElement("div");
        postsItemImage.classList.add("posts__item__image");
        postsItem.append(postsItemImage);

        let postImage = document.createElement("img");
        postImage.setAttribute("src", `${postData.image}`);
        postsItemImage.append(postImage);

        //postsItemBottom
        let postsItemBottom = document.createElement("div");
        postsItemBottom.classList.add("posts__item__bottom");
        postsItem.append(postsItemBottom);

        let postLike = document.createElement("div");
        postLike.classList.add("post-like");
        postLike.textContent = `${postData.likes}`
        postsItemBottom.append(postLike);

        let postLikeIcon = document.createElement("i");
        postLikeIcon.classList.add("fa-solid", "fa-thumbs-up");
        postLike.append(postLikeIcon);

        //likes local storage
        let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        let isLiked = likedPosts.includes(postData.id);

        function updateLike() {
          postLike.textContent = isLiked ? postData.likes + 1 : postData.likes;
          postLike.append(postLikeIcon);
          if (isLiked) {
            postLikeIcon.classList.add('liked');
          } else {
            postLikeIcon.classList.remove('liked');
          }
        }

        updateLike();

        postLikeIcon.addEventListener('click', () => {
          if (isLiked) {
            //remove like
            likedPosts = likedPosts.filter(id => id !== postData.id);
            isLiked = false;
          } else {
            // add like
            likedPosts.push(postData.id);
            isLiked = true;
          }
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
          updateLike();
        });

        let postCommentsNumber = document.createElement("div");
        postCommentsNumber.classList.add("post-comments-number");
        postCommentsNumber.textContent = `${postData.comments.length} comments`;
        postsItemBottom.append(postCommentsNumber)

        let postComments = document.createElement("div");
        postComments.classList.add("post-comments");
        postsItem.append(postComments);

        postData.comments.map((comment)=>{
            let postComment = document.createElement("p");
            postComment.classList.add("comment");
            postComment.textContent=`${comment}`;
            postComments.append(postComment)
        })
        


    

}
loadingPost();