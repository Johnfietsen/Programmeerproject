
var simulation = d3.forceSimulation()
					.force("link", d3.forceLink().id(function(d) {
																return d.id; }))
    				.force("charge", d3.forceManyBody().strength(- 200))
    				.force("center", d3.forceCenter(widthNetwork / 2,
													heightNetwork / 2));


var link;
var node;
var label;

function ticked() {
	link
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

	node
		.attr("r", 10)
		.style("stroke", "white")
		.style("stroke-width", "4px")
		.attr("cx", function(d) { return d.x+2; })
		.attr("cy", function(d) { return d.y-2; });

	label
		.attr("x", function(d) { return d.x; })
		.attr("y", function (d) { return d.y; })
		.style("font-size", "10px").style("fill", "black");
}

function createNetwork(iteration, nrLinks, algorithm) {

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		var networkSVG = d3.select("body").select("#network");

		link = networkSVG.append("g")
					.attr("class", "links")
					.style("stroke", "#aaa")
	                .selectAll("line")
	                .data(hillclimber.network[iteration].links[nrLinks])
	                .enter().append("line");

		node = networkSVG.append("g")
					.attr("class", "nodes")
					.selectAll("circle")
					.data(hillclimber.network[iteration].nodes)
					.enter().append("circle")
					.style("fill", function(d) { return colour(d.type); })
					.attr("r", 10);

		label = networkSVG.append("g")
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

	});
};

// source: http://bl.ocks.org/d3noob/7030f35b72de721622b8
function updateNetwork(iteration, nrLinks, algorithm) {

	var networkSVG = d3.select("#network");
	// networkSVG.transition().duration(200);

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		link
		    .data(hillclimber.network[iteration].links[nrLinks])
		    .enter().append("line");

		node
			.data(hillclimber.network[iteration].nodes)
			.enter().append("circle")
			.style("fill", function(d) { return colour(d.type); })
			.attr("r", 10);

		label
			.data(hillclimber.network[iteration].nodes)
			.enter().append("text")
			.attr("class", "label")
			.text(function(d) { return d.id; });

		simulation
			.nodes(hillclimber.network[iteration].nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(hillclimber.network[iteration].links[nrLinks]);
	})
}
