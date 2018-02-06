/*
 *  University:		University of Amsterdam
 *  Study:			Minor Programming
 *  Course:			Programmeerproject
 *  Name:			Luc Stefelmanns
 *  Student nr.:	10669124
 *
 * This script contains all the functions needed to create the slider and to
 * use the slider to control the iterations.
 */


function createSlider(data) {

	var sliderSVG = d3.select("#slider");

	var x = d3.scaleLinear()
			    .domain([0, 100])
			    .range([0, widthSlider - 2 * marginSlider.left])
			    .clamp(true);

	var slider = sliderSVG.append("g")
				    .attr("class", "slider")
				    .attr("transform", "translate(" + marginSlider.left + "," +
												  heightSlider / 2 + ")");

	slider.append("line")
		    .attr("class", "track")
		    .attr("x1", x.range()[0])
		    .attr("x2", x.range()[1])
			.select(function() {
					return this.parentNode.appendChild(this.cloneNode(true)); })
		    .attr("class", "track-inset")
			.select(function() {
					return this.parentNode.appendChild(this.cloneNode(true)); })
		    .attr("class", "track-overlay")
		    .call(d3.drag()
	        .on("start.interrupt", function() { slider.interrupt(); })
	        .on("start drag", function() {
										update(x.invert(d3.event.x), data); }));

	slider.insert("g", ".track-overlay")
		    .attr("class", "ticks")
		    .attr("transform", "translate(0," + 18 + ")")
			.selectAll("text")
			.data(x.ticks(10))
			.enter().append("text")
		    .attr("x", x)
		    .attr("text-anchor", "middle")
		    .text(function(d) { return d; });

	var handle = slider.insert("circle", ".track-overlay")
					    .attr("class", "handle")
					    .attr("r", 50)
						.attr("id", "handle")
						.style("fill", "blue")
						.attr("fill-opacity", 0.6);

	// introduction animation
	if (algorithm == "force_move") {

		slider.transition()
		    .duration(7500)
		    .tween("update", function() {
		      var i = d3.interpolate(0, 100);
		      return function(t) { update(i(t), data); };
		    });
	}


	function update(i, data) {

	 	handle.attr("cx", x(i));

		iteration = Math.round(i);

		updateNetwork(iteration, nrLinks, data);

		updateMap(data.map[iteration]);

		updateSunburst(data.sunburst[iteration]);

	}
};
