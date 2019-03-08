// @TODO: YOUR CODE HERE!

var svgWitdth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWitdth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWitdth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


url = "https://raw.githubusercontent.com/atchoate/atchoate.github.io/master/data.csv"
d3.csv(url).then(function(healthData) {
    //console.log(healthData)
    healthData.forEach(function(data) {
        //data.state = data.state;
        data.abbr = data.abbr;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
        console.log(data.abbr)
    });

    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d=> d.obesity)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([height, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "20")
    .attr("fill", "orange")
    .attr("opacity", ".3")
    .attr("stroke", "black");

    var textGroup = chartGroup.selectAll(".states")
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.obesity))
    .attr("y", d => yLinearScale(d.smokes))
    .text(d => d.abbr)
    .attr("color", "black")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height + 100)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Percentage of population that smokes")

    chartGroup.append("text")
    .attr("transform", `translate(${width / 3.5}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Percentage of population that is obese")
});