var g_radius = 0;
var width = 230;
var height = 277;
// var radius = Math.min(width, height) / 2;
var radius = 65;

var features_name = [
    'iiiii', 'iiiiT', 'iiiTi', 'iiTii', 'iiTiT', 'iTiii', 'iTiiT', 'iTiTi', 'Tiiii', 'TiiiT', 'TiiTi', 'TiTii', 'TiTiT',
    '긍정 비율', '부정 비율', '주관성', ' 극성', '감정 점수',
    '물음표', '1인칭', '2인칭', '태그', '스티커', '글의 길이', '문법 실수', '글 비율', '이미지 비율', '좌측 정렬', '중앙 정렬', '우측 정렬', '양쪽 정렬',
];

var cluster0 = ["0.0960266421957069", "0.00787982109676833", "-0.0464269359068195",	"0.265603797466947", "0.11470555962997", "-0.031447503779021",
                "0.0523949847687876", "-0.13192043563986", "0.116591162566959", "0.384132386171496", "-0.0066510713470866", "0.0109159305900427",
                "0.0177985070710213", "0.131733408173854", "-0.0260365928648823", "0.0316152334933393", "0.00139075322021878", "-0.0183214607991319",
                "-0.321316190174736", "-0.262142210923018", "-0.161207725742385", "-0.0769963646506167", "1.47574341110817", "-0.191489532546659",
                "1.22873600002049", "0.489271438810187", "-0.273179417407276", "-0.0771144811012169", "1.18461670762202", "1.43210552433548", "0.0639195460525605"
                ];

var cluster1 = ["0.0391260010962168", "-0.0421140376761872"	, "-0.0385747190849452", "0.0160722601588082", "0.0448136959951243", "-0.00863004408560442",
    "0.0228292069785749", "-0.0418755409977778", "0.0425920379016689", "-0.00761405678490863", "-0.0109360961449799", "0.00475892982724065", "0.00397478957171064",
    "-0.089447189480283", "-0.0266807963327303", "0.16361838108173", "-0.0310656837578399", "-0.0438812777350499", "-0.329194316807491", "-0.300360062544035",
    "-0.349614507928033", "-0.382596811998234", "-0.468236299118979", "-0.346464929687918", "-0.428740901966752", "0.68866204232281", "-0.29731720786464",
    "-0.244197209982115", "-0.472761383997883", "-0.415152403139016", "0.829734410910009"
];

var cluster2 = ["-0.046117312380441", "0.0160600130439295", "-0.0211271992955302", "0.189740749558295", "0.117223268890795", "0.0990622084866983", "0.138210809933315",
    "-0.00305682962165622", "0.0129872351210979", "-0.03123047457015", "-0.0157806072094972", "-0.0231158835048614", "-0.00105839285494101", "0.355935054445167",
    "0.0127750844483985", "-0.156340239978946", "-0.00962453548787258", "0.0397919460012126", "0.289992268844422", "1.93902284096105", "2.41300186424075", "1.11062470445996",
    "0.897726176051832", "2.47688578695373", "0.214199256611424", "-0.514298571612435", "1.92720431497524", "1.56498177448453", "0.285735477422815", "0.933344786297646", "-0.781106666181344"
];

var cluster5 = [ "-0.178654303454159", "0.108903727240238", "0.268201229730673", "-0.487748549522151", "-0.294473622309503", "-0.0154886860834278", "-0.19660239077165",
    "0.168004494814712", "-0.221455150510888", "-0.305294453548541", "-0.0341074415557498", "-0.073254365976645", "-0.162282829927665", "-0.789216759368045", "-0.0333404909771123",
    "-0.483318221476517", "0.0518686888188681", "-0.0227569331801566", "-0.335604445235715", "-0.323171262113747", "-0.378121864044385", "-0.394483325064799", "-0.567954454694843",
    "-0.414983196696702", "-0.574451324627518", "-1.47588380879748", "-0.328492375414953", "-0.163339723385491", "-0.536835389676524", "-0.634026964063876", "-1.39419874990409"
];

var cluster6 = [
    "3.32847499540335", "0.651420488336364", "-0.0419621749944767", "-0.202536604081548", "-0.462954613299078", "-0.0222995417460369", "-0.522563204424996",
    "-1.38985455641859", "0.652690269402334", "-0.270528271285193", "-0.479000298947077", "-0.48203919994166", "-1.35346501600199", "-0.489727237294504",
    "-0.475300605106072", "-0.617059388610785", "0.0467864654579654", "-0.0045374276408288", "-0.188361508841506", "-0.165380731468355", "-0.0909128727567253",
    "-0.0938371373020125", "-0.119176838711655", "-0.056207094879778", "-0.0842946531652946", "-0.22397673533673", "0.934132887726445", "0.0573198739676373",
    "0.145984097777938", "0.0371985328520435", "0.16037988254158"
];

var cluster7 = ["0.0265760731455914", "0.000938365106654291", "-0.0563136826608126", "0.251030329110453", "0.103828291468555", "-0.00573673978031048", "0.0620937222355514", "-0.108927954230313",
    "0.0871437387837856", "0.681116337138811", "-0.00764479046711473", "0.0105757169037046", "0.0261376760294165", "0.204436621204662", "0.0045034161072889", "-0.138943222283512",
    "-0.0331066063705814", "0.0250059257000453", "-0.296002517040968", "-0.160263299848419", "0.281741546918466", "2.85335010825683", "0.969944463083269", "0.230759567100241", "2.52798891782846", "-0.706989322363369",
    "-0.171637607829254", "0.387818198957734", "2.67227959283093", "0.760600928109697", "-0.952777385637961"
];

// #########################################################
// 순서가 꼬여 있음..   , 이걸로 index 순서를 맞춰야 한다!!
function change_index(data) {
    var change_list = [];

    // 글의 구조 넣기 - 1
    for (var i = 0; i < 5; i ++) {
            change_list.push(data[i]);
    }
    // 기타 범위 넣기
    for (var i = 18; i < 31; i ++) {
        change_list.push(data[i]);
    }
    // 글의 감정 넣기
    for (var i = 13; i < 18; i ++) {
        change_list.push(data[i]);
    }
    // 글의 구조 넣기 - 2
    for (var i = 5; i < 13; i ++) {
        change_list.push(data[i]);
    }

    return change_list;
}

var change_cluster6 = change_index(cluster6);
var change_cluster7 = change_index(cluster7);

var change_feature = change_index(features_name);

// ########################################################

function normalize(val, max, min) { return (val - min) / (max - min); }

function normalizeCluster(data){
    var cluster_data = data;
    var mod_data = [];

    for (var i = 0 ; i < cluster_data.length; i++){
        var parsed = parseFloat(cluster_data[i], 10);
        mod_data.push(parsed);
    }

    var max_value = Math.max.apply(null, mod_data);
    var min_value = Math.min.apply(null, mod_data);

    var normal_cluster = [];
    for (var i = 0; i < mod_data.length; i++){
        normal_cluster.push( (normalize(mod_data[i], max_value, min_value)) );
    }
    return normal_cluster;
}


function drawPie(names, datas, cluster_data) {
	$('.total_left').remove();

	//console.log("!!!!!!!!!!!!In drawpie!!!!!!!!!!!!!!11");
    var features_count = 0;
    var pie_data = datas;
    var pie_name = names;
    var radar_render = d3.select("#total_left").append("svg").attr('class', 'total_left');
        //width = svg.attr("width"),
        //height = svg.attr("height"),
        //radius = Math.min(width, height) / 2,
    var g = radar_render.append("g")
            .attr("transform", "translate(" + width / 2.0 + "," + height / 2.0 + ")");

    // var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00']); // 기존 색, 초 파 주

    var color = d3.scaleOrdinal(['#cdfaf0','#00e6b9','#000f3b']); // 웨일 색

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
        .innerRadius(55)   // 여기가 안에 있는 pie 크기 조절하는 변수
        .outerRadius(radius-5);

    // Generate the arc
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);

    // Generate groups
    var arcs = g.selectAll("arc")
        .data(pie(pie_data))
        .enter()
        .append("g")
        .attr("class", "arc")

    // Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

    // Pie text 넣는 곳
    arcs.append("text")
        .attr("transform", function(d, i) {
            if (i == 0) { // 글의 구조
                return "translate(" + (label.centroid(d)[0] + 5) + "," + (label.centroid(d)[1] + 5) + ")";
            }
            else if (i == 1){ // 기타
                return "translate(" + (label.centroid(d)[0] - 5) + "," + (label.centroid(d)[1] + 12) + ")";
            }
            
            else { // 글의 감정
                return "translate(" + (label.centroid(d)[0] - 5) + "," + (label.centroid(d)[1] - 12) + ")";
            }
        })
        .style("font-size", "10px")  // 여기서 해결..
        // .style("font-weight", "bold")
        .style('fill', 'gray')
        .text(function(d, i) { return pie_name[i]; });

    // 원 둘레로 막대 그래프 그리기
    var circle_center_x = width / 2;
    var circle_center_y = height / 2;

    // var data = [0.1, 0.3, 0.7, 0.2, 1.2, 0.5, 0.7, 0.8, 1.7, 1.2,
    //             0.1, 0.3, 0.7, 0.2, 1.2, 0.5, 0.7, 0.8, 1.7, 1.2,
    //             0.1, 0.3, 0.7, 0.2, 1.2, 0.5, 0.7, 0.8, 1.7, 1.2];

    var data = cluster_data;

    // draw bar chart
    // 우선 하나의 바가 차지할 수 있는 넓이를 구하기
    var circumference = radius * 2 * Math.PI;
    var bar_area_width = (circumference / data.length) - 5; // height
    // bar chart 그리기
    for (var i = 0; i < data.length; i++) {
        if (data[i] == 0) {
            data[i] = 0.01;
        }
        // 이번 차례에 그릴 바의 '크기' 구하기
        var rect_size = (data[i]) * 5;
        // 이번 차례에 그릴 바의 '각도' 구하기
        var theta = (2 * Math.PI) * (i / data.length); // 0 ~ 2 * PI
        var degree = theta * (180 / Math.PI);
        // 이번 차례에 그릴 바의 위치 구하기
        var bar_x = circle_center_x + (Math.cos(theta) * radius);
        var bar_y = circle_center_y + (Math.sin(theta) * radius);

        var structure_count = 0;
        var sentiment_count = 0;
        var others_count = 0;

        // bar chart 색깔 별로 칠하기
        // 인덱스의 시작은 글의 구조 부터
        (function () {
            // 글의 구조 범위 0 ~ 4 / 23 ~ 31
            if (i >= 23 || i < 5) {
                var text_data = change_feature[features_count];
                radar_render.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', rect_size * 7)
                    .attr('height', bar_area_width)
                    .attr('transform', 'translate(' + bar_x + ',' + bar_y + ') rotate(' + (degree + 5) + ')')
                    .attr('fill', '#cdfaf0')
                    // .attr('opacity', 0.5)
                    .attr('stroke', '#cccccc')
                    .on("mouseover", function (d) {
                        d3.select("#tooltip_left")
                            .style("left", 60 + "px")
                            .style("top", 5 + "px")
                            .select("#text_total_left")
                            .text(text_data);
                        d3.select("#tooltip_left").classed("hidden", false);
                    })
                    .on("mouseout", function () {
                        d3.select("#tooltip_left").classed("hidden", true);
                    })
                features_count += 1;
            }

            // 기타 범위 5 ~ 17
            else if (i > 4 && i < 18) {
                var text_data = change_feature[features_count];
                radar_render.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', rect_size * 7)
                    .attr('height', bar_area_width)
                    .attr('transform', 'translate(' + bar_x + ',' + bar_y + ') rotate(' + (degree + 5) + ')')
                    .attr('fill', '#00e6b9')
                    // .attr('opacity', 0.5)
                    .attr('stroke', '#cccccc')
                    .on("mouseover", function (d) {
                        d3.select("#tooltip_left")
                            .style("left", 60 + "px")
                            .style("top", 5 + "px")
                            .select("#text_total_left")
                            .text(text_data);
                        d3.select("#tooltip_left").classed("hidden", false);
                    })
                    .on("mouseout", function () {
                        d3.select("#tooltip_left").classed("hidden", true);
                    })
                features_count += 1;
            }
            // 글의 감정 범위 18 ~ 22
            else if (i >= 18 && i < 23) {
                var text_data = change_feature[features_count];
                radar_render.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', rect_size * 7)
                    .attr('height', bar_area_width)
                    .attr('transform', 'translate(' + bar_x + ',' + bar_y + ') rotate(' + (degree + 5) + ')')
                    .attr('fill', '#000f3b')
                    // .attr('opacity', 0.5)
                    .attr('stroke', '#cccccc')
                    .on("mouseover", function (d) {
                        d3.select("#tooltip_left")
                            .style("left", 60 + "px")
                            .style("top", 5 + "px")
                            .select("#text_total_left")
                            .text(text_data);
                        d3.select("#tooltip_left").classed("hidden", false);
                    })
                    .on("mouseout", function () {
                        d3.select("#tooltip_left").classed("hidden", true);
                    })
                features_count += 1;
            }
        }) ();
    }
}


function drawPie2(names, datas, cluster_data) {
	$('.total_right').remove();

    var features_count = 0;
    var pie_data = datas;
    var pie_name = names;
    var radar_render = d3.select("#total_right").append("svg").attr('class', 'total_right');
        //width = svg.attr("width"),
        //height = svg.attr("height"),
        //radius = Math.min(width, height) / 2,
    var g = radar_render.append("g")
            .attr("transform", "translate(" + width / 2.0 + "," + height / 2.0 + ")");

    var color = d3.scaleOrdinal(['#cdfaf0','#00e6b9','#000f3b']); // 웨일 색
	//	.domain(d3.range(0, 2));

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
        .innerRadius(55)   // 여기가 안에 있는 pie 크기 조절하는 변수
        .outerRadius(radius-5);

    // Generate the arc
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);

    // Generate groups
    var arcs = g.selectAll("arc")
        .data(pie(pie_data))
        .enter()
        .append("g")
        .attr("class", "arc")

    // Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

    // Pie text 넣는 곳
    arcs.append("text")
        .attr("transform", function(d, i) {
            if (i == 0) { // 글의 구조
                return "translate(" + (label.centroid(d)[0] + 5) + "," + (label.centroid(d)[1] + 5) + ")";
            }
            else if (i == 1){ // 기타
                return "translate(" + (label.centroid(d)[0] - 5) + "," + (label.centroid(d)[1] + 12) + ")";
            }

            else { // 글의 감정
                return "translate(" + (label.centroid(d)[0] - 5) + "," + (label.centroid(d)[1] - 12) + ")";
            }
        })
        .style("font-size", "10px")  // 여기서 해결..
        // .style("font-weight", "bold")
        .style('fill', 'gray')
        .text(function(d, i) { return pie_name[i]; });

    // 원 둘레로 막대 그래프 그리기
    var circle_center_x = width / 2;
    var circle_center_y = height / 2;

    // var data = [0.1, 0.3, 0.7, 0.2, 1.2, 0.5, 0.7, 0.8, 1.7, 1.2,
    //             0.1, 0.3, 0.7, 0.2, 1.2, 0.5, 0.7, 0.8, 1.7, 1.2,
    //             0.1, 0.3, 0.7, 0.2, 1.2, 0.5, 0.7, 0.8, 1.7, 1.2];

    var data = cluster_data;

    // draw bar chart
    // 우선 하나의 바가 차지할 수 있는 넓이를 구하기
    var circumference = radius * 2 * Math.PI;
    var bar_area_width = (circumference / data.length) - 5; // height
    // bar chart 그리기
    for (var i = 0; i < data.length; i++) {
        if (data[i] == 0) {
            data[i] = 0.01;
        }
        // 이번 차례에 그릴 바의 '크기' 구하기
        var rect_size = (data[i]) * 5;
        // 이번 차례에 그릴 바의 '각도' 구하기
        var theta = (2 * Math.PI) * (i / data.length); // 0 ~ 2 * PI
        var degree = theta * (180 / Math.PI);
        // 이번 차례에 그릴 바의 위치 구하기
        var bar_x = circle_center_x + (Math.cos(theta) * radius);
        var bar_y = circle_center_y + (Math.sin(theta) * radius);

        var structure_count = 0;
        var sentiment_count = 0;
        var others_count = 0;

        // bar chart 색깔 별로 칠하기
        // 인덱스의 시작은 글의 구조 부터
        (function () {
            // 글의 구조 범위 0 ~ 4 / 23 ~ 31
            if (i >= 23 || i < 5) {
                var text_data = change_feature[features_count];
                radar_render.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', rect_size * 7)
                    .attr('height', bar_area_width)
                    .attr('transform', 'translate(' + bar_x + ',' + bar_y + ') rotate(' + (degree + 5) + ')')
                    .attr('fill', '#cdfaf0')
                    // .attr('opacity', 0.5)
                    .attr('stroke', '#cccccc')
                    .on("mouseover", function(d) {
                        d3.select("#tooltip_right")
                            .style("left", 55 + "px")
                            .style("top", 5 + "px")
                            .select("#text_total_right")
                            .text(text_data);
                        d3.select("#tooltip_right").classed("hidden", false);
                    })
                    .on("mouseout", function() {
                        d3.select("#tooltip_right").classed("hidden", true);
                    })
                features_count += 1;
            }

            // 기타 범위 5 ~ 17
            else if (i > 4 && i < 18) {
                var text_data = change_feature[features_count];
                radar_render.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', rect_size * 7)
                    .attr('height', bar_area_width)
                    .attr('transform', 'translate(' + bar_x + ',' + bar_y + ') rotate(' + (degree + 5) + ')')
                    .attr('fill', '#00e6b9')
                    // .attr('opacity', 0.5)
                    .attr('stroke', '#cccccc')
                    .on("mouseover", function(d) {
                        d3.select("#tooltip_right")
                            .style("left", 60 + "px")
                            .style("top", 5 + "px")
                            .select("#text_total_right")
                            .text(text_data);
                        d3.select("#tooltip_right").classed("hidden", false);
                    })
                    .on("mouseout", function() {
                        d3.select("#tooltip_right").classed("hidden", true);
                    })
                features_count += 1;
            }
            // 글의 감정 범위 18 ~ 22
            else if (i >= 18 && i < 23) {
                var text_data = change_feature[features_count];
                radar_render.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', rect_size * 7)
                    .attr('height', bar_area_width)
                    .attr('transform', 'translate(' + bar_x + ',' + bar_y + ') rotate(' + (degree + 5) + ')')
                    .attr('fill', '#000f3b')
                    // .attr('opacity', 0.5)
                    .attr('stroke', '#cccccc')
                    .on("mouseover", function(d) {
                        d3.select("#tooltip_right")
                            .style("left", 60 + "px")
                            .style("top", 5 + "px")
                            .select("#text_total_right")
                            .text(text_data);
                        d3.select("#tooltip_right").classed("hidden", false);
                    })
                    .on("mouseout", function() {
                        d3.select("#tooltip_right").classed("hidden", true);
                    })
                features_count += 1;
            }
        }) ();
    }
}

