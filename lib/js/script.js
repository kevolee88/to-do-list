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
			incompleteUl.append('<li>' + '<p>' + item.value + '</p>' + complete + remove + '</li>');
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
			var html = $(this).siblings("p").html();

			//Check if html in p tag matches with string in toDoList array
			for (var i=0; i < toDoList.length; i++) {
				if (html == toDoList[i]){
					//If match push into notToDoList array
					notToDoList.push(html);
				}
			}

			//Removes string from toDoList array
			var splice = toDoList.splice(single.index(), 1);

			//Moves list element to not to do list
			completeUl.append(single);

			//Removes the complete button
			$(this).remove();

			//Removes the remove button
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

	//If there is item in list display clear button
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
		addClear();
	};

	function clearNotToDoList() {
		notToDoList = [];
		$("ul#not-to-do li").remove();
	}

	//Add task by click of button
	$("button#add").click(function(){
		addTask();
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

	//Removes all tasks from completed list
	$("#clear-complete").click(function(){
		clearNotToDoList();
	});


});

