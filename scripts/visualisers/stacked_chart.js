
var colour = d3.scaleOrdinal()
        		.range(["yellow", "orange", "red", "black"])
        		.domain(["one_family", "bungalow", "mansion", "side"]);

// define the area
var area = d3.area()
			    .x(function(d) { return x(d.i); })
			    .y0(function(d) { return y(d.min_temp); })
			    .y1(function(d) { return y(d.max_temp); });


// define the line
var line = d3.line()
			    .x(function(d) { return x(d.i); })
			    .y(function(d) { return y(d.value); });

// set the ranges
var x = d3.scaleTime().range([0, widthStacked]);
var y = d3.scaleLinear().range([heightStacked, 0]);

function createStackedChart(algorithm) {

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		var stackedSVG = d3.select("body").select("#stacked");

		stackedSVG
			.selectAll(".path")
			.data(hillclimber.stacked)
			.enter().append("path")
			.attr("class", "line")
			.style("stroke", function(d) { return d.color = colour(d.type); })
			.attr("d", function(d) { return line(d); });

		// var area = stackedSVG.append("g")
		// 			.attr("class", "area")
		// 			.selectAll("area")
		// 			.data(hillclimber.stacked)
		// 			.enter().append("area")
		// 			.style("fill", function(d) { console.log(d)});
	});
}
