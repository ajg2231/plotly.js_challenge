var d3 = require('d3');

const samples = 'samples.json';

d3.json(samples).then(function(data) {
  console.log(data);
});

function first() {
  var trace = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]}];
  
  var data = [trace];
  

  layout = {
    title: "10 most frequent OTUs",
    xaxis: { title: "OTUs" },
    yaxis: { title: "Frequency" },
    orientation: 'h'
  };
  

  Plotly.newPlot(bar, layout, data);
}

function second() {
  var trace1 = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
    mode: 'markers',
    marker: {
      size: [20, 40, 60, 80, 100]
    },
  }];

  data10 = [trace1];

    layout2 = {
      title: "10 most frequent OTUs",
      showlegend: false,
      height: 600,
      width: 600
    };
  

  Plotly.newPlot(bubble, data10, layout2);
}

d3.selectAll("#selDataset").on("change", updatePlotly);
d3.selectAll("#selDataset").on("change", updatePlotly2);

var dropdownMenu = d3.select("#selDataset");
  
var dataset = dropdownMenu.property("value");

function updatePlotly() {

  var x = [];
  var y = [];

  if (dataset === samples.id) {
    x = [samples.otu_ids.slice(0, 10)];
    y = [samples.sample_values.slice(0, 10)];
  }

  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "y", [y]);
}

function updatePlotly2() {

  var a = [];
  var b = [];

  if (dataset === samples.id) {
    a = [samples.otu_ids.slice(0, 10)];
    b = [samples.sample_values.slice(0, 10)];
  }

  Plotly.restyle("bubble", "x", [a]);
  Plotly.restyle("bubble", "y", [b]);
}

first();
second();


for (i in dataset) {
  document.getElementById("gauge").innerHTML += x + "<br>";
}