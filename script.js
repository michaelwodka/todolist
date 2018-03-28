var row = [
		'<div class = "row">',
			'<div class = "col-xs-12 col-lg-4 col-lg-offset-4">',
				'<div class ="box">&nbsp;</div>',
			'</div>',
		'</div>'
];

$(function(){
	var windowh = $(window).height()
	var boxh = $(".box").height()
    var iter= Math.round((2/3)*(windowh/boxh))
    $.each(new Array(iter),function(){ 
        $("#adder").after(row);
    });

    $(".box:odd").css("background-color", "rgb(224,224,224)");
});

