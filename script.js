var row = (
		'<div class = "row">' +
			'<div class = "col-xs-12 col-lg-4 col-lg-offset-4">' +
				'<div class ="box">' +
					'&nbsp;' +
				'</div>' +
			'</div>' +
		'</div>'
);

$(document).ready(function toDoListSetup(){
	var windowh = $(window).height();
	var boxh = $(".box").height();
    var iter= Math.round((2/3)*(windowh/boxh));
    $.each(new Array(iter),function(){ 
        $("#adderdiv").after(row);
    });

    $(".box:odd").css("background-color", "rgb(202,222,245)");
    $('#adder').select();
});

function addToDoItem(){
	var todo = $('#adder').val();
	var currentcolor =  $(this).css("background-color");
	var nextcolor = $(this).parent().parent().next().find('.box').css("background-color");

	if ($('#adder').val()){

		if ($(this).parent().parent().prev().find(".glyphicon").length !=0){
			setTrashCans();
		}

		if ($(this).parent().parent().next().find("#footer").length != 0){
			$(row).insertAfter($(this).parent().parent());
			$('#footer').css('background-color', currentcolor)
		}

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

		var toDoHTML = $('<div class = "todotext strikethrough">' + todo + '</div>').replaceAll($("#adder"))

		var checkerHTML = $('<div class = "col-xs-1 nopadding borderleft">' +
				'<input class = "checker" type="checkbox">' +
			'</div>').replaceAll($('#clicker'));	

		checkerHTML.height(toDoHTML.height())

		$('#clicker').css('background-color', nextcolor);
		$('#adder').css('background-color', nextcolor);
		$('#adder').select();

		$('.todotext:last').css('background-color', currentcolor);
		$('.todotext:last').toggleClass('strikethrough');
		$('.checker:last').parent().css('background-color', currentcolor);

		setEvents();
	}; 
};

function completeToDoItem(){
	$(this).parent().parent().find(".todotext").toggleClass("strikethrough");
};

function editToDoItem(){
	if (!$(this).parent().parent().find(".checker").is(":checked")){
		var text = $(this).text();
		var currentcolor =  $(this).css("background-color");
		var checkerbox = $(this).parent().siblings();

		if (text == "To-do cannot be left blank. Try again."){
			var text = ""
		}

		var newhtml = $('<input type="text" id = "edit" value = "' + text + '">');
		newhtml.replaceAll($(this));
		checkerbox.height(newhtml.height());
		newhtml.css('background-color', currentcolor);
		newhtml.focus();
	}
	setEvents();
};

function finishEditingToDoItem(){
	var todo = $("#edit").val();
	var currentcolor =  $("#edit").css("background-color");
	var newhtml = $('<div class = "todotext strikethrough">' + todo + '</div>');
	var checkerbox = $("#edit").parent().siblings();

	if (todo == ""){
		var newhtml = $('<div class = "todotext strikethrough">' + "To-do cannot be left blank. Try again." + '</div>');
		newhtml.css("color", "rgba(0, 0, 0, 0.2)");
	}
	newhtml.replaceAll($("#edit"));
	checkerbox.height(newhtml.height());
	newhtml.css('background-color', currentcolor);
	newhtml.toggleClass("strikethrough");
	setEvents();
};

function setTrashCans(){
	if ($(".checker").length){
		$(".checker").replaceWith('<div class="glyphicon glyphicon-trash trash" aria-hidden="true"></div>');
	} else {
		$(".trash").replaceWith('<input class = "checker" type="checkbox">');

		$(".checker").each(function(){
			if($(this).parent().next().find(".strikethrough").length){
				$(this).prop('checked', true);
			}			
		}); 
	}
	setEvents();
};

function deleteToDoItem(){
	$(this).parent().parent().parent().prev().nextAll().each(function(){
		
		var nextHTML = $(this).next().html();
		var currentcolor = $(this).find('.todotext').css("background-color");

		$(this).html(nextHTML);

		if($(this).next().next().find('.box').length != 0){
			var boxcolor = $(this).next().next().find('.box').css("background-color");
		} else if($(this).next().next().find('.box').length == 0 && $(this).prev().prev().find('.box').length != 0){
			var boxcolor = $(this).prev().prev().find('.box').css("background-color");
			$('#footer').removeAttr('id');
		} else if($(this).next().next().find('.box').length == 0 && $(this).prev().prev().find('.box').length == 0){
			var boxcolor = $(this).prev().prev().find('.todotext').css("background-color");
			var boxcolor2 = $(this).prev().prev().find('input').css("background-color");
			$('#footer').removeAttr('id');
		}

		$(this).find('.todotext').css("background-color", currentcolor);
		$(this).find('.col-xs-1').css("background-color", currentcolor);
		$(this).find('input').css("background-color", currentcolor);
		$(this).find('.box').css("background-color", boxcolor);
		$(this).find('.box').css("background-color", boxcolor2);
		$(".box:last").attr('id', 'footer');
	});
	setEvents();
};

function setEvents(){
	setTimeout(function(){$("#clicker").off().on("click", addToDoItem)}, 100);
	setTimeout(function(){$("#adder").off().keypress(function(event){
		if (event.which === 13){
			$("#clicker").click();
		}
	})}, 100);

	setTimeout(function(){$("#adder").blur(function(){
		$("#clicker").click();
	})}, 100);

	$(".checker").off().on("change", completeToDoItem);

	$(".todotext").off().on("click", editToDoItem);
	
	$("#edit").off().keypress(function(event){
		if (event.which === 13){
			finishEditingToDoItem();
		}
	});

	$("#edit").blur(function(event){
		finishEditingToDoItem();
	});

	$("#editer").off().on("click", setTrashCans);

	$(".trash").off().on("click", deleteToDoItem);

};

setEvents();
