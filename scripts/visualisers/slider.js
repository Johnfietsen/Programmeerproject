
function createSlider(data) {

	var sliderSVG = d3.select("#slider");

	var x = d3.scaleLinear()
			    .domain([0, 10])
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
	        .on("start drag", function() { update(x.invert(d3.event.x), data); }));

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
					    .attr("r", 9)
						.attr("id", "handle");

	// slider.transition() // Gratuitous intro!
	//     .duration(750)
	//     .tween("hue", function() {
	//       var i = d3.interpolate(0, 70);
	//       return function(t) { hue(i(t)); };
	//     });

	function update(i, data) {

	 	handle.attr("cx", x(i));

		iteration = Math.round(i);

		updateNetwork(3, data.network[iteration]);

		updateMap(data.map[iteration]);

		updateSunburst(data.sunburst[iteration]);

	}
};
