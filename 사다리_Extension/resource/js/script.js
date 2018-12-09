whale.extension.onMessage.addListener(function(message, messageSender, sendResponse) {
    // message is the message you sent, probably an object
    // messageSender is an object that contains info about the context that sent the message
    // sendResponse is a function to run when you have a response
	if (message['msg'] == 'loading bar off'){
		//console.log("mess: loading bar off");
		$('#loading').hide();
		data = message['data'];
		//console.log(data);
		change_context(data);

		//Load sentiment word
		senti_words = data.post.words

		var sentiment_class = ['Positive', "Neutral", "Negative"];
		var sentiment_value = [senti_words.positive.length, senti_words.neutral.length, senti_words.negative.length];

		var temp_sentiment_data = change_data_type(sentiment_value, sentiment_class);
		//console.log(temp_sentiment_data);
		
		if(sentiment_value[0] == 0 && sentiment_value[1] == 0 && sentiment_value[2] == 0){
			draw_sentiment_pie(temp_sentiment_data);
			$('#senti_check').css('display','block');
			$('#senti_pie').css('display','none');
		}
		else{
			$('#senti_pie').css('display','block');
			$('#senti_check').css('display','none');
			draw_sentiment_pie(temp_sentiment_data);
		}

		//Load piebarchart 
		var change_cluster6 = change_index(cluster6);
		var change_cluster7 = change_index(cluster7);
		var change_feature = change_index(features_name);


		var feature_set_names = ['글의 구조', '기타 정보', '글의 감정'];
		var feature_nums = [13, 13, 5];

	
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


		var left_mod_cluster0 = normalizeCluster(post_list);
		drawPie(feature_set_names, feature_nums, left_mod_cluster0);

		var cluster = data.post.Predict.predict_cluster_class;
		var cluster_list = "";
		if(cluster == 0)
			cluster_list = cluster0;
		else if(cluster == 1)
			cluster_list = cluster1;
		else if(cluster == 2)
			cluster_list = cluster2;
		else if(cluster == 5)
			cluster_list = cluster5;
		else if(cluster == 6)
			cluster_list = cluster6;
		else
			cluster_list = cluster7;



		var lefts = document.getElementsByClassName("total_left");

		//$(.total_left).find
		var right_mod_cluster1 = normalizeCluster(cluster_list);
		drawPie2(feature_set_names, feature_nums, right_mod_cluster1);

		//Load RadarChart
		draw_all_radar(data);

	}
	if (message['msg'] == 'loading bar on'){
		$('#loading').show();
	};
	if (message['msg'] == 'sidebar on'){
		whale.sidebarAction.show();
	};
});


function change_context(data){
	//predict_class = data["post"].Predict["predict_classes"];
	image_url = "";
	color_code = "";
	//내용 변경: 신뢰도 텍스트
	predict_prob = data["post"].Predict["prob"];
	if(predict_prob >= 0.7){
		credibility_text = "좋음";
		image_url = '/resource/project/good.png';
		color_code = "#4C994E";
	}
	else if(predict_prob >= 0.3 && predict_prob < 0.7){
		credibility_text = "주의";
		image_url = '/resource/project/soso.png';
		color_code = "#E77C19";
	}
	else{
		credibility_text = "경계";
		image_url = '/resource/project/alert.png';
		//console.log(image_url);
		color_code = "#BF604A";
	}

	//------------------------------------------------------
	//내용 변경: 블로그 타입
	predict_type = data["post"].Predict["blog_type"];
	
	if(predict_type == 1){
		credibility_sent = "<p>제품을 제공받아 체험 후 작성한 글로 추정됩니다</p>";
	}
	else if(predict_type == 2){
		credibility_sent = "<p>사진, 글을 제공받아 경험 없이 작성한 글로 추정됩니다.</p>";
	}
	else{
		credibility_sent = "<p>일반 블로거의 글로 추정됩니다</p>";
	}

	//------------------------------------------------------
	//내용 변경: 블로그 군집 특징
	predict_cluster = data["post"].Predict["predict_cluster_class"];
	if(predict_cluster == 5){
		details = "<p style='line-height:160%'>1. <strong>1인칭 2인칭 단어</strong>가 다른 블로그 집단에 비해서 제일 많이 사용되었습니다.</p><p style='line-height:160%'>2. 블로그 내부 글들의 <strong>구조가 자유롭고 다양</strong>합니다. </p>";
		cluster_type = "<p>A type</p>";
	}
	else if(data["post"].Predict["predict_cluster_class"] == 6){
		details = "<p style='line-height:160%'>1. 오른쪽, 왼쪽, 가운데 등 <strong>글의 정렬에 신경</strong>을 많이 쓴 블로그 집단 입니다. </p><p style='line-height:160%'>2. <strong>객관적</strong>으로 블로그를 작성한 것처럼 보입니다. </p><p style='line-height:160%'>3. 또한, 글 대비 <strong>사진 비율이 많이</strong> 사용되었습니다.</p>";
		cluster_type = "<p>B type</p>";
	}
	else if(data["post"].Predict["predict_cluster_class"] == 2){//2
		details = "<p style='line-height:160%'>1. <strong>감정을 나타내는 단어의 비중</strong>이 높습니다. </p><p style='line-height:160%'>2. 블로그의 <strong>글 구조가 자유</strong>롭고.</p><p style='line-height:160%'>3. 글 대비 <strong>사진 비율</strong>이 다른 집단과 비교하여 비교적 많이 사용되었습니다.</p>";
		cluster_type = "<p>C type</p>";
	}
	else if(data["post"].Predict["predict_cluster_class"] == 7){//
		details = "<p style='line-height:160%'>1. <strong>감정 점수값이 가장 높으며</strong>, 네이버에서 제공하는 <strong>스티커를 많이 사용</strong>하는 것으로 보입니다.</p><p style='line-height:160%'> 2. 동일 분야 내 에서 <strong>글과 이미지 수가 많은 특징</strong>을 보입니다.</p>";
		cluster_type = "<p>D type</p>";
	}
	else if(data["post"].Predict["predict_cluster_class"] == 0){
		details = "<p style='line-height:200%'>1. 다른 집단에 비해 <strong>물음표가 가장 많이 사용</strong>되었으며, <strong>긍정 단어의 사용 빈도</strong>가 높을 수 있습니다.</p><p style='line-height=200%'>2. 동일 분야 내에서 <strong>장문</strong>으로 글이 작성되었으며, <strong>태그가 가장 많이 사용</strong>되었습니다.</p><p style='line-height:200%'>3. 글의 <strong>띄어쓰기 오류</strong>가 상대적으로 다른 블로그들에 비해 많이 발견됩니다.</p>";
		cluster_type = "<p>E type</p>";
		}
	else if(data["post"].Predict["predict_cluster_class"] == 1){
		details = "<p style='line-height:160%'>1. <strong>가운데 정렬기능</strong>을 다른 정렬기능(왼쪽, 오른쪽, 양쪽)보다 많이 사용한 것으로 보입니다.</p><p style='line-height:160%'>2. 블로그 내부 글의 구조가 <strong>'사진-글-사진-글-사진'</strong> 혹은 <strong>'글-사진-글-사진-글'</strong> 순으로 일관되게 작성된 것으로 확인됩니다.</p>";
		cluster_type = "<p>F type</p>";
	}
	//-------------------------------------------------------
  
	
	$('.floating-image').css('background-image', "url(" + image_url + ")");
	
	$('#credibility-text').html(credibility_text);
	$('#credibility-text').css('color', color_code);
	$('#credibility-num').html("<p>신뢰성 확률: " + (100*predict_prob).toFixed(2).toString() + "%</p>");
	$('#credibility-sent').html(credibility_sent);
	$('.text-92').html(cluster_type);
	$('.text-76').html(cluster_type);
	$('.text-84').html(cluster_type);
	$('.text-93').html(cluster_type);
 	$('#details').html(details);

}


