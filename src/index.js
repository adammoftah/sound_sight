import "./styles/index.scss";

// let context;
// let audioContext;
// let analyser;
// let audio;
// let sourceNode;
// let freqArray;

// let rads,
//   center_x,
//   center_y,
//   radius,
//   radius_old,
//   deltarad,
//   shockwave,
//   bars,
//   bar_x,
//   bar_y,
//   bar_x_term,
//   bar_y_term,
//   bar_width,
//   bar_height,
//   react_x,
//   react_y,
//   intensity,
//   rot,
//   inputURL,
//   JSONPThing,
//   JSONResponse,
//   soundCloudTrackName,
//   pause,
//   artist,
//   title,
//   img_url,
//   isSeeking;

// var client_id = "8df0d68fcc1920c92fc389b89e7ce20f";

// // give vars an initial real value to validate
// bars = 200;
// react_x = 0;
// react_y = 0;
// radius = 0;
// deltarad = 0;
// shockwave = 0;
// rot = 0;
// intensity = 0;
// pause = 1;
// isSeeking = 0;

// window.onload = function () {
//   const sample = document.getElementById("sample");
//   const canvas = document.getElementById("canvas");
//   context = canvas.getContext("2d");
//   sample.addEventListener("click", function () {
//     audio = new Audio("./assets/sample.wav");
//     setup();
//   });

//   function setup() {
//     audio.addEventListener("canplay", function () {
//       audioContext = new AudioContext();
//       analyser = audioContext.createAnalyser();
//       analyser.smoothingTimeConstant = 0.5;
//       analyser.fftSize = 256;

//       startSound();
//     });
//   }

//   function startSound() {
//     sourceNode = audioContext.createMediaElementSource(audio);
//     sourceNode.connect(analyser);
//     sourceNode.connect(audioContext.destination);

//     audio.play();
//     update();
//   }

//   function playSound() {
//     if (audioContext) {
//       if (audioContext.state === "suspended") {
//         audioContext.resume();
//       }
//     }
//   }

//   function stopSound() {
//     if (audioContext) {
//       if (audioContext.state === "running") {
//         audioContext.suspend();
//       }
//     }
//   }
// };

// function drawCircle(context = context, freqValue) {
//   const x = canvas.width / 2;
//   const y = canvas.height / 2;

//   context.beginPath();
//   context.arc(
//     x - freqValue / 8,
//     y - freqValue / 8,
//     Math.abs(freqValue - 120) * 5,
//     0,
//     2 * Math.PI,
//     false
//   );
//   context.strokeStyle = "#FF0000";
//   context.fillStyle = "#0077cc";

//   context.fill();
//   context.lineWidth = 2;
//   context.stroke();

//   // context.fillRect(0, 0, canvas.width, canvas.height);

//   // context.fillStyle =
//   //   "rgba(255, 255, 255, " + (intensity * 0.0000125 - 0.4) + ")";
//   // context.fillRect(0, 0, canvas.width, canvas.height);

//   // rot = rot + intensity * 0.0000001;

//   // react_x = 0;
//   // react_y = 0;

//   // intensity = 0;

//   // analyser.getByteFrequencyData(freqArray);

//   // for (var i = 0; i < bars; i++) {
//   //   rads = (Math.PI * 2) / bars;

//   //   bar_x = center_x;
//   //   bar_y = center_y;

//   //   bar_height = Math.min(99999, Math.max(freqArray[i] * 2.5 - 200, 0));
//   //   bar_width = bar_height * 0.02;

//   //   bar_x_term = center_x + Math.cos(rads * i + rot) * (radius + bar_height);
//   //   bar_y_term = center_y + Math.sin(rads * i + rot) * (radius + bar_height);

//   //   context.save();

//   //   // var lineColor =
//   //   // "rgb(" + freqArray[i].toString() + ", " + 255 + ", " + 255 + ")";

//   //   context.strokeStyle = "#0077cc";
//   //   context.lineWidth = bar_width;
//   //   context.beginPath();
//   //   context.moveTo(bar_x, bar_y);
//   //   context.lineTo(bar_x_term, bar_y_term);
//   //   context.stroke();

//   //   react_x += Math.cos(rads * i + rot) * (radius + bar_height);
//   //   react_y += Math.sin(rads * i + rot) * (radius + bar_height);

//   //   intensity += bar_height;
//   // }

//   // center_x = canvas.width / 2 - react_x * 0.007;
//   // center_y = canvas.height / 2 - react_y * 0.007;

//   // radius_old = radius;
//   // radius = 25 + intensity * 0.002;
//   // deltarad = radius - radius_old;

//   // context.fillStyle = "rgb(255, 255, 255)";
//   // context.beginPath();
//   // context.arc(center_x, center_y, radius + 2, 0, Math.PI * 2, false);
//   // context.fill();

//   // // shockwave effect
//   // shockwave += 60;

//   // context.lineWidth = 15;
//   // context.strokeStyle = "rgb(255, 255, 255)";
//   // context.beginPath();
//   // context.arc(center_x, center_y, shockwave + radius, 0, Math.PI * 2, false);
//   // context.stroke();

//   // if (deltarad > 15) {
//   //   shockwave = 0;

//   //   context.fillStyle = "rgba(255, 255, 255, 0.7)";
//   //   context.fillRect(0, 0, canvas.width, canvas.height);

//   //   rot = rot + 0.4;
//   // }

//   // if (!isSeeking) {
//   //   document.getElementById("audioTime").value =
//   //     (100 / audio.duration) * audio.currentTime;
//   // }

//   // document.getElementById("time").innerHTML =
//   //   Math.floor(audio.currentTime / 60) +
//   //   ":" +
//   //   (Math.floor(audio.currentTime % 60) < 10 ? "0" : "") +
//   //   Math.floor(audio.currentTime % 60);
// }

// function update() {
//   const width = canvas.width;
//   const height = canvas.height;
//   context.clearRect(0, 0, width, height);
//   freqArray = new Uint8Array(analyser.frequencyBinCount);
//   analyser.getByteTimeDomainData(freqArray);

//   for (var i = 0; i < freqArray.length; i += 1) {
//     var point = freqArray[i];
//     drawCircle(context, point, i);
//   }

//   requestAnimationFrame(update);
// }
var dataset = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];
window.onload = function () {
  var frequencyData = new Uint8Array(200);

  var svgHeight = "300";
  var svgWidth = "1200";
  var barPadding = "1";

  function createSvg(parent, height, width) {
    return d3
      .select(parent)
      .append("svg")
      .attr("height", height)
      .attr("width", width);
  }

  var svg = createSvg("body", svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg
    .selectAll("rect")
    .data(frequencyData)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * (svgWidth / frequencyData.length);
    })
    .attr("width", svgWidth / frequencyData.length - barPadding);

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById("audioElement");
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  function renderChart() {
    requestAnimationFrame(renderChart);

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    svg
      .selectAll("rect")
      .data(frequencyData)
      .attr("y", function (d) {
        return svgHeight - d;
      })
      .attr("height", function (d) {
        return d;
      })
      .attr("fill", function (d) {
        return "rgb(0, 0, " + d + ")";
      });
  }

  // Run the loop
  renderChart();
};
