function notification_error(){
	var img = whale.runtime.getURL('/resource/project/icon_error.png');
	$.notify({
		position: 'top-right',
		icon: img,
		className: 'el-notification',
		timeout: 5000,
		closeIcon: '',
		closable: true, // is closable?
		offset: 16 // in pixels
	});

	$('.el-notification').css('width','auto');
	$('.el-notification').css('background-color','');
	$(".el-notification").delay(4500).fadeTo("slow", 0.4);
	$('.el-notification').click(function(){
		whale.runtime.sendMessage({msg: 'sidebar on'});
	});
};

notification_error();

