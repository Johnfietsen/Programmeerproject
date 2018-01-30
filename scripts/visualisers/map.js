

var FACTOR = 3;


function createMap(iteration, data) {

	var mapSVG = d3.select("body").select("#map");

	mapSVG.selectAll("rect")
		.data(data.map[0])
		.enter().append("rect")
		.attr("x", function(d) { return d.x * FACTOR; })
		.attr("y", function(d) { return d.y * FACTOR; })
		.attr("width", function(d) { return d.width * FACTOR; })
		.attr("height", function(d) { return d.height * FACTOR; })
		.attr("id", function(d) { return "map" + d.id ;})
		.style("fill", function(d) { return colour(d.type); })
		.on("click", function(d) { return clickLink(d.id); });

}


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


function updateMap(iteration, algorithm) {

	var mapSVG = d3.select("body").select("#map");

	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;

		updateDataMap(data.map[iteration]);

	})
}
