
var marginNetwork = {top: 20, right: 20, bottom: 50, left: 50},
	widthNetwork = 1200 - marginNetwork.left - marginNetwork.right,
	heightNetwork = 900 - marginNetwork.top - marginNetwork.bottom;

var marginMap = {top: 20, right: 20, bottom: 50, left: 50},
	widthMap = 1200 - marginMap.left - marginMap.right,
	heightMap = 900 - marginMap.top - marginMap.bottom;

var marginSlider = {top: 20, right: 20, bottom: 60, left: 50},
	widthSlider = 1200 - marginSlider.left - marginSlider.right,
	heightSlider = 200 - marginSlider.top - marginSlider.bottom;

var marginStacked = {top: 20, right: 20, bottom: 60, left: 50},
	widthStacked = 1200 - marginStacked.left - marginStacked.right,
	heightStacked = 900 - marginStacked.top - marginStacked.bottom;

var marginSunburst = {top: 20, right: 20, bottom: 60, left: 50},
	widthSunburst = 1200 - marginSunburst.left - marginSunburst.right,
	heightSunburst = 900 - marginSunburst.top - marginSunburst.bottom,
	radiusSunburst = (Math.min(widthSunburst, heightSunburst) / 2) - 10;


// var colour = d3.scaleOrdinal()
//         		.range(["yellow", "orange", "red", "black", "blue"])
//         		.domain(["one_family", "bungalow", "mansion", "side", "water"]);

var iteration = 0;
var algorithm = "hillclimber";

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

var currentSelection;


function updateDataMap(data) {

	var networkSVG = d3.select("#map");

	var t = d3.transition()
    			.duration(10);

	// JOIN new data with old elements.
	var change = networkSVG.selectAll("rect")
							.data(data, function(d) { return d; });

	console.log("map");
	console.log(change);


	// UPDATE
     // Update old elements as needed.
     change.attr("class", "update");

     // ENTER
     // Create new elements as needed.
     //
     // ENTER + UPDATE
     // After merging the entered elements with the update selection,
     // apply operations to both.
     change.enter().append("rect")
         .attr("class", "enter")
		 .merge(change)
	 	.attr("x", function(d) { return d.x * FACTOR; })
		.attr("y", function(d) { return d.y * FACTOR; })
		.attr("width", function(d) { return d.width * FACTOR; })
		.attr("height", function(d) { return d.height * FACTOR; })
		.style("fill", function(d) { return colour(d.type); })
		.attr("id", function(d) { return "map" + d.id ;})
		.on("click", function(d) { return clickLink(d.id); });


       //   .attr("dy", ".35em")
       //   .text(function(d) { return d; })
       // .merge(text)
       //   .attr("x", function(d, i) { return i * 32; });

     // EXIT
     // Remove old elements as needed.
     change.exit().remove();

}


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

	// in een div stoppen

	createNetwork(0, 3, "hillclimber");

	createMap(0, "hillclimber");

	// createStackedChart("hillclimber");

	createSunburst(9, "hillclimber");

	var x = d3.scaleLinear()
	    .domain([0, 10])
	    .range([0, widthSlider - 2 * marginSlider.left])
	    .clamp(true);

	var slider = sliderSVG.append("g")
				    .attr("class", "slider")
				    .attr("transform", "translate(" + marginSlider.left + "," +
												  heightSlider / 2 + ")");

	slider.append("line")
	    .attr("class", "track")
	    .attr("x1", x.range()[0])
	    .attr("x2", x.range()[1])
		.select(function() {
					return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "track-inset")
		.select(function() {
					return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "track-overlay")
	    .call(d3.drag()
	        .on("start.interrupt", function() { slider.interrupt(); })
	        .on("start drag", function() { update(x.invert(d3.event.x)); }));

	slider.insert("g", ".track-overlay")
	    .attr("class", "ticks")
	    .attr("transform", "translate(0," + 18 + ")")
		.selectAll("text")
		.data(x.ticks(10))
		.enter().append("text")
	    .attr("x", x)
	    .attr("text-anchor", "middle")
	    .text(function(d) { return d; });

	var handle = slider.insert("circle", ".track-overlay")
	    .attr("class", "handle")
	    .attr("r", 9);

	// slider.transition() // Gratuitous intro!
	//     .duration(750)
	//     .tween("hue", function() {
	//       var i = d3.interpolate(0, 70);
	//       return function(t) { hue(i(t)); };
	//     });

	function update(i) {

	 	handle.attr("cx", x(i));
		updateNetwork(Math.round(i), 3, "hillclimber");
		updateMap(Math.round(i), "hillclimber");
		updateSunburst(Math.round(i), "hillclimber");

	}
};
