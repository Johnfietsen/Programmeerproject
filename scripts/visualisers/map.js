

var FACTOR = 3;

var colour = d3.scaleOrdinal()
        		.range(["yellow", "orange", "red", "black"])
        		.domain(["one_family", "bungalow", "mansion", "side"]);

function createMap(iteration, algorithm) {

	var mapSVG = d3.select("body").select("#map");
					// .selectAll("rect")
					// .append("rect")
					// // .classed('background', true)
					// .attr("width", 1200)
					// .attr("height", 900)
					// .style("fill", "green");


	// var svg = d3.select("body")
	// 			.append("svg")
	// 			.attrs({ width: 1200, height: 900 });
	// 			// .append("rect")
	// 			// .attr("width", 1200)
	// 			// .attr("height", 900)
	// 			// .style("fill", "green");

	d3.json("/data/json/hillclimber.json", function(error, hillclimber) {
		if (error) throw error;

		mapSVG.selectAll("rect")
			.data(hillclimber.map[0])
			.enter().append("rect")
			.attr("x", function(d) { return d.x * FACTOR; })
			.attr("y", function(d) { return d.y * FACTOR; })
			.attr("width", function(d) { return d.width * FACTOR; })
			.attr("height", function(d) { return d.height * FACTOR; })
			.style("fill", function(d) { return colour(d.type); })
		});

   //  svg.append('rect')
   //     .attrs({ x: 10, y: 10, width: 80, height: 80, fill: 'red' })
   //     .transition()
   //     .duration(5000)
   //     .attrs({ x: 460, y: 150, width: 40, height: 40, fill: 'blue' });
}

function updateMap(iteration, algorithm) {

	var mapSVG = d3.select("body").select("#map");

	mapSVG.selectAll("rect").remove();

	d3.json("/data/json/hillclimber.json", function(error, hillclimber) {
		if (error) throw error;

		mapSVG.selectAll("rect")
			.data(hillclimber.map[iteration])
			.enter().append("rect")
			.attr("x", function(d) { return d.x * FACTOR; })
			.attr("y", function(d) { return d.y * FACTOR; })
			.attr("width", function(d) { return d.width * FACTOR; })
			.attr("height", function(d) { return d.height * FACTOR; })
			.style("fill", function(d) { return colour(d.type); })
		});
}
