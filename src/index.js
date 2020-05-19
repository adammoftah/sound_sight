import "./styles/index.scss";

let indexVariable = 50;
const graph = document.getElementById("visual");
setInterval(function () {
  indexVariable = (++indexVariable % 255) + Math.random() * 50 + 20;
}, 750);

let analyser, frequencyData, svg;

function startVisualizer() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = document.getElementById("audioElement");
  const audioSrc = audioCtx.createMediaElementSource(audioElement);
  analyser = audioCtx.createAnalyser();
  frequencyData = new Uint8Array(indexVariable);

  createSvg();
  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  // Run the loop
  renderChart();
}

window.onload = function () {
  setDemoSong();
  startVisualizer();
};

function createSvg() {
  const svgHeight = (window.innerHeight / 5) * 3;
  const svgWidth = window.innerWidth - 100;
  // const barPadding = "0";
  // d3.selectAll("svg").remove();
  svg = d3
    .select(graph)
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
  svg
    .selectAll("circle")
    .data(frequencyData)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
      return (
        // (((window.innerWidth / frequencyData.length) * i +
        //   100 * Math.random()) %
        //   5) +
        // 500
        ((window.innerWidth / frequencyData.length) * i + 100 * Math.random()) %
        1000
      );
    })
    .attr("cy", function (d, i) {
      return (
        ((window.innerHeight / frequencyData.length) * i +
          200 * Math.random()) %
        500
        // indexVariable + 250
      );
    });
}

function renderChart() {
  // let currentCount = 0;
  // currentCount += returnAnimationStatus();
  // if (currentCount === returnAnimationStatus()) {
  requestAnimationFrame(renderChart);
  // }

  // Copy frequency data to frequencyData array.
  analyser.getByteFrequencyData(frequencyData);
  // createSvg();
  svg
    .selectAll("circle")
    .data(frequencyData)
    .attr("r", function (d) {
      return (
        // (((window.innerWidth > window.innerHeight
        //   ? window.innerHeight
        //   : window.innerWidth) /
        //   2) *
        d * 1.5
        // 5
      );
    })
    .attr("fill", function (d) {
      return "rgb(" + d + "," + 0 + ", " + (255 - d) + ")";
    });
}

document.getElementById("file-input").onchange = function () {
  const files = this.files;
  if (files.length > 0) {
    const src = URL.createObjectURL(files[0]);
    const trackName = files[0].name
      .split(".")
      .slice(0, files[0].name.split(".").length - 1)
      .join("");
    changeSong(src, trackName);
  }
};

document.getElementById("demo-button").onclick = function () {
  setDemoSong();
};

function setDemoSong() {
  const src = "./assets/followurdreams.mp3";
  const trackName = "follow ur dreams <3";
  changeSong(src, trackName);
}

function changeSong(src, trackName) {
  const audioElement = document.getElementById("audioElement");
  audioElement.src = src;
  audioElement.load();
  document.getElementById("track-name").innerText = trackName;
}

// things that change:
// index var, cy, cx, frequencyData
