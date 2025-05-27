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

        let ellipsisIcon = document.createElement("i");
        ellipsisIcon.classList.add("fa-solid", "fa-ellipsis");
        postsItemHeader.append(ellipsisIcon);

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