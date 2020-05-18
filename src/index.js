import "./styles/index.scss";

let indexVariable = 50;
setInterval(function () {
  indexVariable = (++indexVariable % 255) + Math.random() * 50 + 90;
}, 750);

window.onload = function () {
  document.getElementById("file-input-label").onclick = () => {
    if (!contextCreated) {
      createContext();
    }
  };

  const createContext = () => {
    contextCreated = true;
    context = new AudioContext();
    analyser = context.createAnalyser();
    analyser.minDecibels = -105;
    analyser.maxDecibels = -25;
    analyser.smoothingTimeConstant = 0.8;
    gain = context.createGain();
    let src = context.createMediaElementSource(audio);
    src.connect(gain);
    gain.connect(analyser);
    analyser.connect(context.destination);
    createVisualizer();
  };
  const createVisualizer = () => {
    if (contextCreated) {
      changeAnimationStatus();
      removeVisualizer();
    }
  };

  const removeVisualizer = () => {
    d3.selectAll("svg").remove();
  };

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = document.getElementById("audioElement");
  const audioSrc = audioCtx.createMediaElementSource(audioElement);
  const analyser = audioCtx.createAnalyser();
  const frequencyData = new Uint8Array(indexVariable);

  const svgHeight = window.innerHeight;
  const svgWidth = window.innerWidth - 50;
  const barPadding = "0";

  function createSvg(parent, height, width) {
    return d3
      .select(parent)
      .append("svg")
      .attr("height", height)
      .attr("width", width);
  }

  let svg = createSvg("body", svgHeight, svgWidth);
  // let svg2 = createSvg("body", svgHeight, svgWidth);

  // Create our initial D3 chart.
  // svg2
  //   .selectAll("rect")
  //   .data(frequencyData)
  //   .enter()
  //   .append("rect")
  //   .attr("x", function (d, i) {
  //     return i * (svgWidth / frequencyData.length);
  //   })
  //   .attr("width", svgWidth / frequencyData.length - barPadding);

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

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  let animationCount = 0;

  const changeAnimationStatus = () => {
    animationCount += 1;
  };

  const returnAnimationStatus = () => {
    return animationCount;
  };

  let currentCount = 0;
  currentCount += returnAnimationStatus();

  function renderChart() {
    if (currentCount === returnAnimationStatus()) {
      requestAnimationFrame(renderChart);
    }

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    // svg2
    //   .selectAll("rect")
    //   .data(frequencyData)
    //   .attr("y", function (d) {
    //     return svgHeight - d;
    //   })
    //   .attr("height", function (d) {
    //     return d;
    //   })
    //   .attr("fill", function (d) {
    //     return "rgb(" + indexVariable + ", 0, " + d + ")";
    //   });
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

  // Run the loop
  renderChart();
};

// things that change:
// index var, cy, cx, frequencyData
