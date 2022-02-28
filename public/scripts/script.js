$(document).ready(() => {
	console.log('%cDocument is ready!', 'color:green');

	// Click Function
	$('.tile').click((e) => {
		if ($(e.currentTarget).css('background').includes('rgb(241, 239, 100)')) {
			$(e.currentTarget).css('background', '#3c0058').css('color', '#fff');
			$(e.currentTarget).attr('data-checked', 'uncheck');
			checkForBingo();
		} else {
			$(e.currentTarget).css('background', '#f1ef64').css('color', '#272727');
			$(e.currentTarget).attr('data-checked', 'check');
			if (checkForBingo()) {
				$('.bingo-modal').css('display', 'flex');
				$('.bingo-announce').addClass('animate__animated animate__zoomInUp');
			}
		}
	});

	$('#checkBtn').click(() => {
		// $('.bingo-modal').addClass('animate__animated animate__zoomOutDown');
		$('.bingo-modal').css('display', 'none');
	});

	renderItems();
});

async function getItems() {
	let url = 'public/json/items.json';
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

async function renderItems() {
	let items = await getItems();
	// console.log(items);
	let order = [];

	while (order.length < 25) {
		let randomIndex = randomNumber(0, items.length);
		let item = items[randomIndex];
		order.push(item);
		items.splice(randomIndex, 1);
	}

	// console.table(order);

	for (let i = 0; i < order.length; i++) {
		if (i == 12) {
			$($('.tile-text')[i]).html('Free Space');
		} else $($('.tile-text')[i]).html(order[i].name);
	}
}

function checkForBingo() {
	const correctOrders = [
		// Rows
		[0, 1, 2, 3, 4],
		[5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19],
		[20, 21, 22, 23, 24],
		// Columns
		[0, 5, 10, 15, 20],
		[1, 6, 11, 16, 21],
		[2, 7, 12, 17, 22],
		[3, 8, 13, 18, 23],
		[4, 9, 14, 19, 24],
		// Diagonal
		[0, 6, 12, 18, 24],
		[4, 8, 12, 16, 20],
	];

	function compareOrder() {
		let compared = false;
		for (let i = 0; i < correctOrders.length; i++) {
			// CorrectOrders Loop
			let trueCounter = 0;
			for (let j = 0; j < correctOrders[i].length; j++) {
				// Specific Order Loop
				let comparedIndex = correctOrders[i][j];
				if (indexes.includes(comparedIndex)) trueCounter++;
			}
			if (trueCounter == correctOrders[i].length) compared = true;
		}
		return compared;
	}

	let checked = Array.from($('[data-checked="check"]'));
	let indexes = [];
	checked.forEach((element) => {
		index = $(element).index();
		if (!indexes.includes(index)) indexes.push(index);
	});
	indexes.sort((a, b) => a - b);
	console.log(indexes);
	console.log(`Compared Order: ${compareOrder()}`);

	return compareOrder();
}

/**
 * @param {number} min minimum value
 * @param {number} max maximum values
 * @returns {number} Random Number between min and max (non-inclusive)
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
