
var category = 0;
var url="";

whale.sidebarAction.show();
whale.sidebarAction.hide();

whale.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
	if (tab.url != url) {
		url = tab.url;
		if((url.match("//blog.naver.com/") && !url.match("Redirect")) || url.match(".blog.me/")) {
			whale.runtime.sendMessage({msg: 'loading bar on'});
			ajax_post();
		};
	};
});
//blog.naver.com/juble93?Redirect=Log&logNo=221380270514

function ajax_post(){
	$.ajax({
		type: "POST",
		//url: "http://127.0.0.1:8000/analysis/",
		url: "http://54.180.103.78:8000/analysis/",
		data: {
			'url': url,
			'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val()
		},
		success: Success,
		dataType: 'json'
	});

};

function Success(data, textStatus, jqXHR){
	var image_url = "";
	var s = document.createElement('script');
	
	try{
		predict_prob = data.post.Predict.prob;

		if(predict_prob >= 0.7){
			s.src = whale.extension.getURL('notification_good.js');
		}
		else if(predict_prob >= 0.3 && predict_prob < 0.7){
			s.src = whale.extension.getURL('notification_soso.js');
		}
		else{
			s.src = whale.extension.getURL('notification_alert.js');
		}
		whale.runtime.sendMessage({msg: 'loading bar off', data: data});
	}
	catch(e){
		s.src = whale.extension.getURL('notification_error.js');
		//whale.runtime.sendMessage({msg: 'loading bar on'});
	}
	
	(document.body).appendChild(s);
};

