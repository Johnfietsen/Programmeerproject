
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


function click(d) {

	var sunburstSVG = d3.select("body").select("#sunburst");

  	sunburstSVG.transition()
    			.duration(750)
    			.tween("scale", function() {
					    var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
					        yd = d3.interpolate(y.domain(), [d.y0, 1]),
					        yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0,
															radiusSunburst]);
					    return function(t) { x.domain(xd(t));
											 y.domain(yd(t)).range(yr(t)); };
					})
    			.selectAll("path")
      			.attrTween("d", function(d) {
						return function() { return arc(d); }; });
	}



function createSunburst(iteration, algorithm) {

	var sunburstSVG = d3.select("body").select("#sunburst");

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
								return clickLink(d.data.name);
							else
								return click(d); })
	    			.append("title")
	      			.text(function(d) {
						return d.data.name + "\n" +
							   formatNumber(d.value / 288) + "%"; });
	});

	d3.select(self.frameElement).style("height", heightSunburst + "px");

}


function updateDataSunburst(data) {

	var networkSVG = d3.select("#map");

	var t = d3.transition()
    			.duration(10);

	// JOIN new data with old elements.
	var change = networkSVG.selectAll("path")
							.data(data, function(d) { return d; });

	console.log("sunburst");
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
					 return click(d); })
		 .append("title")
		 .text(function(d) {
			 return d.data.name + "\n" +
					formatNumber(d.value / 288) + "%"; });


       //   .attr("dy", ".35em")
       //   .text(function(d) { return d; })
       // .merge(text)
       //   .attr("x", function(d, i) { return i * 32; });

     // EXIT
     // Remove old elements as needed.
     change.exit().remove();

}



function updateSunburst(iteration, algorithm) {

	var sunburstSVG = d3.select("body").select("#sunburst");


	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
	  if (error) throw error;

		updateDataSunburst(data.sunburst[iteration]);


	})


	// sunburstSVG.selectAll("path").remove();
    //
	// createSunburst(iteration, algorithm);

}
