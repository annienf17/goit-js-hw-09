!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){timerId=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16)),printColor.innerHTML=document.body.style.background}),1e3),t.disabled=!0,console.log("the start button has been clicked and the body changes color every 1s")})),e.addEventListener("click",(function(){clearInterval(timerId),t.disabled=!1,console.log("the stop button was clicked to stop the body color changing")}))}();
//# sourceMappingURL=01-color-switcher.ae1d65c3.js.map
