
var simulation = d3.forceSimulation()
					.force("link", d3.forceLink().id(function(d) {
						return d.id; }))
    				.force("charge", d3.forceManyBody().strength(-400))
    				.force("center", d3.forceCenter(widthNetwork / 2,
													heightNetwork / 2));


var colour = d3.scaleOrdinal()
        		.range(["yellow", "orange", "red", "black"])
        		.domain(["one_family", "bungalow", "mansion", "side"]);


function createNetwork(iteration, nrLinks, algorithm) {

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		var networkSVG = d3.select("body").select("#network");

		var link = networkSVG.append("g")
					.attr("class", "links")
					.style("stroke", "#aaa")
	                .selectAll("line")
	                .data(hillclimber.network[iteration].links[nrLinks])
	                .enter().append("line");

		var node = networkSVG.append("g")
					.attr("class", "nodes")
					.selectAll("circle")
					.data(hillclimber.network[iteration].nodes)
					.enter().append("circle")
					.style("fill", function(d) { return colour(d.type); })
					.attr("r", 10);

		var label = networkSVG.append("g")
	      			.attr("class", "labels")
				    .selectAll("text")
				    .data(hillclimber.network[iteration].nodes)
				    .enter().append("text")
			        .attr("class", "label")
			        .text(function(d) { return d.id; });

		simulation
			.nodes(hillclimber.network[iteration].nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(hillclimber.network[iteration].links[nrLinks]);

		function ticked() {
			link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
	        	.attr("y2", function(d) { return d.target.y; });

			node
	        	.attr("r", 10)
	        	.style("stroke", "#ffffff")
	        	.style("stroke-width", "4px")
	        	.attr("cx", function(d) { return d.x+2; })
	        	.attr("cy", function(d) { return d.y-2; });

			label
	    		.attr("x", function(d) { return d.x; })
	            .attr("y", function (d) { return d.y; })
	            .style("font-size", "10px").style("fill", "black");
		}
	});
};

// source: http://bl.ocks.org/d3noob/7030f35b72de721622b8
function updateNetwork(iteration, nrLinks, algorithm) {

	// console.log(iteration);

	var node = d3.selectAll(".nodes");
	var link = d3.selectAll(".links");
	var networkSVG = d3.select("#network");

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		// link.transition()
		// 	.remove()

		var newLink = networkSVG.append("g")
						.attr("class", "links")
						.style("stroke", "#aaa")
		                .selectAll("line")
		                .data(hillclimber.network[iteration].links[nrLinks])
		                .enter().append("line");

		// simulation
		// 	.nodes(hillclimber.network[iteration].nodes)
		// 	.on("tick", ticked);

		simulation.force("link")
			.links(hillclimber.network[iteration].links[nrLinks]);

		// function ticked() {
		// 	link
		// 		.attr("x1", function(d) { return d.source.x; })
		// 		.attr("y1", function(d) { return d.source.y; })
		// 		.attr("x2", function(d) { return d.target.x; })
	    //     	.attr("y2", function(d) { return d.target.y; });
		// }
	})
}

// function updateNetwork(iteration, nrLinks, algorithm) {
//
// 	var newNetwork = d3.select("#network").transition();
//
// 	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
// 		if (error) throw error;
//
// 		newNetwork.select(".links")
// 					.data(hillclimber.network[iteration].links[nrLinks])
// 					.duration(200);
// 	});
// }
