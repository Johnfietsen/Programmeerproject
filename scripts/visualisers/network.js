
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
		.attr("cx", function(d) { return d.x + 2; })
		.attr("cy", function(d) { return d.y - 2; })
		.attr("id", function(d) { return "network" + d.id; })
		.on("click", function(d) { return clickLink(d.id); });

	// label
	// 	.attr("x", function(d) { return d.x; })
	// 	.attr("y", function (d) { return d.y; })
	// 	.style("font-size", "10px").style("fill", "black");
}


// function onchange(iteration, algorithm) {
//
// 	selectValue = d3.select("#dropdown").select("value");
//
// 	console.log(selectValue);
//
// 	// updateNetwork(iteration, selectValue, algorithm);
// 	// d3.select('body')
// 	// 	.append('p')
// 	// 	.text(selectValue + ' is the last selected option.')
// };


function onchange() {

	selectValue = d3.select("select").property("value");

	updateNetwork(iteration, selectValue, algorithm);

};

function createNetwork(iteration, nrLinks, data) {


	var select = d3.select("body")
					.append("select")
					.attr("class","select")
					.on("change", onchange);

	var options = select
					.selectAll("option")
					.data(data.network[iteration].links).enter()
					.append("option")
					.text(function (d, i) { return i; });

	// var select = d3.select("body")
	// 				.append("select")
	// 				.attr("class","select")
	// 				.attr("id", "dropdown")
	// 				.on("change", onchange(iteration, algorithm));
    //
	// var options = select
	// 				.selectAll("option")
	// 				.data(data.network[iteration].links)
	// 				.enter()
	// 				.append("option")
	// 					.text(function (d, i) { return i; });


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

};


function updateNetwork(nrLinks, data) {

	var networkSVG = d3.select("#network");

	// var t = d3.transition()
    // 			.duration(10);

	console.log(data);

	// JOIN new data with old elements.
	var change1 = networkSVG.selectAll("node")
							.data(data.nodes, function(d) { return d; });

	var change2 = networkSVG.selectAll("link")
							.data(data.links[nrLinks], function(d) {
																return d; });

	console.log("network");
	console.log(change1);
	console.log(change2);


	// UPDATE
	// Update old elements as needed.
	change1.attr("class", "update");
	change2.attr("class", "update");


	// ENTER
	// Create new elements as needed.
	//
	// ENTER + UPDATE
	// After merging the entered elements with the update selection,
	// apply operations to both.
	change1.enter().append("circle")
        			.attr("class", "enter")
					.merge(change1)
					.style("fill", function(d) { return colour(d.type); })
 					.attr("r", 10);

	change2.enter().append("line")
        			.attr("class", "enter")
					.merge(change2);


	//   .attr("dy", ".35em")
	//   .text(function(d) { return d; })
	// .merge(text)
	//   .attr("x", function(d, i) { return i * 32; });

	// EXIT
	// Remove old elements as needed.
	change1.exit().remove();
	change2.exit().remove();

	// simulation
	// 	.nodes(data.network[iteration].nodes)
	// 	.on("tick", ticked);
    //
	// simulation.force("link")
	// 	.links(data.network[iteration].links[nrLinks]);


}


// // source: http://bl.ocks.org/d3noob/7030f35b72de721622b8
// function updateNetwork(iteration, nrLinks, data) {
//
// 	var networkSVG = d3.select("#network");
// 	networkSVG.transition().duration(200);
//
// 	updateDataNetwork(data.network[iteration], nrLinks);
//
//
// 		// link
// 		//     .data(data.network[iteration].links[nrLinks])
// 		//     .enter().append("line");
//         //
// 		// node
// 		// 	.data(data.network[iteration].nodes)
// 		// 	.enter().append("circle")
// 		// 	.style("fill", function(d) { return colour(d.type); })
// 		// 	.attr("r", 10);
//         //
// 		// // label
// 		// // 	.data(data.network[iteration].nodes)
// 		// // 	.enter().append("text")
// 		// // 	.attr("class", "label")
// 		// // 	.text(function(d) { return d.id; });
//         //
// 		// simulation
// 		// 	.nodes(data.network[iteration].nodes)
// 		// 	.on("tick", ticked);
//         //
// 		// simulation.force("link")
// 		// 	.links(data.network[iteration].links[nrLinks]);
// }
