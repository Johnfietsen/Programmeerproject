
var colour = d3.scaleOrdinal()
        		.range(["yellow", "orange", "red", "black"])
        		.domain(["one_family", "bungalow", "mansion", "side"]);

// define the area
var area = d3.area()
			    .x(function(d) { return x(d.i); })
			    .y0(function(d) { return y(d.min_temp); })
			    .y1(function(d) { return y(d.max_temp); });

function createStackedChart(algorithm) {

	d3.json("/data/json/" + algorithm + ".json", function(error, hillclimber) {
		if (error) throw error;

		var stackedSVG = d3.select("body").select("#stacked");

		var area = stackedSVG.append("g")
					.attr("class", "area")
					.selectAll("area")
					.data(hillclimber.stacked)
					.enter().append("area");
}
