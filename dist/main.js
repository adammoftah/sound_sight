!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);var o,r,i,l=50,c=document.getElementById("visual"),u=document.getElementById("modal"),d=document.getElementById("info-link");function a(){var e,t,n=new(window.AudioContext||window.webkitAudioContext),l=document.getElementById("audioElement"),u=n.createMediaElementSource(l);o=n.createAnalyser(),r=new Uint8Array(300),e=.88*window.innerHeight,t=window.innerWidth,(i=d3.select(c).append("svg").attr("height",e).attr("width",t)).selectAll("circle").data(r).enter().append("circle").attr("cx",(function(e,t){return window.innerWidth/r.length*t+100*Math.random()})).attr("cy",(function(e,t){return(window.innerHeight/r.length*t+200*Math.random())%500})),u.connect(o),u.connect(n.destination),m()}function m(){requestAnimationFrame(m),o.getByteFrequencyData(r),i.selectAll("circle").data(r).attr("r",(function(e){return 1.5*e})).attr("fill",(function(e){return"rgb("+e+",0, "+(255-e)+")"}))}function f(e,t){var n=document.getElementById("audioElement");n.src=e,document.getElementById("track-name").innerText=t,n.play()}setInterval((function(){l=++l%255+50*Math.random()+20}),750),document.getElementById("file-input").onchange=function(){var e=this.files;e.length>0&&f(URL.createObjectURL(e[0]),e[0].name.split(".").slice(0,e[0].name.split(".").length-1).join(""))},document.getElementById("demo-button-1").onclick=function(){f("./dist/followurdreams.mp3","follow ur dreams <3")},document.getElementById("demo-button-2").onclick=function(){f("./dist/Kuku.m4a","Kuku")},d.onclick=function(){u.style.display=""},document.getElementById("close-modal").onclick=function(){u.style.display="none",console.log("have fun :)");document.getElementById("audioElement").src="./dist/followurdreams.mp3",document.getElementById("track-name").innerText="follow ur dreams <3",a()},document.getElementById("modal").onclick=function(e){e.target===u&&(u.style.display="none")}},function(e,t,n){}]);
//# sourceMappingURL=main.js.map