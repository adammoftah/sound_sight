import "./styles/index.scss";

let indexVariable = 50;
const graph = document.getElementById("visual");
const modal = document.getElementById("modal");
const infoLink = document.getElementById("info-link");
setInterval(function () {
  indexVariable = (++indexVariable % 255) + Math.random() * 50 + 20;
}, 750);

let analyser, frequencyData, svg;

function startVisualizer() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = document.getElementById("audioElement");
  const audioSrc = audioCtx.createMediaElementSource(audioElement);
  analyser = audioCtx.createAnalyser();
  frequencyData = new Uint8Array(300);

  createSvg();
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  renderChart();
}

function createSvg() {
  const svgHeight = window.innerHeight * 0.88;
  const svgWidth = window.innerWidth;
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
        (window.innerWidth / frequencyData.length) * i + 100 * Math.random()
      );
    })
    .attr("cy", function (d, i) {
      return (
        ((window.innerHeight / frequencyData.length) * i +
          200 * Math.random()) %
        500
      );
    });
}

function renderChart() {
  requestAnimationFrame(renderChart);
  analyser.getByteFrequencyData(frequencyData);

  // createSvg();
  svg
    .selectAll("circle")
    .data(frequencyData)
    .attr("r", function (d) {
      return d * 1.5;
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

document.getElementById("demo-button-1").onclick = function () {
  setDemoSong1();
};

document.getElementById("demo-button-2").onclick = function () {
  setDemoSong2();
};

infoLink.onclick = () => {
  modal.style.display = "";
};

document.getElementById("close-modal").onclick = () => {
  modal.style.display = "none";
  console.log("have fun :)");
  setDemoSong1();
  startVisualizer();
};

document.getElementById("modal").onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

function setDemoSong1() {
  const src = "./dist/followurdreams.mp3";
  const trackName = "follow ur dreams <3";
  changeSong(src, trackName);
}

function setDemoSong2() {
  const src = "./dist/Kuku.m4a";
  const trackName = "Kuku";
  changeSong(src, trackName);
}

function changeSong(src, trackName) {
  const audioElement = document.getElementById("audioElement");
  audioElement.src = src;
  document.getElementById("track-name").innerText = trackName;
}

// things that change:
// index var, cy, cx, frequencyData
