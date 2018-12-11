// data type 맞추기
function change_data_type(data, features){
    var cluster_data = []; // 최종 형태
    for (var i = 0; i < features.length; i ++){
        var cluster_dict = {};
        cluster_dict['str_lab'] = features[i];
        cluster_dict['num'] = data[i];
        cluster_data.push(cluster_dict);
    }
    return cluster_data;
}


function draw_sentiment_pie(data){
    var total_width = 400,
        total_height = 400;

    var width = 524,
        height = 330,
        radius = Math.min(width, height) / 2;

    var divNode = d3.select("body").node();

    var outerRadius = radius - 10,
        innerRadius = radius - 80;

    var color = d3.scaleOrdinal(["#54AF97","#DDD7BB","#E05E42"]);

// var color = d3.scaleOrdinal(["#E05E42","#DDD7BB","#54AF97"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 60);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.num; });
//
//    d3.select("#chart").append("div")
//        .attr("width", total_width)
//        .attr("height", total_height)
//        .attr("id","mainPie")
//        .attr("class","pieBox");

    senti_svg = d3.select("#senti_pie").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2.0 + ")");

    var defs = senti_svg.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height","130%");

    filter.append("feGaussianBlur")
        .attr("in","SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");

    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 3)
        .attr("dy", 3)
        .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    var g = senti_svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");


// legend
    var legend_color = ["#54AF97","#DDD7BB","#E05E42"];

    for (var i = 0; i < 3; i ++){
        g.append("rect")
            .attr('x', 168)
            .attr('y', -165 + i * 18)
            .attr('width', 30)
            .attr('height', 15)
            // .attr("transform", "translate(" + width / 2 + "," + height / 2.0 + ")")
            .attr('fill', legend_color[i])
    }

    var legend_text = ["Positive", 'Neutral', 'Negative'];

    for (var i = 0; i < 3; i ++){
        g.append("text")
            .attr('x', 203)
            .attr('y', -153 + i * 18)
            .text(legend_text[i])
            .style("fill", "gray")
            .style("text-anchor", "start")
            .style("font-size", "13px")
    }


    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); })

        .on("mousemove", function(d) {
            d3.select(this)
                .attr("stroke","#fff")
                .attr("stroke-width","2px")
                .style("filter", "url(#drop-shadow)");
            d3.select(this)
                .transition()
                .duration(500)
                .ease(d3.easeElastic)
                .attr('transform', function(d){
                    var dist = 1;
                    d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
                    var x = Math.sin(d.midAngle) * dist;
                    var y = Math.cos(d.midAngle) * dist;
                    return 'translate(' + x + ',' + y + ')';
                });
            var mousePos = d3.mouse(divNode);
            d3.select("#mainTooltip")
                .style("left", mousePos[0] - 120 + "px")
                .style("top", mousePos[1] - 805 + "px")
                .select("#value")
                .attr("text-anchor", "middle")
                .html(d.data.str_lab + "<br />" + d.data.num);

            d3.select("#mainTooltip").classed("hidden", false);
        })

        .on("mouseout", function(d){
            d3.select(this)
                .attr("stroke","none")
                .style("filter","none");
            d3.select(this)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr('transform','translate(0,0)');

            d3.select("#mainTooltip").classed("hidden", true);
        });
}

 
