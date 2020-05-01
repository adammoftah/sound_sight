import "./styles/index.scss";

let context;
let audioContext;
let analyser;
let audio;
let sourceNode;
let freqArray;

window.onload = function () {
  const sample = document.getElementById("sample");
  const canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  sample.addEventListener("click", function () {
    audio = new Audio("./assets/sample.wav");
    setup();
  });

  function setup() {
    audio.addEventListener("canplay", function () {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      analyser.smoothingTimeConstant = 0.5;
      analyser.fftSize = 256;

      startSound();
    });
  }

  function startSound() {
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    sourceNode.connect(audioContext.destination);

    audio.play();
    update();
  }

  function playSound() {
    if (audioContext) {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
    }
  }

  function stopSound() {
    if (audioContext) {
      if (audioContext.state === "running") {
        audioContext.suspend();
      }
    }
  }
};

function drawCircle(context = context, freqValue) {
  const x = canvas.width / 2;
  const y = canvas.height / 2;

  context.beginPath();
  context.arc(
    x - freqValue / 8,
    y - freqValue / 8,
    Math.abs(freqValue - 120) * 5,
    0,
    2 * Math.PI,
    false
  );
  context.strokeStyle = "#FF0000";
  context.fillStyle = "#0077cc";

  context.fill();
  context.lineWidth = 2;
  context.stroke();
}

function update() {
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);
  freqArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(freqArray);

  for (var i = 0; i < freqArray.length; i += 1) {
    var point = freqArray[i];
    drawCircle(context, point, i);
  }

  requestAnimationFrame(update);
}
