/*
 *  University:		University of Amsterdam
 *  Study:			Minor Programming
 *  Course:			Programmeerproject
 *  Name:			Luc Stefelmanns
 *  Student nr.:	10669124
 *
 * This script contains all the functions needed to create and update the
 * network and the dropdown menu that controls the number of links per node.
 */


var simulation = d3.forceSimulation()
					.force("link", d3.forceLink().id(function(d) {
																return d.id; }))
    				.force("charge", d3.forceManyBody().strength(- 200))
    				.force("center", d3.forceCenter(widthNetwork / 2,
													heightNetwork / 2));


var link;
var node;


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
}


// changes number of links if choice has been made at dropdown
function onChange(data) {

	selectValue = d3.select("select").property("value");

	updateNetwork(iteration, selectValue, data);

};


function createDropdown(data) {

	var select = d3.select("#dropdownDiv")
					.append("select")
					.attr("class","select")
					.on("change", function() { onChange(data); } )
					.attr("current", "2");

	var options = select
					.selectAll("option")
					.data(data.network[iteration].links).enter()
					.append("option")
					.text(function (d, i) { return i; });

}


function createNetwork(iteration, nrLinks, data) {

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

	simulation
		.nodes(data.network[iteration].nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(data.network[iteration].links[nrLinks]);

};


function updateNetwork(iteration, nrLinks, data) {

	var networkSVG = d3.select("#network");

	networkSVG.selectAll(".link")
				.remove();

	networkSVG.selectAll(".node")
				.remove();

	createNetwork(iteration, nrLinks, data);

}
