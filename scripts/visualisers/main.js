
var marginNetwork = {top: 20, right: 20, bottom: 50, left: 50},
	widthNetwork = 1200 - marginNetwork.left - marginNetwork.right,
	heightNetwork = 900 - marginNetwork.top - marginNetwork.bottom;

var marginMap = {top: 20, right: 20, bottom: 50, left: 50},
	widthMap = 1200 - marginMap.left - marginMap.right,
	heightMap = 900 - marginMap.top - marginMap.bottom;

var marginSlider = {top: 20, right: 20, bottom: 60, left: 50},
	widthSlider = 1200 - marginSlider.left - marginSlider.right,
	heightSlider = 200 - marginSlider.top - marginSlider.bottom;

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

	var networkSVG = d3.select("#networkDiv").append("svg")
						.attr("width", "100%")
						.attr("height", "100%")
						.attr("viewBox", "0 0 1200 900")
						.attr("perserveAspectRatio", "xMaxYMax")
						.attr("id", "network");

	var sliderSVG = d3.select("#sliderDiv").append("svg")
						.attr("width", "100%")
						.attr("height", "100%")
						.attr("viewBox", "0 0 1200 500")
						.attr("perserveAspectRatio", "xMaxYMax")
						.attr("id", "slider");

	var mapSVG = d3.select("#mapDiv").append("svg")
						.attr("width", "100%")
						.attr("height", "100%")
						.attr("viewBox", "0 0 1200 500")
						.attr("perserveAspectRatio", "xMaxYMax")
						.attr("id", "map");

	var sunburstSVG = d3.select("#sunburstDiv").append("svg")
						.attr("width", "100%")
						.attr("height", "100%")
						.attr("viewBox", "0 0 1200 900")
						.attr("perserveAspectRatio", "xMaxYMax")
						.attr("id", "sunburst");


	d3.json("../../data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;

		createNetwork(iteration, 3, data);

		createMap(iteration, data);

		// createStackedChart(data);

		createSunburst(iteration, data);

		createSlider(data);

	});


};
