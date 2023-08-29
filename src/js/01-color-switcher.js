const getRandomHexColor = () => {
    document.body.style.background = 
     `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      }`;
  }
  
  let timerId = 0;
  const buttonStart = document.querySelector("[data-start]");
  const buttonStop = document.querySelector("[data-stop]");
  
  buttonStart.addEventListener("click", () => {
      timerId = setInterval(() => {
        getRandomHexColor();
      }, 1000);
      // to avoid clicking endlessly
      buttonStart.disabled = true;
      console.log("the start button has been clicked and the body changes color every 1s");
    });
    
  buttonStop.addEventListener("click", () => {
      clearInterval(timerId);
      // make the button active 
      buttonStart.disabled = false;
      console.log("the stop button was clicked to stop the body color changing");
    });
  
