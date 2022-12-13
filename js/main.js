//menagment
const addNewTaskBtn = document.querySelector('.bar__add-new');
const addNewPopupBack = document.querySelector('.popup__back');
const addNewPopup = document.querySelector('.add-new-popup');
const todoBtn = document.querySelector('.bar__todo');
const todoList = document.querySelector('.list');
const todoListBack = document.querySelector('.list__back');
const nav = document.querySelector('.nav');
const mainSection = document.querySelector('.main');
//ad task
const inputText = document.querySelector('#add-new-text');
const newTaskSelect = document.querySelector('#choose-new');
const newTaskSaveBtn = document.querySelector('.popup__save');
const newTaskError = document.querySelector('.error');
const taskBody = document.querySelector('.list__body');
const chooseSorting = document.querySelector('#chose-category');
const allTasks = document.querySelectorAll('.category__ammount');
const allTask = document.querySelector('.category__ammount-all');

let errorCounter = 0;
let taskID = 0;
const tasksCategory = [];
const icons = [
	`<i class="fa-solid fa-briefcase"></i>`,
	`<i class="fa-solid fa-dumbbell"></i>`,
	`<i class="fa-solid fa-user-large"></i>`,
	`<i class="fa-solid fa-location-dot"></i>`,
	`<i class="fa-solid fa-graduation-cap"></i>`,
	`<i class="fa-solid fa-cart-shopping"></i>`,
];
const saveTaskIcon = [];
const categoriesAmmount = [0, 0, 0, 0, 0, 0, 0];
let allCategoriesAmmount = 0;

const clearNewTask = () => {
	newTaskError.textContent = '';
	inputText.value = '';
	newTaskSelect.selectedIndex = 0;
};
const countTasksAdd = (category) => {
	
	for (let i = 0; i < categoriesAmmount.length; i++) {
		if (allTasks[i].id == category) {
			categoriesAmmount[i]++;
			allCategoriesAmmount++;
			allTasks[i].textContent = `${categoriesAmmount[i]} Tasks`;
			allTask.textContent = `${allCategoriesAmmount} Tasks`;
		}
	}
};
const countTaskRemove = (category) => {
	
	for (let i = 0; i < categoriesAmmount.length; i++) {
		if (allTasks[i].id == category) {
			
				
				categoriesAmmount[i]--;
				allCategoriesAmmount--;
			
			
			allTasks[i].textContent = `${categoriesAmmount[i]} Tasks`;
			allTask.textContent = `${allCategoriesAmmount} Tasks`;
		}
	}
};
const countTasksDone = (taskDone, prevoius) => {
	const category = taskDone.children[0].children[1];

	if (category.textContent === 'Done') {
		countTaskRemove(prevoius);
		categoriesAmmount[0]++;
	} else {
		countTasksAdd(prevoius);
		if (categoriesAmmount[0] != 0) categoriesAmmount[0]--;

	}
	allTasks[0].textContent = `${categoriesAmmount[0]} Tasks`;
};
const sorting = () => {
	const choosen = chooseSorting[chooseSorting.selectedIndex].textContent;
	const allTask = document.querySelectorAll('.list__item');
	allTask.forEach((item) => {
		if (choosen == 'All') {
			item.style.display = 'flex';
		} else {
			if (item.children[0].children[1].textContent != choosen) {
				item.style.display = 'none';
			} else {
				item.style.display = 'flex';
			}
		}
	});
};
const taskToDelete = (taskDelete) => {
	const category = taskDelete.children[0].children[1].textContent;
	countTaskRemove(category);
	taskBody.removeChild(taskDelete);
};
const taskMarkDone = (taskDone) => {
	const taskCategory = taskDone.querySelector('.list__name');
	const taskTextBody = taskDone.querySelector('.list__middle');
	const taskIcon = taskDone.querySelector('.list__icon');
	const taskMarkBtn = taskDone.querySelector('.list__done');

	if (taskIcon.innerHTML != '<i class="fa-solid fa-check"></i>') {
		taskIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
		taskIcon.style.color = 'white';
		taskTextBody.classList.add('list__middle--done');
		taskCategory.textContent = 'Done';
		taskDone.style.backgroundColor = 'rgb(0 59 233 / 75%)';
		taskMarkBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`;
		taskDone.style.color = 'white';
	} else if (taskIcon.innerHTML == '<i class="fa-solid fa-check"></i>') {
		taskIcon.innerHTML = `${saveTaskIcon[taskDone.id]}`;
		taskIcon.style.color = 'rgb(0 59 233 / 75%)';
		taskTextBody.classList.remove('list__middle--done');
		taskCategory.textContent = ` ${tasksCategory[taskDone.id]}`;
		taskDone.style.backgroundColor = 'white';
		taskDone.style.color = 'black';
		taskMarkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
	}
	countTasksDone(taskDone, tasksCategory[taskDone.id]);
	sorting();
};
const checkClick = (e) => {
	const currentTask = e.target.parentElement.parentElement;
	if (e.target.classList.contains('list__done')) {
		taskMarkDone(currentTask);
	} else if (e.target.classList.contains('list__delete')) {
		taskToDelete(currentTask);
	}
};
const creatTask = (input, category, iconIndex) => {
	const newTaskBox = document.createElement('div');
	const newTaskBoxLeft = document.createElement('div');
	const newTaskBoxMiddle = document.createElement('div');
	const newTaskBoxRight = document.createElement('div');
	const newTaskText = document.createElement('p');
	newTaskText.textContent = input;

	newTaskBox.setAttribute('id', taskID);
	newTaskBox.classList.add('list__item');
	newTaskBoxLeft.classList.add('list__left');
	newTaskBoxMiddle.classList.add('list__middle');
	newTaskText.classList.add('list__task');
	newTaskBoxRight.classList.add('list__right');

	newTaskBoxMiddle.append(newTaskText);

	newTaskBoxLeft.innerHTML = `
	<div class="list__icon">${icons[iconIndex - 1]}</div>
	<p class="list__name">${category}</p>
	`;
	newTaskBoxRight.innerHTML = `
	<button class=" list__btn list__done"><i class="fa-solid fa-check"></i></button>
	<button class=" list__btn list__delete"><i class="fa-solid fa-trash"></i></button>
	`;

	saveTaskIcon.push(icons[iconIndex - 1]);
	tasksCategory.push(category);
	taskID++;
	taskBody.append(newTaskBox);
	newTaskBox.append(newTaskBoxLeft);
	newTaskBox.append(newTaskBoxMiddle);
	newTaskBox.append(newTaskBoxRight);
	countTasksAdd(category);
};
const openAddNewPopup = () => {
	addNewPopup.classList.add('add-new-popup--active');
	nav.style.display = 'none';
	// document.body.style.overflow = 'hidden';
	clearNewTask();
};
const closeAddNewPopup = () => {
	nav.style.display = 'block';
	addNewPopup.classList.remove('add-new-popup--active');
	// document.body.style.overflow = 'auto';
};
const openToDo = () => {
	nav.style.display = 'none';
	todoList.classList.add('list--active');
	mainSection.style.display = 'none';
};
const closeToDO = () => {
	nav.style.display = 'block';
	todoList.classList.remove('list--active');
	mainSection.style.display = 'block';
};

const newTaskcheckForm = () => {
	if (inputText.value !== '' && newTaskSelect.selectedIndex !== 0) {
		creatTask(
			inputText.value,
			newTaskSelect[newTaskSelect.selectedIndex].textContent,
			newTaskSelect.selectedIndex
		);
		alert('Added task, check in your folder');
		clearNewTask();
	} else {
		if (errorCounter === 3) {
			alert(
				`You have to choose category of your task (can't be "select category") and You have to wrtie something in textarea`
			);
			errorCounter = 0;
		} else {
			newTaskError.textContent = 'Add task fisrt';
		}
		errorCounter++;
	}
};

//menagment
todoBtn.addEventListener('click', openToDo);
todoListBack.addEventListener('click', closeToDO);
addNewTaskBtn.addEventListener('click', openAddNewPopup);
addNewPopupBack.addEventListener('click', closeAddNewPopup);
//new task
newTaskSaveBtn.addEventListener('click', newTaskcheckForm);
document.addEventListener('click', checkClick);
chooseSorting.addEventListener('change', sorting);
