
var marginNetwork = {top: 20, right: 20, bottom: 50, left: 50},
	widthNetwork = 1200 - marginNetwork.left - marginNetwork.right,
	heightNetwork = 900 - marginNetwork.top - marginNetwork.bottom;

var marginMap = {top: 20, right: 20, bottom: 50, left: 50},
	widthMap = 1200 - marginMap.left - marginMap.right,
	heightMap = 900 - marginMap.top - marginMap.bottom;

var marginSlider = {top: 20, right: 20, bottom: 60, left: 50},
	widthSlider = 1200 - marginSlider.left - marginSlider.right,
	heightSlider = 200 - marginSlider.top - marginSlider.bottom;


window.onload = function(){

	var networkSVG = d3.select("body").append("svg")
						.attr("width", widthNetwork)
						.attr("height", heightNetwork)
						.attr("id", "network");


	var sliderSVG = d3.select("body").append("svg")
						.attr("width", widthSlider)
						.attr("height", heightSlider)
						.attr("id", "slider");

	var mapSVG = d3.select("body").append("svg")
						.attr("width", widthMap)
						.attr("height", heightMap)
						.attr("id", "map");

	// in een div stoppen

	createNetwork(0, 3, "hillclimber");

	createMap(0, "hillclimber");


	// var svg = d3.select("svg"),
	//     margin = {right: 50, left: 50},
	//     width = +svg.attr("width") - margin.left - margin.right,
	//     height = +svg.attr("height");

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
	        .on("start drag", function() { hue(x.invert(d3.event.x)); }));

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

	function hue(h) {

	 	handle.attr("cx", x(h));
		// createNetwork(Math.round(h), 3, "hillclimber");
		updateNetwork(Math.round(h), 3, "hillclimber");
		updateMap(Math.round(h), "hillclimber");
	}
};
