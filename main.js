deaths2012to2017 = "https://data.ct.gov/resource/deaths.json"
red = "#FF0000"
green = "#00FF00"
blue = "#0000FF"
yellow = "#FFFF00"
orange = "#FFAA00"
purple = "#FF00FF"
processedData = [{
  name: "FentanylDeaths",
  title: "fentanyl",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "HeroinDeaths",
  title: "heroin",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "OxycodoneDeaths",
  title: "oxyc",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "OxymorphoneDeaths",
  title: "oxym",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "Morphine",
  title: "morphine_not_heroin",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "HydrocodoneDeaths",
  title: "hydr_cod",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "MethadoneDeaths",
  title: "methadone",
  group: "analytics",
  value: 0,
  color: blue,
  isOpioid: true,
}, {
  name: "CocaineDeaths",
  title: "coc",
  group: "analytics",
  value: 0,
  color: red,
  isOpioid: false,
}, {
  name: "AlcoholDeaths",
  title: "etoh",
  group: "analytics",
  value: 0,
  color: orange,
  isOpioid: false,
}, {
  name: "AmphetamineDeaths",
  title: "amphet",
  group: "analytics",
  value: 0,
  color: yellow,
  isOpioid: false,
}, {
  name: "BenzodiazepineDeaths",
  title: "benzo_s",
  group: "analytics",
  value: 0,
  color: orange,
  isOpioid: false,
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
console.log(processedData);

function setup(){
  balledData = createCanvas(100,100);
  balledData.parent('sketch-holder')
  for(let i = 0; i<=processedData.length; i++){
    balledData.fill(processedData[i].color);
    radius = processedData[i].value;
    balledData.ellipse(50,50,radius,radius);
  }
}
