const animatedElement = document.querySelector(".animated-text");
function typeText(animatedText) {
    let index = 0;
    function type() {
      if (index < animatedText.length) {
        animatedElement.textContent += animatedText.charAt(index);
        index++;
        setTimeout(type, 100);
      }else {
        // Pause before clearing and restarting
        setTimeout(() => {
          animatedElement.textContent = '';
          index = 0;
          type();
        }, 1000);
      }
    }

    type();
  }

  // Usage
  console.log(typeText("<p> Join. Code. Repeat. </p>"));
