let postButton = document.querySelector(".post-form__button");
let postInput = document.querySelector(".post-form__input");
let postImageFile = document.querySelector("#post-image");

let userInfo = [];
let lastPostId = 0;

//display posts from json server data
async function displayPosts(postsData = null){
  let postsElement = document.querySelector(".posts .row");

  //GET posts data
  let response = await fetch(`http://localhost:3000/posts`);
  let posts = await response.json();
  console.log(posts);
  lastPostId = posts.length;
  if(posts.length > 0){
    //postsItem
    posts.map((post)=> {

        let postsItem = document.createElement("div");
        postsItem.classList.add("posts__item");
        postsElement.append(postsItem);
        
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
        publisherName.textContent = `${post.publisher}`;
        postsItemHeaderPublisher.append(publisherName);

        let ellipsisIcon = document.createElement("i");
        ellipsisIcon.classList.add("fa-solid", "fa-ellipsis");
        postsItemHeader.append(ellipsisIcon);

        //postsItemText
        let postsItemText = document.createElement("p");
        postsItemText.classList.add("posts__item__text");
        postsItemText.textContent = `${post.post.slice(0, 250)}...`;
        postsItem.append(postsItemText);

        //readMore button
        
        let readMoreButton = document.createElement("button");
        readMoreButton.classList.add("read-more");
        readMoreButton.textContent = `read more`;

        readMoreButton.addEventListener("click", ()=>{
          localStorage.setItem("onePost", JSON.stringify(post));
          window.open(`post-details.html?id=${post.id}`)
        })
        postsItem.append(readMoreButton);
        
        //postsItemImage
        let postsItemImage = document.createElement("div");
        postsItemImage.classList.add("posts__item__image");
        postsItem.append(postsItemImage);

        let postImage = document.createElement("img");
        postImage.setAttribute("src", `${post.image}`);
        postsItemImage.append(postImage);

        //postsItemBottom
        let postsItemBottom = document.createElement("div");
        postsItemBottom.classList.add("posts__item__bottom");
        postsItem.append(postsItemBottom);

        let postLike = document.createElement("div");
        postLike.classList.add("post-like");
        postLike.textContent = `${post.likes}`
        postsItemBottom.append(postLike);

        let postLikeIcon = document.createElement("i");
        postLikeIcon.classList.add("fa-solid", "fa-thumbs-up");
        postLike.append(postLikeIcon);

        let postComments = document.createElement("div");
        postComments.classList.add("post-comments");
        postComments.textContent = `${post.comments.length} comments`;
        postsItemBottom.append(postComments)
    })
    
  }
  
}
displayPosts();


// addPost function
async function addPost(e){
    e.preventDefault();

    // image post url
    const postFile = postImageFile.files;
    console.log(postFile)
    let imageUrl = null;
    const reader = new FileReader();
    reader.onload = function () {
            imageUrl = reader.result;
    }
    reader.readAsDataURL(postFile);
    
    //fetch user
    let userResponse = await fetch("http://localhost:3000/users");
    let userInfo = await userResponse.json();
    console.log(userInfo)
    let userPublisher = userInfo[0].username;

    //fetch posts
    let response = await fetch("http://localhost:3000/posts", {
        "method": "POST",
        "body":JSON.stringify({
            "id": ++lastPostId,
            "publisher": userPublisher,
            "post": postInput.value,
            "image": imageUrl,
            "likes": 0,
            "comments": []

        })
    })

    const result = await response.json();
    console.log(result);
}
postButton.addEventListener("click", addPost)
