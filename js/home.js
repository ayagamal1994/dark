let userElementHeader = document.querySelector(".header__user__info");
let logoutMenu = document.querySelector(".header__logout");

let userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
let userNameElement = document.querySelector(".header__user__name")
let lastPostId = 0;
let postButton = document.querySelector(".post-form__button");
let postInput = document.querySelector(".post-form__input");
let postImageFile = document.querySelector("#post-image");
let currentEditingPostId = null;
let currentEditingPostTextElement = null;
let saveEditPost = document.querySelector(".save-post");
let editPostTextarea = document.querySelector(".edit-post-textarea");
let editPostElement = document.querySelector(".edit-post");
let closeEditPost = document.querySelector(".edit-close-icon");
//chat bot
let chatbotWrapper = document.querySelector(".chatbot__wrapper");
let chatbotClostBtn = document.querySelector(".chatbot__close");
let chatbotSendBtn = document.querySelector(".chatbot__send-btn");
let chatbotInput = document.querySelector(".chatbot__input");
let chatbotMessages = document.querySelector(".chatbot__messages");
let chatbotIcon = document.querySelector(".chatbot__icon");

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

//display posts from json server data
async function displayPosts(){
  let postsElement = document.querySelector(".posts .row");
  

  //GET posts data
  let response = await fetch(`https://notch-acidic-skiff.glitch.me/posts`);
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

        //edit post
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-icon");
        postsItemHeader.append(editIcon);

        editIcon.addEventListener("click", function(){
          currentEditingPostId = `${post.id}`;
          currentEditingPostTextElement = postsItemText;
          editPostElement.style.display = "block";
          editPostTextarea.value = `${post.post}`;


        })
        closeEditPost.addEventListener("click", function(){
          editPostElement.style.display = "none";
        })
        
        

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
        
        //likes local storage
        let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        let isLiked = likedPosts.includes(post.id);

        function updateLike() {
          postLike.textContent = isLiked ? post.likes + 1 : post.likes;
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
            likedPosts = likedPosts.filter(id => id !== post.id);
            isLiked = false;
          } else {
            // add like
            likedPosts.push(post.id);
            isLiked = true;
          }
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
          updateLike();
        });


        
        let postCommentsNumber = document.createElement("div");
        postCommentsNumber.classList.add("post-comments-number");
        postCommentsNumber.textContent = `${post.comments.length} comments`;
        postsItemBottom.append(postCommentsNumber)

        let postComments = document.createElement("div");
        postComments.classList.add("post-comments");
        postsItem.append(postComments);

        post.comments.map((comment)=>{
            let postComment = document.createElement("p");
            postComment.classList.add("comment");
            postComment.textContent=`${comment}`;
            postComments.append(postComment)
        });

        postComments.style.display = "none";

        //display comments
        postCommentsNumber.addEventListener("click", ()=>{
          if (postComments.style.display === 'none') {
            postComments.style.display = 'block';
          } else {
            postComments.style.display = 'none';
          }
        })
    })
    
  }
  
}
displayPosts();

saveEditPost.addEventListener("click", async function(){
  if  (currentEditingPostId === null || !currentEditingPostTextElement) return;
          let updatedPostContent = editPostTextarea.value.trim();
          try {
            const response = await fetch(`https://notch-acidic-skiff.glitch.me/posts/${currentEditingPostId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ post: updatedPostContent }),
            });

            if (!response.ok) throw new Error("Failed to update post");

           currentEditingPostTextElement.textContent =
            updatedPostContent.length > 250
            ? updatedPostContent.slice(0, 250) + "..."
            : updatedPostContent;

          document.querySelector(".posts .row").innerHTML = "";
          displayPosts();
          editPostElement.style.display = "none";
          currentEditingPostId = null;
          currentEditingPostTextElement = null;


          } catch (error) {
            alert("Error updating post: " + error.message);
          }
        });

// addPost function
async function addPost(e){
    e.preventDefault();

    // image post url
     const postFile = postImageFile.files;
     console.log(postFile)
     let imageUrl = "";

    if (postFile.length > 0 && postFile[0] instanceof Blob) {
        imageUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(postFile[0]);
        });
    }
    

    //fetch posts
    let response = await fetch("https://notch-acidic-skiff.glitch.me/posts", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body":JSON.stringify({
            //"id": ++lastPostId,
            "publisher": userInfo.username,
            "post": postInput.value,
            "image": imageUrl,
            "likes": 0,
            "comments": []

        })
    })

    const result = await response.json();
    console.log(result);
    document.querySelector(".posts .row").innerHTML = "";
    displayPosts();

    postInput.value = "";
    postImageFile.value = "";
}
postButton.addEventListener("click", addPost)


//chat bot
chatbotIcon.addEventListener("click", () => {
    chatbotWrapper.classList.remove("hidden");
    chatbotIcon.style.display = "none";
  });
  chatbotClostBtn.addEventListener("click", () => {
    chatbotWrapper.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  });

  chatbotSendBtn.addEventListener("click", chatbotSendMessage);

  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") chatbotSendMessage();
  });

function chatbotSendMessage() {
  let chatbotUserMessage = document.querySelector(".chatbot__input").value.trim();
  if (chatbotUserMessage) {
    chatbotAppendMessage("user", chatbotUserMessage);
    document.querySelector(".chatbot__input").value.trim();
    document.querySelector(".chatbot__input").value=""
    getBotResponse(chatbotUserMessage);

  }
}

function chatbotAppendMessage(sender, message) {
  let messageWrapper = document.querySelector(".chatbot__body__messages");
  let messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  messageWrapper.append(messageElement);
  messageWrapper.scrollTop = messageWrapper.scrollHeight;
}

async function getBotResponse(userMessage) {
  const API_KEY = "AIzaSyB-GIbcZW_oOHN9LdNrNyax2Qa__kGwx0Q";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.candidates || !data.candidates.length) {
      throw new Error("No response from Gemini API");
    }

    const botMessage = data.candidates[0].content.parts[0].text;
    chatbotAppendMessage("bot", botMessage);
  } catch (error) {
    console.error("Error:", error);
    chatbotAppendMessage(
      "bot",
      "Sorry, I'm having trouble responding. Please try again."
    );
  }
}