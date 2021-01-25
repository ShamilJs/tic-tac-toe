'use strict';

// открытие/закрытие меню настроек игры
const openPopup = () => {
    const navBurger = document.querySelector('.nav_nav__burger');
    const popup = document.querySelector('.settings');

    navBurger.addEventListener('click', () => {
        navBurger.classList.toggle('close-act');
        popup.classList.toggle('open_popup');
	});
};
openPopup();

// -----------------------------------------------------алгоритм игры ---------------------------------------
const element = document.querySelectorAll('.tic-tac__item'),
	alert = document.querySelector('.alert > p'),
	alertDiv = document.querySelector('.alert'),
	btnUpdate = document.querySelector('.alert__btn'),
	tabMode = document.querySelectorAll('.tab__gamer'),
	tabMove = document.querySelectorAll('.tab__move'),
	tabBlock = document.querySelector('.tab');

// Настройки игры
const state = {
	state: true,
	content: '',
	exception: [],
	showWins: false,
	mode: false,
	move: false
};

// формирования контента для верстки
const checkTextContent = () => {
    if (state.state) state.content = '×';
    else state.content = '○';
};
checkTextContent();

// обновление игры
const updateGame = () => {
	state.exception = [];
	state.showWins = false;
	state.state = state.move ? false : true;
	checkTextContent();

	element.forEach(item => {
		item.textContent = '';
		if (item.matches('.tic-tac__active')) item.classList.remove('tic-tac__active');
		if (item.matches('.tic-tac-wins')) item.classList.remove('tic-tac-wins');
		alertDiv.style.display = 'none';
		alertDiv.style.visibility = 'hidden';
	});
};

// Изменение режима игры
const changeMode = () => {
	updateGame();
	state.mode = !state.mode;
	tabMode.forEach(item => item.classList.toggle('gamer-active'));
};

// Изменение первого хода (с ноликов или крестиков)
const changeMove = () => {
	state.move = !state.move;
	updateGame();
	tabMove.forEach(item => item.classList.toggle('move-active'));
};

// Показать сообщение о статусе окончания игры
const showAlert = (index = false, arr) => {
	let text = '';
	state.showWins = true;
	if (typeof index === 'number') {
		arr.forEach(item => item.classList.add('tic-tac-wins'));
		if (element[index].textContent === '×') text = 'Победили крестики !!!';
		else text = 'Победили нолики !!!';
	} else text = 'Победили дружба !!!';
	alert.textContent = text;
	alertDiv.style.display = 'flex';
	alertDiv.style.visibility = 'visible';
};

// Выбор победителя
const checkWinner = index => {
	let count = 0;
	let arr = [];
	let arr2 = [];
	element.forEach(item => arr2.push(item.textContent));
	if (arr2[0] === arr2[1] && arr2[0] === arr2[2] && arr2[0] !== '') arr = [element[0], element[1], element[2]];
	if (arr2[3] === arr2[4] && arr2[3] === arr2[5] && arr2[3] !== '') arr = [element[3], element[4], element[5]];
	if (arr2[6] === arr2[7] && arr2[6] === arr2[8] && arr2[6] !== '') arr = [element[6], element[7], element[8]];
	if (arr2[0] === arr2[3] && arr2[0] === arr2[6] && arr2[0] !== '') arr = [element[0], element[3], element[6]];
	if (arr2[1] === arr2[4] && arr2[1] === arr2[7] && arr2[1] !== '') arr = [element[1], element[4], element[7]];
	if (arr2[2] === arr2[5] && arr2[2] === arr2[8] && arr2[2] !== '') arr = [element[2], element[5], element[8]];
	if (arr2[0] === arr2[4] && arr2[0] === arr2[8] && arr2[0] !== '') arr = [element[0], element[4], element[8]];
	if (arr2[2] === arr2[4] && arr2[2] === arr2[6] && arr2[2] !== '') arr = [element[2], element[4], element[6]]; 

	element.forEach(item => {
		if (item.textContent === '') return;
		else count ++;
	});
	if (count === element.length) showAlert();

	if (!arr.length) return;
	else {
		element.forEach(item => item.classList.add('tic-tac__active'));
		showAlert(index, arr);
	}
};

// режим игры с компьютером
const computerGames = exp => {
	const min = 0,
		max = 8;
	while(true) {
		let random = Math.round(min - 0.5 + Math.random() * (max - min + 1));
		if (exp.indexOf(random) < 0) return random;
	}
};

// Сделать ход
const makeAMove = index => {
	element[index].textContent = state.content;
    state.state = !state.state;
	checkTextContent();
	element[index].classList.add('tic-tac__active');
	checkWinner(index);
	state.exception.push(index);
};

// Обработчики событий
element.forEach((item, i) => {
    item.addEventListener('click', () => {
		makeAMove(i);
		if (state.exception.length === element.length || state.showWins || !state.mode) return;
		else {
			const random = computerGames(state.exception);
			makeAMove(random);
		}
	});
});

btnUpdate.addEventListener('click', updateGame);

tabBlock.addEventListener('click', e => {
	if (e.target.matches('.tab__gamer')) changeMode();
	if (e.target.matches('.tab__move') || e.target.matches('.tab__move > p')) changeMove();
});


