!function(){var t=document.getElementById("startButton"),n=document.getElementById("stopButton"),e=null;t.addEventListener("click",(function(){t.disabled=!0,n.disabled=!1,e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),n.addEventListener("click",(function(){t.disabled=!1,n.disabled=!0,clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.d0882977.js.map
