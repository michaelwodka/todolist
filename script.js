$(function setup(){
	var row = (
			'<div class = "row">' +
				'<div class = "col-xs-12 col-lg-4 col-lg-offset-4">' +
					'<div class ="box">' +
						'&nbsp;' +
					'</div>' +
				'</div>' +
			'</div>'
	);
	var windowh = $(window).height()
	var boxh = $(".box").height()
    var iter= Math.round((2/3)*(windowh/boxh))
    $.each(new Array(iter),function(){ 
        $("#adderdiv").after(row);
    });

    $(".box:odd").css("background-color", "rgb(224,224,224)");

    $('#clicker').on("click", function(){
    	var todo = $('#adder').val();
    	$('#plus').replaceWith(
    		'<input id = "checker" type="checkbox">'
    	);
    	$('#adder').replaceWith(
    		'<div id = "todotext">' + todo + '</div>'
    	);

    	$(this).parent().parent().next().replaceWith(
    		'<div class = "row" id = "adderdiv">' +
				'<div class = "col-xs-12 col-lg-4 col-lg-offset-4">' +
					'<div class = "col-xs-1 nopadding borderleft" id = "clicker">' +
						'<div id = "plus">&#43;</div>' +
					'</div>' +
					'<div class = "col-xs-11 nopadding">' +
						'<input type="text" id = "adder" placeholder = "New to-do...">' +
					'</div>' +
				'</div>' +
			'</div>'
    	);
    	$(".box:odd").css("background-color", "none");
    	$(".box:even").css("background-color", "rgb(224,224,224)");
	});
});

