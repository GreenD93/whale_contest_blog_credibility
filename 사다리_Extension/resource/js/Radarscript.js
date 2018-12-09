var w = 175,
    h = 185;

var colorscale = ['#eaec96', '#43c0ac', '#a93199', '#fa0559', '#6b76ff',
                  '#6b76ff', '#ff7657', '#74b49b', '#ffcd3c', '#7acfdf'];

//Legend titles
var LegendOptions = ['Credible','Non-Credible'];
var structure_features = ['img img img img img', 'img img img img text', 'img img img text img', 'img img text img img', 'img img text img text',
                           'img text img img img', 'img text img img text', 'img text img text img', 'text img img img img', 'text img img img text',
                            'text img img text img', 'text img text img img', 'text img text img text'];
var view_structure_features = ['iiiii', 'iiiiT', 'iiiTi', 'iiTii', 'iiTiT', 'iTiii', 'iTiiT', 'iTiTi', 'Tiiii', 'TiiiT', 'TiiTi', 'TiTii', 'TiTiT'];
var structure_index = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

var sentiment_features = ['pos_ratio', 'neg_ratio', 'subjectivity', 'polarity', 'senti_diffs_per_ref'];
var view_sentiment_features = ['긍정 비율', '부정 비율', '주관성', ' 극성', '감정 점수'];
var sentiment_index = [4, 5, 6, 7, 8];

var others_features = ['Question_count', 'First_ratio', 'Second_ratio', 'Tag_count', 'Sticker_count', 'Text_len', 'Count_space_mistake', 'effort_ratio', 'effort_img_ratio', 'Left', 'Center', 'Right', 'Justify'];
var view_others_features = ['물음표', '1인칭', '2인칭', '태그', '스티커', '글의 길이', '문법 실수', '글 비율', '이미지 비율', '좌측 정렬', '중앙 정렬', '우측 정렬', '양쪽 정렬'];
var others_index = [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17];

var temp_data0 = [0.096026642, 0.007879821, -0.046426936, 0.265603797, 0.11470556, -0.031447504, 0.052394985, -0.131920436,
                   0.116591163,	0.384132386, -0.006651071, 0.010915931, 0.017798507, 0.131733408, -0.026036593, 0.031615233, 0.001390753,
                   -0.018321461, -0.32131619, -0.262142211, -0.161207726, -0.076996365, 1.475743411, -0.191489533, 1.228736,
                    0.489271439, -0.273179417, -0.077114481, 1.184616708, 1.432105524, 0.063919546];

var temp_data1 = [0.039126001, -0.042114038, -0.038574719, 0.01607226, 0.044813696, -0.008630044, 0.022829207, -0.041875541, 0.042592038,
    -0.007614057, -0.010936096, 0.00475893, 0.00397479, -0.089447189, -0.026680796, 0.163618381, -0.031065684, -0.043881278, -0.329194317,
    -0.300360063, -0.349614508, -0.382596812, -0.468236299, -0.34646493, -0.428740902, 0.688662042, -0.297317208, -0.24419721, -0.472761384,
    -0.415152403, 0.829734411
];

var temp_data2 = [-0.046117312, 0.016060013, -0.021127199, 0.18974075, 0.117223269, 0.099062208, 0.13821081, -0.00305683, 0.012987235, -0.031230475,
    -0.015780607, -0.023115884, -0.001058393, 0.355935054, 0.012775084, -0.15634024, -0.009624535, 0.039791946, 0.289992269, 1.939022841, 2.413001864,
    1.110624704, 0.897726176, 2.476885787, 0.214199257, -0.514298572, 1.927204315, 1.564981774, 0.285735477, 0.933344786, -0.781106666
];

var temp_data5 = [-0.178654303, 0.108903727, 0.26820123, -0.48774855, -0.294473622, -0.015488686, -0.196602391, 0.168004495, -0.221455151, -0.305294454,
    -0.034107442, -0.073254366, -0.16228283, -0.789216759, -0.033340491, -0.483318221, 0.051868689, -0.022756933, -0.335604445, -0.323171262, -0.378121864,
    -0.394483325, -0.567954455, -0.414983197, -0.574451325, -1.475883809, -0.328492375, -0.163339723, -0.53683539, -0.634026964, -1.39419875
];

var temp_data6 = [-0.188361509, -0.165380731, -0.090912873, -0.093837137, -0.489727237, -0.475300605, -0.617059389, 0.046786465, -0.004537428, -0.119176839,
    -0.056207095, -0.084294653, -0.223976735, 0.934132888, 0.057319874, 0.145984098, 0.037198533, 0.160379883, 3.328474995, 0.651420488, -0.041962175,
    -0.202536604, -0.462954613, -0.022299542, -0.522563204, -1.389854556, 0.652690269, -0.270528271, -0.479000299, -0.4820392, -1.353465016
];

var temp_data7 = [0.026576073, 0.000938365, -0.056313683, 0.251030329, 0.103828291, -0.00573674, 0.062093722, -0.108927954, 0.087143739, 0.681116337,
    -0.00764479, 0.010575717, 0.026137676, 0.204436621, 0.004503416, -0.138943222, -0.033106606, 0.025005926, -0.296002517, -0.1602633, 0.281741547, 2.853350108,
    0.969944463, 0.230759567, 2.527988918, -0.706989322, -0.171637608, 0.387818199, 2.672279593, 0.760600928, -0.952777386
];

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

// 임시용, normal_left_data
function temp_return_cluster_value(data, features, features_index){   // data, features
    var cluster_data = [];
    for (var i = 0; i < features.length; i ++){
        cluster_data.push(data[features_index[i]]);
    }
    return cluster_data;
}

// // cluster_value 구하기, csv용
// function return_cluster_value(data, features){   // data, features
//     var cluster_data = [];
//     for (var i = 0; i < features.length; i ++){
//         cluster_data.push(data[features[i]]);
//     }
//     console.log("cluster_data: ", cluster_data);
//     return cluster_data;
// }

// data type 맞추기
//Data


function draw_all_radar(data){
	function change_data_type(data, features){
		var cluster_data = []; // 최종 형태
		var cluster_list = [];
		for (var i = 0; i < features.length; i ++){
			var cluster_dict = {};
			for (var j = 0; j < features.length; j ++){
				cluster_dict['axis'] = features[i];
				cluster_dict['value'] = data[i];
			}
			cluster_list.push(cluster_dict);
		}
		cluster_data.push(cluster_list);
		//console.log('console.log_cluster_data', cluster_data);
		return cluster_data;
	}
	post = data.post
	var post_list = [
		post.Structure['img img img img img'],		
		post.Structure['img img img img text'],
		post.Structure['img img img text img'],
		post.Structure['img img text img img'],
		post.Structure['img img text img text'],
		post.Structure['img text img img img'],
		post.Structure['img text img img text'],
		post.Structure['img text img text img'],
		post.Structure['text img img img img'],
		post.Structure['text img img img text'],
		post.Structure['text img img text img'],
		post.Structure['text img text img img'],
		post.Structure['text img text img text'],

		post.Sentiment['pos_ratio'],
		post.Sentiment['neg_ratio'],
		post.Sentiment['subjectivity'],
		post.Sentiment['polarity'],
		post.Sentiment['senti_diffs_per_ref'],

		post.Other['Question_count'],
		post.Other['First_ratio'],
		post.Other['Second_ratio'],
		post.Other['Tag_count'],
		post.Other['Sticker_count'],
		post.Other['Text_len'],
		post.Other['Count_space_mistake'],
		post.Other['effort_ratio'],
		post.Other['effort_img_ratio'],
		post.Other['Left'],
		post.Other['Center'],
		post.Other['Right'],
		post.Other['Justify']
	];


	var cluster_id = post.Predict.predict_cluster_class;

	var cluster_data = data.clusters[cluster_id];
	
	var cluster_list = [
		cluster_data['img img img img img'],		
		cluster_data['img img img img text'],
		cluster_data['img img img text img'],
		cluster_data['img img text img img'],
		cluster_data['img img text img text'],
		cluster_data['img text img img img'],
		cluster_data['img text img img text'],
		cluster_data['img text img text img'],
		cluster_data['text img img img img'],
		cluster_data['text img img img text'],
		cluster_data['text img img text img'],
		cluster_data['text img text img img'],
		cluster_data['text img text img text'],
		
		cluster_data['pos_ratio'],
		cluster_data['neg_ratio'],
		cluster_data['subjectivity'],
		cluster_data['polarity'],
		cluster_data['senti_diffs_per_ref'],
		
		cluster_data['Question_count'],
		cluster_data['First_ratio'],
		cluster_data['Second_ratio'],
		cluster_data['Tag_count'],
		cluster_data['Sticker_count'],
		cluster_data['Text_len'],
		cluster_data['Count_space_mistake'],
		cluster_data['effort_ratio'],
		cluster_data['effort_img_ratio'],
		cluster_data['Left'],
		cluster_data['Center'],
		cluster_data['Right'],
		cluster_data['Justify']
	]

	//console.log("Post data: ", post_list);
	//console.log("Cluster data: ", cluster_list);

	var normal_left_data = normalizeCluster(post_list);
	var normal_right_data = normalizeCluster(cluster_list);
	// console.log("normal_left_data: ", normal_left_data);

	// structure
	var left_structure_value = temp_return_cluster_value(normal_left_data, structure_features, structure_index);
	var left_structure_data = change_data_type(left_structure_value, view_structure_features);

	var right_structure_value = temp_return_cluster_value(normal_right_data, structure_features, structure_index);
	var right_structure_data = change_data_type(right_structure_value, view_structure_features);
	// console.log("left_structure_value: ", left_structure_value);

	// sentiment
	var left_sentiment_value = temp_return_cluster_value(normal_left_data, sentiment_features, sentiment_index);
	var left_sentiment_data = change_data_type(left_sentiment_value, view_sentiment_features);

	var right_sentiment_value = temp_return_cluster_value(normal_right_data, sentiment_features, sentiment_index);
	var right_sentiment_data = change_data_type(right_sentiment_value, view_sentiment_features);
	// console.log("left_sentiment_value: ", left_sentiment_value);

	// others
	var left_others_value = temp_return_cluster_value(normal_left_data, others_features, others_index);
	var left_ohters_data = change_data_type(left_others_value, view_others_features);
	var right_others_value = temp_return_cluster_value(normal_right_data, others_features, others_index);
	var right_others_data = change_data_type(right_others_value, view_others_features);
	// console.log("left_others_value: ", left_others_value);

	//Options for the Radar chart, other than default
	var mycfg = {
		w: w,
		h: h,
		maxValue: 0.6,
		levels: 6,
		ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	draw_structure_radarChart.draw("#structure_left", left_structure_data, mycfg);
	draw_structure_radarChart.draw("#structure_right", right_structure_data, mycfg);
	//console.log('left-data_length', left_structure_data.length);
	//console.log('right_data_length', right_structure_data.length);

	draw_emotion_radarChart.draw("#sentiment_left", left_sentiment_data, mycfg);
	draw_emotion_radarChart.draw("#sentiment_right", right_sentiment_data, mycfg);

	draw_others_radarChart.draw("#others_left", left_ohters_data, mycfg);
	draw_others_radarChart.draw("#others_right", right_others_data, mycfg);
}



