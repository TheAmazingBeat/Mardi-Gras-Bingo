$(document).ready(() => {
	console.log('%cDocument is ready!', 'color:green');

	// Click Function
	$('.tile').click((e) => {
		if ($(e.currentTarget).css('background').includes('rgb(241, 239, 100)'))
			$(e.currentTarget).css('background', '#3c0058');
		else $(e.currentTarget).css('background', '#f1ef64');
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

	console.table(order);
	for (let i = 0; i < order.length; i++) {
		if (i == 12) {
			$($('.tile-text')[i]).html('Free Space');
		} else $($('.tile-text')[i]).html(order[i].name);
	}
}

/**
 * @param {number} min minimum value
 * @param {number} max maximum values
 * @returns {number} Random Number between min and max (non-inclusive)
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
