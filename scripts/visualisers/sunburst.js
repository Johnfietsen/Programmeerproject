/*
 *  University:		University of Amsterdam
 *  Study:			Minor Programming
 *  Course:			Programmeerproject
 *  Name:			Luc Stefelmanns
 *  Student nr.:	10669124
 *
 * This script contains all the functions needed to create and update the
 * sunburst.
 */

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
    .range([0, radiusSunburst]);

var partition = d3.partition();

var arc = d3.arc()
    .startAngle(function(d) {
						return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) {
						return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


function createSunburst(iteration, data) {

	var sunburstSVG = d3.select("#sunburst");

	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
	  if (error) throw error;

	  	root = d3.hierarchy(data.sunburst[iteration]);
	  	root.sum(function(d) { return d.size; });

	  	sunburstSVG.selectAll("path")
	      			.data(partition(root).descendants())
	    			.enter().append("path")
	      			.attr("d", arc)
					.attr("transform", "translate(" + widthSunburst / 2 + ","
													+ heightSunburst / 2 + ")")
					.attr("id", function(d) {
											return "sunburst" + d.data.name; })
					.style("stroke", "white")
					.style("stroke-width", "1px")
					.style("fill", function(d) {
							if (d.data.type == "one_family")
								return colourOneFamily(parseFloat(d.data.name));
							else if (d.data.type == "bungalow")
							 	return colourBungalow(parseFloat(d.data.name));
							else if (d.data.type == "mansion")
								return colourMansion(parseFloat(d.data.name));
							else
								return colour(d.data.name); })
					.on("click", function(d) {
							if (d.data.children == null &&
								d.data.name != "unused" &&
								d.data.name != "one_family" &&
								d.data.name != "bungalow" &&
								d.data.name != "mansion")
								return clickLink(d.data.name); })
	    			.append("title")
	      			.text(function(d) {
						return d.data.name + "\n" +
							   formatNumber(d.value / 288) + "%"; });
	});

	d3.select(self.frameElement).style("height", heightSunburst + "px");

}


// update map by joining data, updating and removing unnecessary elements
function updateSunburst(data) {

	var sunburstSVG = d3.select("#sunburst");

	root = d3.hierarchy(data);
	root.sum(function(d) { return d.size; });

	var change = sunburstSVG.selectAll("path")
							.data(partition(root).descendants())

     change.attr("class", "update");

	 change.enter().append("path")
	         .attr("class", "enter")
			 .merge(change)
			 .attr("d", arc)
			 .attr("transform", "translate(" + widthSunburst / 2 + ","
											 + heightSunburst / 2 + ")")
			 .attr("id", function(d) {
									 return "sunburst" + d.data.name; })
			 .style("stroke", "white")
			 .style("stroke-width", "1px")
			 .style("fill", function(d) {
					 if (d.data.type == "one_family")
						 return colourOneFamily(parseFloat(d.data.name));
					 else if (d.data.type == "bungalow")
						 return colourBungalow(parseFloat(d.data.name));
					 else if (d.data.type == "mansion")
						 return colourMansion(parseFloat(d.data.name));
					 else
						 return colour(d.data.name); })
			 .on("click", function(d) {
					 if (d.data.children == null &&
						 d.data.name != "unused" &&
						 d.data.name != "one_family" &&
						 d.data.name != "bungalow" &&
						 d.data.name != "mansion")
						 return clickLink(d.data.name);
					 else
						 return clickZoom(d); })
			 .append("title")
			 .text(function(d) {
				 return d.data.name + "\n" +
						formatNumber(d.value / 288) + "%"; });

     change.exit().remove();

}
