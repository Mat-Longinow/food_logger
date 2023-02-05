const express = require('express');
const index = express();
const port = 5010;
const cors = require('cors');
const bodyParser = require('body-parser');

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false }));

const Member = require('./models/member');

const mongoose = require('mongoose');
mongoose.connect(
	'mongodb+srv://matl:4SkBvpiOMaVkyx7R@cluster0.dwym2z7.mongodb.net/foodLogger?retryWrites=true&w=majority',
	{ useUnifiedTopology: true, useNewUrlParser: true }
);

index.use(cors());


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
	console.log('looks like we are kissing the golden (mon)goose!');
});

index.get('/', (req, res) => {
	res.send('Hello World!')
})

index.post('/getWeekInfo', (req, initialRes) =>  {
	//     ----- req -----
	//{
	//  name: 'Mat',
	//  week: {
	//  	beginning: ''
	//		end: ''
	//	},
	//  day: ''
	//

	const { name, week: incomingWeek } = req.body

	Member.find({name: name}, (err, findRes) => {
		if(err) {
			console.log('getWeekInfo err -->', err);
		}

		initialRes.send(findRes);
	});
})

index.post('/getWeekDates', (req, initialRes) =>  {

	//     ----- req -----
	//{
	//  name: 'Mat Longinow',
	//}

	Member.find({}, (err, findRes) => {
		if(err) {
			console.log('getWeekDates err -->', err);
		}

		const weekDates = []

		findRes[0].weekRecords.forEach((week) => {
			weekDates.push(week.week)
		})

		initialRes.send(weekDates);
	});
})

index.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})