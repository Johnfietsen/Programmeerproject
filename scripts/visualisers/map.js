

var FACTOR = 3;



function createMap(iteration, algorithm) {

	var mapSVG = d3.select("body").select("#map");

	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;

		mapSVG.selectAll("rect")
			.data(data.map[0])
			.enter().append("rect")
			.attr("x", function(d) { return d.x * FACTOR; })
			.attr("y", function(d) { return d.y * FACTOR; })
			.attr("width", function(d) { return d.width * FACTOR; })
			.attr("height", function(d) { return d.height * FACTOR; })
			.style("fill", function(d) { return colour(d.type); })
		});

}

function updateMap(iteration, algorithm) {

	var mapSVG = d3.select("body").select("#map");

	mapSVG.selectAll("rect").remove();

	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;

		mapSVG.selectAll("rect")
			.data(data.map[iteration])
			.enter().append("rect")
			.attr("x", function(d) { return d.x * FACTOR; })
			.attr("y", function(d) { return d.y * FACTOR; })
			.attr("width", function(d) { return d.width * FACTOR; })
			.attr("height", function(d) { return d.height * FACTOR; })
			.style("fill", function(d) { return colour(d.type); })
		});
}
