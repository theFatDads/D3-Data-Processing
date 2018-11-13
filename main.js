deaths2012to2017 = "https://data.ct.gov/resource/deaths.json"

processedData = [{
  name: "OpioidDeaths",
  title: "any_opioid",
  group: "analytics",
  value: 0,
},{
  name: "FentanylDeaths",
  title: "fentanyl",
  group: "analytics",
  value: 0,
}, {
  name: "HeroinDeaths",
  title: "heroin",
  group: "analytics",
  value: 0,
}, {
  name: "OxycodoneDeaths",
  title: "oxyc",
  group: "analytics",
  value: 0,
}, {
  name: "OxymorphoneDeaths",
  title: "oxym",
  group: "analytics",
  value: 0,
}, {
  name: "Morphine",
  title: "morphine_not_heroin",
  group: "analytics",
  value: 0,
}, {
  name: "HydrocodoneDeaths",
  title: "hydr_cod",
  group: "analytics",
  value: 0,
}, {
  name: "MethadoneDeaths",
  title: "methadone",
  group: "analytics",
  value: 0,
}, {
  name: "CocaineDeaths",
  title: "coc",
  group: "analytics",
  value: 0,
}, {
  name: "AlcoholDeaths",
  title: "etoh",
  group: "analytics",
  value: 0,
}, {
  name: "AmphetamineDeaths",
  title: "amphet",
  group: "analytics",
  value: 0,
}, {
  name: "BenzodiazepineDeaths",
  title: "benzo_s",
  group: "analytics",
  value: 0,
}]

//REST API only allows for 1000 data requests at a time. this function allows me to use more.
function addData(url, dataCount) { //Accepts a URL for data, and how much data there is.
  total = 0;
  requests = []
  for (i = 0; i <= Math.floor(dataCount / 1000); i++) {
    requests.push(new XMLHttpRequest())
    requests[i].responseType = 'json';
    offsetURL = `${url}?$offset=${i*1000}`
    requests[i].open('GET', offsetURL, true);
    requests[i].send();
    requests[i].onload = function () {
      deaths = this.response;
      for (death of deaths) {
        for (drug of processedData) {
          if (death[drug.title] == "Y") {
            drug.value++
          }
        }
      }
    }
  }
}

addData(deaths2012to2017,4083);
// chart = {
//   const root = pack(data);

  const svg = d3.select('#visual').append('svg')
      .attr("width", "100%")
      .attr("height", "auto")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .style('background-color', '#666666');
  const leaf = svg.selectAll("g")
    .data(processedData)
    .enter().append("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf.append("circle")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("r", d => d.value)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.data.group));

//   leaf.append("clipPath")
//       .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
//     .append("use")
//       .attr("xlink:href", d => d.leafUid.href);

//   leaf.append("text")
//       .attr("clip-path", d => d.clipUid)
//     .selectAll("tspan")
//     .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
//     .enter().append("tspan")
//       .attr("x", 0)
//       .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
//       .text(d => d);

//   leaf.append("title")
//       .text(d => `${d.data.title}\n${format(d.value)}`);

//   return svg.node();
// }