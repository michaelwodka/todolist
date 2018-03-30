$(document).ready(function setup(){
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

    $(".box:odd").css("background-color", "rgb(202,222,245)");
});

function clicker(){
	var todo = $('#adder').val();
	var currentcolor =  $(this).css("background-color")
	var nextcolor = $(this).parent().parent().next().find('.box').css("background-color")

	$(this).parent().parent().next().replaceWith(
		'<div class = "row">' +
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

	$('#clicker').replaceWith(
		'<div class = "col-xs-1 nopadding borderleft">' +
			'<input id = "checker" type="checkbox">' +
		'</div>'	
	);

	$('#adder').replaceWith('<div id = "todotext">' + todo + '</div>');

	$('#clicker').css('background-color', nextcolor)
	$('#adder').css('background-color', nextcolor)

	console.log($(this).parent().prev().attr('id'))

	$('#todotext').css('background-color', currentcolor)
	$('#checker').parent().css('background-color', currentcolor)

	setter();
};

function setter(){
	setTimeout(function(){$("#clicker").on("click", clicker)}, 100);
};

setter();