'use strict';

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
const element = document.querySelectorAll('.tic-tac__item');
const alert = document.querySelector('.alert > p');
const alertDiv = document.querySelector('.alert');
const btnUpdate = document.querySelector('.alert__btn');
let state = true;
let content = '';

const updateGame = () => {
	element.forEach(item => {
		item.textContent = '';
		if (item.matches('.tic-tac__active')) item.classList.remove('tic-tac__active');
		if (item.matches('.tic-tac-wins')) item.classList.remove('tic-tac-wins');
		alertDiv.style.display = 'none';
		alertDiv.style.visibility = 'hidden';
	});
}

const checkTextContent = () => {
    if (state) content = '×';
    else content = '○';
}
checkTextContent();

const showAlert = (index = false, arr) => {
	let text = ''
	if (typeof index === 'number') {
		arr.forEach(item => item.classList.add('tic-tac-wins'));
		if (element[index].textContent === '×') text = 'Победили крестики !!!';
		else text = 'Победили нолики !!!';
		
	} else text = 'Победили дружба !!!';
	
	alert.textContent = text;
	alertDiv.style.display = 'flex';
	alertDiv.style.visibility = 'visible';
}

const checkWinner = (index) => {
	let count = 0;
	let arr = []
	if (element[0].textContent === element[1].textContent && element[0].textContent === element[2].textContent) arr = [element[0], element[1], element[2]];
	else if (element[3].textContent === element[4].textContent && element[3].textContent === element[5].textContent) arr = [element[3], element[4], element[5]];
	else if	(element[6].textContent === element[7].textContent && element[6].textContent === element[8].textContent) arr = [element[6], element[7], element[8]];
	else if	(element[0].textContent === element[3].textContent && element[0].textContent === element[6].textContent) arr = [element[0], element[3], element[6]];
	else if	(element[1].textContent === element[4].textContent && element[1].textContent === element[7].textContent) arr = [element[1], element[4], element[7]];
	else if	(element[2].textContent === element[5].textContent && element[2].textContent === element[8].textContent) arr = [element[2], element[5], element[8]];
	else if	(element[0].textContent === element[4].textContent && element[0].textContent === element[8].textContent) arr = [element[0], element[4], element[8]];
	else if	(element[2].textContent === element[4].textContent && element[2].textContent === element[6].textContent) arr = [element[2], element[4], element[6]]; 

	element.forEach(item => {
		if (item.textContent === '') return
		else count ++;
	})
	if (count === element.length) showAlert();
	if (!arr.length || arr[0].textContent === '') return
	else {
		element.forEach(item => item.classList.add('tic-tac__active'))
		showAlert(index, arr)
	}
};


element.forEach((item, i) => {
    item.addEventListener('click', () => {
        item.textContent = content;
        state = !state;
		checkTextContent();
		item.classList.add('tic-tac__active');
		checkWinner(i)
    });
});

btnUpdate.addEventListener('click', () => updateGame());


