const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server is running at http://localhost:3000`);
});
