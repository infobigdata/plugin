d3.select('#test')
    .style('color', 'red')
    .text('d3');


//build  a  rect





!function () {
    var dataset = [250, 210, 170, 130, 90];
    var rectHeight = 25;
    var svg = d3.select('.container')
        .append('svg')
        .attr('width', 700)
        .attr('height', 100);


    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr("x", 20)
        .attr("y", function (d, i) {
            return i * rectHeight;
        })
        .attr("width", function (d) {
            return d;
        })
        .attr("height", rectHeight - 2)
        .attr("fill", "steelblue");
}();


//build  a  rect  width  scale

!function () {
    var dataset = [250, 210, 170, 130, 90];
    var rectHeight = 25;
    var svg = d3.select('.container2')
        .append('svg')
        .attr('width', 700)
        .attr('height', 100);

    //定义比例尺,返回的是一个function

    let linear = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 600]);


    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr("x", 20)
        .attr("y", function (d, i) {
            return i * rectHeight;
        })
        .attr("width", function (d) {
            return linear(d);
        })
        .attr("height", rectHeight - 2)
        .attr("fill", "red")

}();

!function () {
    var dataset = [250, 210, 170, 130, 90];
    var rectHeight = 25;
    var svg = d3.select('.container3')
        .append('svg')
        .attr('width', 1000)
        .attr('height', 300);

    //定义比例尺,返回的是一个function

    let linear = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 600]);
    svg.selectAll('rect')
        .data(dataset)
        .enter()
       
        .append('rect')
        .attr("x", 20)
        .attr("y", function (d, i) {
            return i * rectHeight;
        })
        .attr("width", function (d) {
            return linear(d);
        })
        .attr("height", rectHeight - 2)
        .attr("fill", "red")
        .transition()
        .duration(2000)
         .delay(200)
       
        .attr('fill', 'blue');;


    var axis = d3.axisBottom()
        .scale(linear)
        .ticks(20)
        .tickPadding(60)
        .tickSize(40);

    //指定刻度的数量

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(20,130)")
        .call(axis);
}();




