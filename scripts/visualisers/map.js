/*
 *  University:		University of Amsterdam
 *  Study:			Minor Programming
 *  Course:			Programmeerproject
 *  Name:			Luc Stefelmanns
 *  Student nr.:	10669124
 *
 * This script contains all the functions needed to create and update the
 * map.
 */


// scaling to make the map fit the SVG
var FACTOR = 3.2;


function createMap(iteration, data) {

	var mapSVG = d3.select("body").select("#map");

	mapSVG.selectAll("rect")
		.data(data.map[0])
		.enter().append("rect")
		.attr("x", function(d) { return (d.x - (d.width / 2)) * FACTOR; })
		.attr("y", function(d) { return (d.y - (d.height / 2)) * FACTOR; })
		.attr("width", function(d) { return d.width * FACTOR; })
		.attr("height", function(d) { return d.height * FACTOR; })
		.attr("id", function(d) { return "map" + d.id ;})
		.style("fill", function(d) { return colour(d.type); })
		.on("click", function(d) { return clickLink(d.id); });



}


// update map by joining data, updating and removing unnecessary elements
function updateMap(data) {

	var networkSVG = d3.select("#map");

	var t = d3.transition()
    			.duration(10);

	var change = networkSVG.selectAll("rect")
							.data(data, function(d) { return d; });

    change.attr("class", "update");

    change.enter().append("rect")
	        .attr("class", "enter")
			.merge(change)
		 	.attr("x", function(d) { return (d.x - (d.width / 2)) * FACTOR; })
			.attr("y", function(d) { return (d.y - (d.height / 2)) * FACTOR; })
			.attr("width", function(d) { return d.width * FACTOR; })
			.attr("height", function(d) { return d.height * FACTOR; })
			.style("fill", function(d) { return colour(d.type); })
			.attr("id", function(d) { return "map" + d.id ;})
			.on("click", function(d) {
				if (d.type != "map")
					return clickLink(d.id);
				});

    change.exit().remove();

}
