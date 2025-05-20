let animatedElement = document.querySelector(".animated-text");
let loginButton = document.querySelector(".login-button");

// text animation in login page
function typeText(animatedText) {
    let index = 0;
    function type() {
      if (index < animatedText.length) {
        animatedElement.textContent += animatedText.charAt(index);
        index++;
        setTimeout(type, 100);
      }else {
        setTimeout(() => {
          animatedElement.textContent = '';
          index = 0;
          type();
        }, 1000);
      }
    }

    type();
  }
typeText("<p> Join. Code. Repeat. </p>");


// login username and password
async function loginForm(e){
    e.preventDefault();

    let usernameInput = document.querySelector(".user-name").value;
    let passwordInput = document.querySelector(".password").value;

    let response = await fetch(`http://localhost:3000/users?username=${usernameInput}&password=${passwordInput}`);
    let users = await response.json();
    console.log(users)

    if(users.length > 0){
        window.location.href="home.html";
    } else {
        alert("invalid username or password");
    }
}

loginButton.addEventListener("click", loginForm);