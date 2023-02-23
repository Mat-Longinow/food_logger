const express = require('express');
const index = express();
const port = 5010;
const cors = require('cors');
const bodyParser = require('body-parser');
const { add, format } = require( "date-fns");

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
	//

	const { name, week: incomingWeek } = req.body

	Member.find({name: 'Mat Longinow'}, (err, findRes) => {
		if(err) {
			console.log(`${getTime()} getWeekInfo err -->`, err);
		}

		const weekData = findRes[0].weekRecords.filter((week) => week.week = incomingWeek)

		initialRes.send({weekData: weekData, allData: findRes});
	});
})

index.put('/addMealItem', async (req, initialRes) => {
	const {
		weekId,
		dayId,
		mealTime,
		newFoodItem
	} = req.body;

	const foundMember = await Member.where("name").equals("Mat Longinow")

	const weekData = foundMember[0].weekRecords.filter((week) => week._id == weekId)

	const dayData = weekData[0].dayRecords.filter((day) => day._id == dayId)

	const mealData = dayData[0].meals.filter((meal) => meal.time == mealTime)

	if(mealData.length > 0) {
		console.log(`${getTime()}: Looks like that meal is already being used!`)

		mealData[0].foodItems.push(newFoodItem)

		foundMember[0].save().then(() => {
			initialRes.send(mealData[0])
		})
	} else {
		dayData[0].meals.push({
			totalMealMetrics: {
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			},
			time: mealTime,
			foodItems: [
				newFoodItem
			]
		})

		foundMember[0].save().then(() => {
			initialRes.send(mealData[0])
		})
	}
});

index.put('/addNewWeek', async (req, initialRes) => {
	const {
		startingDate
	} = req.body;

	const foundMember = await Member.where("name").equals("Mat Longinow")

	const formatDate = (date) => format(new Date(date), 'MM/dd/yy')

	const addToDate = (date, daysToAdd) => {
		let newDate = add(new Date(date), {days: daysToAdd})

		return formatDate(newDate)
	}

	const newWeekDates = [
		formatDate(startingDate),
		addToDate(startingDate, 1),
		addToDate(startingDate, 2),
		addToDate(startingDate, 3),
		addToDate(startingDate, 4),
		addToDate(startingDate, 5),
		addToDate(startingDate, 6)
	]

	const newWeek = {
		week: {
			beginning: newWeekDates[0],
			end: newWeekDates[6]
		},
		dayRecords: [
			{
				date: newWeekDates[0],
				meals: []
			},
			{
				date: newWeekDates[1],
				meals: []
			},
			{
				date: newWeekDates[1],
				meals: []
			},
			{
				date: newWeekDates[2],
				meals: []
			},
			{
				date: newWeekDates[3],
				meals: []
			},
			{
				date: newWeekDates[4],
				meals: []
			},
			{
				date: newWeekDates[5],
				meals: []
			}
		]
	}

	const weekThatIsAlreadyThere = foundMember[0].weekRecords.filter((week) => formatDate(week.week.beginning) == formatDate(startingDate))

	if(weekThatIsAlreadyThere) {
		console.log(`${getTime()}: Week already exists! adding days...`)

		const howManyDaysToAdd = 7 - weekThatIsAlreadyThere[0].dayRecords.length
		const howManyDaysToSkip = 7 - howManyDaysToAdd

		for(let i = 0; i < howManyDaysToAdd; i++) {
			weekThatIsAlreadyThere[0].dayRecords.push(
				{
					date: addToDate(startingDate, howManyDaysToSkip + i),
					meals: []
				}
			)
		}

		foundMember[0].save().then(() => {
			initialRes.send(foundMember[0])
		})
	}

	foundMember[0].push(newWeek)

	foundMember[0].save().then(() => {
		initialRes.send(foundMember[0])
	})
});

index.post('/getWeekDates', (req, initialRes) =>  {

	//     ----- req -----
	//{
	//  name: 'Mat Longinow',
	//}

	Member.find({}, (err, findRes) => {
		if(err) {
			console.log(`${getTime()}: getWeekDates err -->`, err);
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