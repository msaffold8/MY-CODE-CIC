let toDoList = [
];
let searchResults = [];
updateHTML();
function addNewTask(event) {
	event.preventDefault();
	const formField = document.getElementById("newTaskField");
	toDoList.push({ name: formField.value, done: false });
	formField.value = "";
	updateHTML();
}
function editButtonPressed(index) {
	const newName = window.prompt("Enter new name here:");
	toDoList[index].name = newName;
	updateHTML();
}
function deleteButtonPressed(index) {
	if (window.confirm("Are you sure you want to delete this?")) {
		toDoList.splice(index, 1);
		updateHTML();
	}
}
function doneButtonPressed(index) {
	toDoList[index].done = !toDoList[index].done;
	updateHTML();
}
function updateHTML() {
	const searchResultsList = document.getElementById("searchResultsList");
	let htmlSearchListToUpdate = "";
	for (const searchResult of searchResults) {
		console.log(searchResult);
		htmlSearchListToUpdate += `<li class="list-group-item">${searchResult.name}</li>`;
	}
	searchResultsList.innerHTML = htmlSearchListToUpdate;
	const list = document.getElementById("list");
	let htmlToUpdate = "";
	//loop type 1
	for (const [index, toDoTask] of toDoList.entries()) {
		htmlToUpdate =
			htmlToUpdate +
			`<li class="list-group-item" style="text-decoration: ${
				toDoTask.done === true ? "line-through" : "none"
			} ">
				<div class="row">
					<div class="col-8">
						${toDoTask.name}
					</div>
					<div class="col-4 text-end">
                        <button class="btn" onclick="doneButtonPressed(${index})"><i class="fas fa-check"></i></button>
						<button class="btn" onclick="editButtonPressed(${index})"><i class="fas fa-edit"></i></button>
						<button class="btn" onclick="deleteButtonPressed(${index})"><i class="fas fa-trash"></i></button>	
					</div>
				</div>
			</li>
			`;
	}
		list.innerHTML = htmlToUpdate;	
}
function resetToDos() {
	toDoList = [];
	updateHTML();
}
function search(event) {
	event.preventDefault();
	const searchField = document.getElementById("searchField");
	searchResults = [];
	for (const toDoItem of toDoList) {
		if (toDoItem.name.includes(searchField.value)) {
			searchResults.push(toDoItem);
		} 
	}
	updateHTML();
}