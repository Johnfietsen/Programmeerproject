
var simulation = d3.forceSimulation()
					.force("link", d3.forceLink().id(function(d) {
						return d.id; }))
    				.force("charge", d3.forceManyBody().strength(-400))
    				.force("center", d3.forceCenter(widthNetwork / 2,
													heightNetwork / 2));

function createNetwork(iteration, nrLinks, algorithm) {

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		// console.log(hillclimber.network[iteration].links);

		// hillclimber.network[iteration].links[nrLinks].forEach(function(d){
		// 	d.source = d.source;
		// 	d.target = d.target;
		// });

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
					.attr("r", 10);

		var label = networkSVG.append("g")
	      			.attr("class", "labels")
				    .selectAll("text")
				    .data(hillclimber.network[iteration].nodes)
				    .enter().append("text")
			        .attr("class", "label")
			        .text(function(d) { return d.type; });

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
	        	.style("fill", "steelblue")
	        	.style("stroke", "#969696")
	        	.style("stroke-width", "1px")
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

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

	var network = d3.select("body")
					.select("#network")
					.transition();

	// d3.selectAll(".links").remove();

	network.selectAll(".links")
			.duration(200)
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

	// network.select(".line")   // change the line
	//         .duration(750)
	//         .attr("d", valueline(data));
    // network.select(".x.axis") // change the x axis
	//         .duration(750)
	//         .call(xAxis);
    // network.select(".y.axis") // change the y axis
	//         .duration(750)
	//         .call(yAxis);

	})
}
