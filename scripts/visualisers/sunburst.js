
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

	d3.json("/data/json/" + algorithm + ".json", function(error, data) {
	  if (error) throw error;

	  	var sunburstSVG = d3.select("body").select("#sunburst");

	  	root = d3.hierarchy(data.sunburst[iteration]);
	  	root.sum(function(d) { return d.size; });

	  	sunburstSVG.selectAll("path")
	      			.data(partition(root).descendants())
	    			.enter().append("path")
	      			.attr("d", arc)
					.attr("transform", "translate(" + widthSunburst / 2 + ","
													+ heightSunburst / 2 + ")")
					.style("fill", function(d) { return colour(d.data.name); })
	     			.on("click", click)
	    			.append("title")
	      			.text(function(d) {
						return d.data.name + "\n" + formatNumber(d.value); });
	});

	d3.select(self.frameElement).style("height", heightSunburst + "px");

}
