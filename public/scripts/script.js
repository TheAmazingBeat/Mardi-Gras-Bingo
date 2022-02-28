// const items;

$(document).ready(() => {
	console.log('%cDocument is ready!', 'color:green');
});

$('button.tile').click((e) => {
   console.log(e.currentTarget);
	$(e.currentTarget).css('background-color', 'yellow');
});
