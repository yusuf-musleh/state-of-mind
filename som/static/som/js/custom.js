setInterval(function(){
	if($('#item1').is(':visible')){
		$('#kofta').empty();
		$('#kofta').append('<i class="fa fa-text-width fa-lg"></i>')
	}
	if($('#item2').is(':visible')){
		$('#kofta').empty();
		$('#kofta').append('<i class="fa fa-picture-o fa-lg"></i>')
	}
	if($('#item3').is(':visible')){
		$('#kofta').empty();
		$('#kofta').append('<i class="fa fa-pencil fa-lg"></i>')
	}
	if($('#item4').is(':visible')){
		$('#kofta').empty();
		$('#kofta').append('<i class="fa fa-video-camera fa-lg"></i>')
	}
	if($('#item5').is(':visible')){
		$('#kofta').empty();
		$('#kofta').append('<i class="fa fa-microphone fa-lg"></i>')
	}
}, 200);