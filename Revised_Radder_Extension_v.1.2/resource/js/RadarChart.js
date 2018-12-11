var draw_structure_radarChart = {
    draw: function(id, d, options){
        //console.log("check id: ", id)
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        var mod_num = 2.2;
//		var d = [d];
//		for (var i =0; i<d.length;i++){
//			console.log(d[i]);
//		};
        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/mod_num, cfg.h/mod_num);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 50)  + "," + (cfg.TranslateY + 20)  + ")");

        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/mod_num-levelFactor) + ", " + (cfg.h/mod_num-levelFactor) + ")");
        }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/mod_num)
            .attr("y1", cfg.h/mod_num)
            .attr("x2", function(d, i){return cfg.w/2.3*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2.3*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        if (id == "#structure_left") {
            axis.append("text")
                .attr("class", "legend")
                .text(function(d){return d})
                .style("font-size", "15px")
                // .style('font-weight', '650')
                .style('fill', 'gray')
                .attr("text-anchor", "middle")
                .attr("dy", "1.5em")
                .attr("transform", function(d, i){return "translate(-5, -20)"})
                .attr("x", function(d, i){return cfg.w/2.1*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-25*Math.sin(i*cfg.radians/total);})
                .attr("y", function(d, i){return cfg.h/2.1*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);})

                .on("mouseover", function(d) {
                    d3.select("#tooltip_structure_left")
                        .style("left", 0 + "px")
                        .style("top", 5 + "px")
                        .select("#text_structure_left")
                        .text("\u00A0 이미지나 글의 배치 순서 \u00A0\u00A0\u00A0\u00A0\u00A0 (text-image-text-image-text)");
                    d3.select("#tooltip_structure_left").classed("hidden", false);
                })

                .on("mouseout", function() {
                    d3.select("#tooltip_structure_left").classed("hidden", true);
                });
        }

        else if (id == "#structure_right") {
            axis.append("text")
                .attr("class", "legend")
                .text(function(d){return d})
                .style("font-size", "15px")
                // .style('font-weight', '650')
                .style('fill', 'gray')
                .attr("text-anchor", "middle")
                .attr("dy", "1.5em")
                .attr("transform", function(d, i){return "translate(-5, -20)"})
                .attr("x", function(d, i){return cfg.w/2.1*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-25*Math.sin(i*cfg.radians/total);})
                .attr("y", function(d, i){return cfg.h/2.1*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);})

                .on("mouseover", function(d) {
                    d3.select("#tooltip_structure_right")
                        .style("left", 0 + "px")
                        .style("top", 5 + "px")
                        .select("#text_structure_right")
                        .text("\u00A0 이미지나 글의 배치 순서 \u00A0\u00A0\u00A0\u00A0\u00A0 (text-image-text-image-text)");
                    d3.select("#tooltip_structure_right").classed("hidden", false);
                })

                .on("mouseout", function() {
                    d3.select("#tooltip_structure_right").classed("hidden", true);
                });
        }


        d.forEach(function(y, x){
			dataValues = [];
			//console.log("Y: " , y);
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2.3*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2.3*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
			//console.log('polygon data ibnida', dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", '#00e6b9')
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return '#00e6b9'})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.5)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2.3*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2.3*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2.3*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2.3*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", '#00e6b9').style("fill-opacity", .9)
            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};

var sentiment_text = [
    '\u00A0 \u00A0  p : 긍정, n : 부정, N : 전체  \u00A0 \u00A0 \u00A0 P / N',
    '\u00A0 \u00A0  p : 긍정, n : 부정, N : 전체  \u00A0 \u00A0 \u00A0 n / N',
    '\u00A0 \u00A0  p : 긍정, n : 부정, N : 전체  \u00A0 \u00A0 \u00A0 (n + p) / N',
    '\u00A0 \u00A0  p : 긍정, n : 부정, N : 전체  \u00A0 \u00A0 \u00A0 (p - n) / (p + n)',
    '\u00A0 \u00A0  p : 긍정, n : 부정, N : 전체  \u00A0 \u00A0 \u00A0 (p - n) / N',
];

var draw_emotion_radarChart = {
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 50)  + "," + (cfg.TranslateY + 20)  + ")");

        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        if (id == "#sentiment_left") {
            axis.append("text")
                .attr("class", "legend")
                .text(function(d){return d})
                .style("font-size", "13px")
                // .style('font-weight', '650')
                .style('fill', 'gray')
                .attr("text-anchor", "middle")
                .attr("dy", "1.5em")
                .attr("transform", function(d, i){return "translate(-5, -15)"})
                .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-15*Math.sin(i*cfg.radians/total);})
                .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-15*Math.cos(i*cfg.radians/total);})
                .on("mouseover", function(d, i) {
                    d3.select("#tooltip_sentiment_left")
                        .style("left", 0 + "px")
                        .style("top", 5 + "px")
                        .select("#text_sentiment_left")
                        .text(sentiment_text[i]);
                    d3.select("#tooltip_sentiment_left").classed("hidden", false);
                })
                .on("mouseout", function() {
                    d3.select("#tooltip_sentiment_left").classed("hidden", true);
                });
        }

        else if (id == "#sentiment_right") {
            axis.append("text")
                .attr("class", "legend")
                .text(function(d){return d})
                .style("font-size", "13px")
                // .style('font-weight', '650')
                .style('fill', 'gray')
                .attr("text-anchor", "middle")
                .attr("dy", "1.5em")
                .attr("transform", function(d, i){return "translate(-5, -15)"})
                .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-15*Math.sin(i*cfg.radians/total);})
                .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-15*Math.cos(i*cfg.radians/total);})

                .on("mouseover", function(d, i) {
                    d3.select("#tooltip_sentiment_right")
                        .style("left", 0 + "px")
                        .style("top", 5 + "px")
                        .select("#text_sentiment_right")
                        .text(sentiment_text[i]);
                    d3.select("#tooltip_sentiment_right").classed("hidden", false);
                })

                .on("mouseout", function() {
                    d3.select("#tooltip_sentiment_right").classed("hidden", true);
                });
        }

        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
			//console.log('check_value', dataValues);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", '#00e6b9')
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return '#00e6b9'})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", '#00e6b9').style("fill-opacity", .9)
            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};

var draw_others_radarChart = {
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 50)  + "," + (cfg.TranslateY + 20)  + ")");

        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            .style("font-size", "11px")
            // .style('font-weight', '650')
            .style('fill', 'gray')
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(-8, -15)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-25*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", "#00e6b9")  // 도형 겉선
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return "#00e6b9"})  // 도형 안쪽 색
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", "#00e6b9")
                .style("fill-opacity", .9) // 원색
            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};


var RadarChart = {
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 60)  + "," + (cfg.TranslateY + 20)  + ")");
        ;
        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        // //Text indicating at what % each level is
        // for(var j=0; j<cfg.levels; j++){
        //     var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        //     g.selectAll(".levels")
        //         .data([1]) //dummy data
        //         .enter()
        //         .append("svg:text")
        //         .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
        //         .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
        //         .attr("class", "legend")
        //         .style("font-family", "sans-serif")
        //         .style("font-size", "8px")
        //         .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
        //         .attr("fill", "#737373")
        //         .text(Format((j+1)*cfg.maxValue/cfg.levels));
        // }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            // .style("font-family", "Nanum Pen Script")
            .style("font-size", "16px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(0, -10)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-20*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-15*Math.cos(i*cfg.radians/total);});


        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return cfg.color(series)})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
            // .on('mouseover', function (d){
            //     newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            //     newY =  parseFloat(d3.select(this).attr('cy')) - 5;
            //
            //     tooltip
            //         .attr('x', newX)
            //         .attr('y', newY)
            //         .text(Format(d.value))
            //         .transition(200)
            //         .style('opacity', 1);
            //
            //     z = "polygon."+d3.select(this).attr("class");
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", 0.1);
            //     g.selectAll(z)
            //         .transition(200)
            //         .style("fill-opacity", .7);
            // })
            // .on('mouseout', function(){
            //     tooltip
            //         .transition(200)
            //         .style('opacity', 0);
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", cfg.opacityArea);
            // })
            // .append("svg:title")
            // .text(function(j){return Math.max(j.value, 0)});

            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};

var RadarChart2 = {
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 60)  + "," + (cfg.TranslateY + 20)  + ")");
        ;
        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        // //Text indicating at what % each level is
        // for(var j=0; j<cfg.levels; j++){
        //     var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        //     g.selectAll(".levels")
        //         .data([1]) //dummy data
        //         .enter()
        //         .append("svg:text")
        //         .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
        //         .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
        //         .attr("class", "legend")
        //         .style("font-family", "sans-serif")
        //         .style("font-size", "8px")
        //         .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
        //         .attr("fill", "#737373")
        //         .text(Format((j+1)*cfg.maxValue/cfg.levels));
        // }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            // .style("font-family", "Nanum Pen Script")
            .style("font-size", "16px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(0, -10)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-20*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-15*Math.cos(i*cfg.radians/total);});


        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return cfg.color(series)})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
            // .on('mouseover', function (d){
            //     newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            //     newY =  parseFloat(d3.select(this).attr('cy')) - 5;
            //
            //     tooltip
            //         .attr('x', newX)
            //         .attr('y', newY)
            //         .text(Format(d.value))
            //         .transition(200)
            //         .style('opacity', 1);
            //
            //     z = "polygon."+d3.select(this).attr("class");
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", 0.1);
            //     g.selectAll(z)
            //         .transition(200)
            //         .style("fill-opacity", .7);
            // })
            // .on('mouseout', function(){
            //     tooltip
            //         .transition(200)
            //         .style('opacity', 0);
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", cfg.opacityArea);
            // })
            // .append("svg:title")
            // .text(function(j){return Math.max(j.value, 0)});

            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};


var RadarChart3 = { // font 18
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 50)  + "," + (cfg.TranslateY + 20)  + ")");
        ;
        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        // //Text indicating at what % each level is
        // for(var j=0; j<cfg.levels; j++){
        //     var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        //     g.selectAll(".levels")
        //         .data([1]) //dummy data
        //         .enter()
        //         .append("svg:text")
        //         .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
        //         .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
        //         .attr("class", "legend")
        //         .style("font-family", "sans-serif")
        //         .style("font-size", "8px")
        //         .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
        //         .attr("fill", "#737373")
        //         .text(Format((j+1)*cfg.maxValue/cfg.levels));
        // }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            // .style("font-family", "Nanum Pen Script")
            .style("font-size", "18px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(0, -10)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-20*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return cfg.color(series)})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
            // .on('mouseover', function (d){
            //     newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            //     newY =  parseFloat(d3.select(this).attr('cy')) - 5;
            //
            //     tooltip
            //         .attr('x', newX)
            //         .attr('y', newY)
            //         .text(Format(d.value))
            //         .transition(200)
            //         .style('opacity', 1);
            //
            //     z = "polygon."+d3.select(this).attr("class");
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", 0.1);
            //     g.selectAll(z)
            //         .transition(200)
            //         .style("fill-opacity", .7);
            // })
            // .on('mouseout', function(){
            //     tooltip
            //         .transition(200)
            //         .style('opacity', 0);
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", cfg.opacityArea);
            // })
            // .append("svg:title")
            // .text(function(j){return Math.max(j.value, 0)});

            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};

var RadarChart4 = { // font 18
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 50)  + "," + (cfg.TranslateY + 20)  + ")");

        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            .style("font-size", "15px")
            // .style('font-weight', '650')
            .style('fill', 'gray')
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(-5, -15)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-25*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return cfg.color(series)})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};

var Temp_RadarChart = { // font 18
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 250,
            h: 250,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        // render here!!!!!!!!!!!!!!!!!!!!, 위치조정
        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + (cfg.TranslateX - 50)  + "," + (cfg.TranslateY + 20)  + ")");

        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        // //Text indicating at what % each level is
        // for(var j=0; j<cfg.levels; j++){
        //     var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        //     g.selectAll(".levels")
        //         .data([1]) //dummy data
        //         .enter()
        //         .append("svg:text")
        //         .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
        //         .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
        //         .attr("class", "legend")
        //         .style("font-family", "sans-serif")
        //         .style("font-size", "8px")
        //         .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
        //         .attr("fill", "#737373")
        //         .text(Format((j+1)*cfg.maxValue/cfg.levels));
        // }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            .style("font-size", "15px")
            // .style('font-weight', '650')
            .style('fill', 'gray')
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(-5, -15)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-25*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return cfg.color(series)})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius - 1.2)  // 원 크기 조절
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
            // .on('mouseover', function (d){
            //     newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            //     newY =  parseFloat(d3.select(this).attr('cy')) - 5;
            //
            //     tooltip
            //         .attr('x', newX)
            //         .attr('y', newY)
            //         .text(Format(d.value))
            //         .transition(200)
            //         .style('opacity', 1);
            //
            //     z = "polygon."+d3.select(this).attr("class");
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", 0.1);
            //     g.selectAll(z)
            //         .transition(200)
            //         .style("fill-opacity", .7);
            // })
            // .on('mouseout', function(){
            //     tooltip
            //         .transition(200)
            //         .style('opacity', 0);
            //     g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", cfg.opacityArea);
            // })
            // .append("svg:title")
            // .text(function(j){return Math.max(j.value, 0)});

            series++;
        });

        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};
