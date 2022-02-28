// const items;

$(document).ready(() => {
	console.log('%cDocument is ready!', 'color:green');
	$('.tile').click((e) => {
		if ($(e.currentTarget).css('background').includes('rgb(241, 239, 100)'))
			$(e.currentTarget).css('background', '#3c0058');
		else $(e.currentTarget).css('background', '#f1ef64');
	});
});
