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

const getTime = () => {
	const time = new Date();
	const hour = time.getHours();
	const minute = time.getMinutes();
	const seconds = time.getSeconds();

	return `[${hour}:${minute}:${seconds}]`;
};

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

	Member.find({name: 'Mat Longinow'}, (err, findRes) => {
		if(err) {
			console.log(`${getTime()} getWeekInfo err -->`, err);
		}

		console.log(`${getTime()} getWeekInfo Res --> `, findRes)
		console.log(`${getTime()} incomingWeek --> `, incomingWeek)

		const weekData = findRes[0].weekRecords.filter((week) => week.week = incomingWeek)

		initialRes.send({weekData: weekData, allData: findRes});
	});
})

index.put('/addMealItem', async (req, initialRes) => {
	const {
		weekId,
		dayId,
		mealTime,
		foodItems
	} = req.body;

	const newFoodItem = {
		dayId: dayId,
		mealTime: mealTime,
		foodItems: foodItems
	};

	await Member.find({name: 'Mat Longinow'}, (err, findRes) => {
		if (err) {
			console.log(`${getTime()} getWeekInfo err -->`, err);
		}

		const weekData = findRes[0].weekRecords.filter((week) => week._id = weekId)

		const dayData = weekData[0].dayRecords.filter((day) => day._id = dayId)

		const mealData = dayData[0].meals.filter((meal) => meal.time = mealTime)

		if(mealData.length > 0) {
			initialRes.send("Sorry, that meal time is already being used!")
		} else {

			dayData.


			findRes.save().then(() => {
				initialRes.send("Saved the meal!!!")
			})
		}

		initialRes.send(dayData)

	})
});

index.post('/getWeekDates', (req, initialRes) =>  {

	//     ----- req -----
	//{
	//  name: 'Mat Longinow',
	//}

	Member.find({}, (err, findRes) => {
		if(err) {
			console.log(`${getTime()} getWeekDates err -->`, err);
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