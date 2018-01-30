
var marginNetwork = {top: 20, right: 20, bottom: 50, left: 50},
	widthNetwork = 1200 - marginNetwork.left - marginNetwork.right,
	heightNetwork = 900 - marginNetwork.top - marginNetwork.bottom;

var marginMap = {top: 20, right: 20, bottom: 50, left: 50},
	widthMap = 1200 - marginMap.left - marginMap.right,
	heightMap = 900 - marginMap.top - marginMap.bottom;

var marginSlider = {top: 20, right: 20, bottom: 60, left: 50},
	widthSlider = 1200 - marginSlider.left - marginSlider.right,
	heightSlider = 200 - marginSlider.top - marginSlider.bottom;

// var marginStacked = {top: 20, right: 20, bottom: 60, left: 50},
// 	widthStacked = 1200 - marginStacked.left - marginStacked.right,
// 	heightStacked = 900 - marginStacked.top - marginStacked.bottom;

var marginSunburst = {top: 20, right: 20, bottom: 60, left: 50},
	widthSunburst = 1200 - marginSunburst.left - marginSunburst.right,
	heightSunburst = 900 - marginSunburst.top - marginSunburst.bottom,
	radiusSunburst = (Math.min(widthSunburst, heightSunburst) / 2) - 10;


var iteration = 0;
var algorithm = "hillclimber";
var nrLinks = 2;
var currentSelection;


var colourOneFamily = d3.scaleLinear()
						.range(["white", "orange"])
						.domain([-2, 12]);

var colourBungalow = d3.scaleLinear()
						.range(["white", "red"])
						.domain([11, 17]);

var colourMansion = d3.scaleLinear()
						.range(["white", "purple"])
						.domain([16, 20]);

var colour = d3.scaleOrdinal()
        		.range(["orange", "red", "purple", "black", "blue",
						"black", "yellow", "steelblue", "green"])
        		.domain(["one_family", "bungalow", "mansion", "side", "water",
						 "unused", "build", "freespace", "map"]);


function clickLink(id) {

	var mapElement = d3.select("#map" + id)
							.style("stroke", "blue")
							.style("stroke-width", "5px");
	var networkElement = d3.select("#network" + id)
							.style("stroke", "blue")
							.style("stroke-width", "5px");
	var sunburstElement = d3.select("#sunburst" + id)
							.style("stroke", "blue")
							.style("stroke-width", "5px");

	mapElement = d3.select("#map" + currentSelection)
					.style("stroke", "white")
					.style("stroke-width", "0px");
	networkElement = d3.select("#network" + currentSelection)
					.style("stroke", "white")
					.style("stroke-width", "3px");
	sunburstElement = d3.select("#sunburst" + currentSelection)
					.style("stroke", "white")
					.style("stroke-width", "1px");;

	currentSelection = id;

}


window.onload = function(){

	var networkSVG = d3.select("body").append("svg")
						.attr("width", widthNetwork)
						.attr("height", heightNetwork)
						.attr("id", "network");

	// var stackedSVG = d3.select("body").append("svg")
	// 					.attr("width", widthStacked)
	// 					.attr("height", heightStacked)
	// 					.attr("id", "stacked");

	var sliderSVG = d3.select("body").append("svg")
						.attr("width", widthSlider)
						.attr("height", heightSlider)
						.attr("id", "slider");

	var mapSVG = d3.select("body").append("svg")
						.attr("width", widthMap)
						.attr("height", heightMap)
						.attr("id", "map");

	var sunburstSVG = d3.select("body").append("svg")
						.attr("width", widthSunburst)
						.attr("height", heightSunburst)
						.attr("id", "sunburst");


	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;

		createNetwork(0, 3, data);

		createMap(0, data);

		// createStackedChart(data);

		createSunburst(9, data);

		createSlider();

	});
};
