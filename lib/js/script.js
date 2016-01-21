jQuery(document).ready(function($){
	var item = document.getElementById('input');
	var complete = "<i id=\"complete\" class=\"fa fa-check complete\"></i>";
	var remove = "<i id=\"remove\" class=\"fa fa-times remove\"></i>";
	var incompleteUl = $("ul#to-do");
	var completeUl = $("ul#not-to-do");
	var toDoList = [];
	var notToDoList = [];

	//Add task to the to do list
	function addTask(){
		if (item.value.length >= 1) {
			incompleteUl.append('<li>' + complete + item.value + remove + '</li>');
			toDoList.push(item.value);
		}else {
			alert("Please add a task");
		}
		completeTask();
		removeTask();
		addClear();
		item.value = "";
	};

	//When check is clicked add to Not To Do list
	function completeTask(){
		$(".complete").unbind("click").click(function(){
			var single = $(this).closest("li");
			var splice = toDoList.splice(single.index(), 1);

			notToDoList.push(splice);
			completeUl.append(single);
			$(this).remove();
			$("ul#not-to-do i#remove").remove();
			addClear();
		});
	};

	//When x is clicked remove task from list
	function removeTask(){
		$(".remove").unbind("click").click(function(){
			var single = $(this).closest("li");
			
			toDoList.splice(single.index(), 1);
			single.remove();
			addClear();
		});
	};

	function addClear() {
		if (toDoList.length >= 1) {
			$("button#add").addClass("add");
			$("button#clear").show().addClass("clear");
		}
		if (toDoList.length < 1){
			$("button#add").removeClass("add");
			$("button#clear").hide().removeClass("clear");
		}
	};

	//Removes all tasks from task list
	function clearToDoList() {
		toDoList = [];
		$("ul#to-do li").remove();
	};

	//Add task by click of button
	$("button#add").click(function(){
		addTask();
		
		console.log(toDoList);
	});

	//Add task by press of enter
	$('#input').keypress(function (e){
    	if(e.which ==13) {
	        addTask();
		}	
	});

	//Removes all tasks from task list
	$("#clear").click(function(){
		clearToDoList();
	});



});

