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
// let animationCount = 0;

// const changeAnimationStatus = () => {
//   animationCount += 1;
// };

// const returnAnimationStatus = () => {
//   return animationCount;
// };

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
