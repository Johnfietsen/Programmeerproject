
var simulation = d3.forceSimulation()
					.force("link", d3.forceLink().id(function(d) {
																return d.id; }))
    				.force("charge", d3.forceManyBody().strength(- 200))
    				.force("center", d3.forceCenter(widthNetwork / 2,
													heightNetwork / 2));


var link;
var node;
// var label;


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
		.attr("cy", function(d) { return d.y-2; })
		.attr("id", function(d) { return "network" + d.id; })
		.on("click", function(d) { return clickLink(d.id); });

	// label
	// 	.attr("x", function(d) { return d.x; })
	// 	.attr("y", function (d) { return d.y; })
	// 	.style("font-size", "10px").style("fill", "black");
}


function createNetwork(iteration, nrLinks, algorithm) {


	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;


		var select = d3.select("body")
						.append("select")
						.attr("class","select")
						.attr("id", "dropdown")
						.on("change", onchange(iteration, algorithm));

		var options = select
						.selectAll("option")
						.data(data.network[iteration].links)
						.enter()
						.append("option")
							.text(function (d, i) { return i; });


		function onchange(iteration, algorithm) {

			selectValue = d3.select("#dropdown")	.property("value")

			console.log(selectValue);

			updateNetwork(iteration, selectValue, algorithm);
			// d3.select('body')
			// 	.append('p')
			// 	.text(selectValue + ' is the last selected option.')
			};

		var networkSVG = d3.select("body").select("#network");

		link = networkSVG.append("g")
					.attr("class", "link")
					.style("stroke", "#aaa")
	                .selectAll("line")
	                .data(data.network[iteration].links[nrLinks])
	                .enter().append("line");

		node = networkSVG.append("g")
					.attr("class", "node")
					.selectAll("circle")
					.data(data.network[iteration].nodes)
					.enter().append("circle")
					.style("fill", function(d) { return colour(d.type); })
					.attr("r", 10);

		// label = networkSVG.append("g")
	    //   			.attr("class", "labels")
		// 		    .selectAll("text")
		// 		    .data(data.network[iteration].nodes)
		// 		    .enter().append("text")
		// 	        .attr("class", "label")
		// 	        .text(function(d) { return d.id; });

		simulation
			.nodes(data.network[iteration].nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(data.network[iteration].links[nrLinks]);

	});
};


// source: http://bl.ocks.org/d3noob/7030f35b72de721622b8
function updateNetwork(iteration, nrLinks, algorithm) {

	var networkSVG = d3.select("#network");
	// networkSVG.transition().duration(200);

	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
		if (error) throw error;

		console.log(nrLinks);

		link
		    .data(data.network[iteration].links[nrLinks])
		    .enter().append("line");

		node
			.data(data.network[iteration].nodes)
			.enter().append("circle")
			.style("fill", function(d) { return colour(d.type); })
			.attr("r", 10);

		// label
		// 	.data(data.network[iteration].nodes)
		// 	.enter().append("text")
		// 	.attr("class", "label")
		// 	.text(function(d) { return d.id; });

		simulation
			.nodes(data.network[iteration].nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(data.network[iteration].links[nrLinks]);
	})
}
