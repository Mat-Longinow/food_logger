import { MealLog } from "./MealLog";
import React, {useEffect, useMemo, useState} from "react";
import {foodItem} from "./types/types";

interface TimelineProps {
	day: any
	className: any
	dayData: any
}

const getTime = () => {
	const time = new Date();
	const hour = time.getHours();
	const minute = time.getMinutes();
	const seconds = time.getSeconds();
	const milliseconds = time.getMilliseconds()

	return `[${hour}:${minute}:${seconds}:${milliseconds}]`;
};

const generateTimeLineItems: any = (record: any) => {
	const timelineItemsArray = []

	for(let i = 0; i < 17; i++) {
		let hour = i + 7 // 7AM start time
		let amPM = "AM"

		if(hour > 12) {
			hour = hour - 12
			amPM = "PM"
		}

		let time = `${hour} ${amPM}`

		if (time === '12 AM') {
			time = '12 PM'
		}

		const getTimeSpecificMealRecord = (record: any) => {
			const timeSpecificMeal = record[0].meals.filter((meal: any) => meal.time === time)
			if(timeSpecificMeal.length > 0) {
				return timeSpecificMeal
			}else{
				return ""
			}
		}

		timelineItemsArray.push({
			time: time,
			record: record.length > 0 ? getTimeSpecificMealRecord(record) : ""
		})
	}

	return timelineItemsArray
}

const Timeline = ({ day, className, dayData }: TimelineProps) => {
	const [timelineItems, setTimelineItems] = useState<any>([])
	const [totalDayMetrics, setTotalDayMetrics] = useState({
		calories: 0,
		fat: 0,
		carbs: 0,
		protein: 0,
		sodium: 0
	})
	const [allMealMetrics, setAllMealMetrics] = useState([])
	const [mealMetricsIsDone, setMealMetricsIsDone] = useState(false)
	const totalDayMetricsStyling = 'text-black text-xl'
	const [doneWithCalc, setDoneWithCalc] = useState(false)

	const pushToAllMealMetrics = async (totalMealMetric: any) => {
		if(allMealMetrics.filter((meal: any) => meal.time === totalMealMetric.time).length === 0 && totalMealMetric.time) {
			console.log(`${dayData[0].date} ${getTime()}: pushToAllMealMetrics inside filter --> `, totalMealMetric)
			const setToAllMealMetrics = async () => {
				const newAllMealMetrics: any = allMealMetrics

				newAllMealMetrics.push(totalMealMetric)

				await setAllMealMetrics(newAllMealMetrics)
			}

			await setToAllMealMetrics()

			console.log(`${dayData[0].date} ${getTime()}: after the pushToAllMealMetrics is done --> `, {
				allMealMetrics: allMealMetrics,
				todaysRecords: dayData[0]
			})

			if(allMealMetrics.length === dayData[0]?.meals.length) {
				setMealMetricsIsDone(true)
			}
		}
	}

	const calculateTotalDayMetrics = async () => {
		const dayMetrics = totalDayMetrics

		await allMealMetrics.forEach((meal) => {
			dayMetrics["calories"] = dayMetrics["calories"] + meal["calories"]
			dayMetrics["fat"] = dayMetrics["fat"] + meal["fat"]
			dayMetrics["carbs"] = dayMetrics["carbs"] + meal["carbs"]
			dayMetrics["protein"] = dayMetrics["protein"] + meal["protein"]
			dayMetrics["sodium"] = dayMetrics["sodium"] + meal["sodium"]
		})

		setTotalDayMetrics(dayMetrics)
		setDoneWithCalc(true)
	}

	useEffect(() => {
		setTimelineItems(generateTimeLineItems(dayData))

		if(dayData[0]?.date === '02/17/23') {
			console.log(`${dayData[0]?.date} ${getTime()}: inside the useEffect --> `, {
				allMealMetrics: allMealMetrics,
				dayData: dayData,
				doneWithCalc: doneWithCalc,
				mealMetricsIsDone: mealMetricsIsDone
			})
		}

		if(dayData[0] && allMealMetrics.length === dayData[0]?.meals.length && !doneWithCalc) {
			console.log(`${dayData[0].date} ${getTime()}: running the calc now 👍🏻`)
			// setTimeout(() => calculateTotalDayMetrics(), 15)
			calculateTotalDayMetrics()
		}

	}, [dayData, allMealMetrics, mealMetricsIsDone])

	return (
		<div className={`flex flex-nowrap pl-24 basis-1/7 bg-mild-gray ` + className}>
			<ol className="relative border-l border-gray-200 dark:border-gray-200 pt-12 mr-5">
				<h1 className="text-4xl rounded-full pt-1 pb-1 pr-3 pl-3 text-center ml-[75px] mb-9 font-bold text-gray-600">
					{ day.day }
				</h1>

				{totalDayMetrics.calories > 0 && (
					<div className="text-xs text-gray-400 flex justify-between bg-white mb-16 ml-12 -mr-6 rounded-lg p-3 right-3">
						<p className="pr-12"><span className={totalDayMetricsStyling}>{totalDayMetrics.calories}</span> Calories</p>

						<p><span className={totalDayMetricsStyling}>{totalDayMetrics.fat}</span> Fat</p>

						<p><span className={totalDayMetricsStyling}>{totalDayMetrics.carbs}</span> Carbs</p>

						<p><span className={totalDayMetricsStyling}>{totalDayMetrics.protein}</span> Protein</p>

						<p><span className={totalDayMetricsStyling}>{totalDayMetrics.sodium}</span> Sodium</p>
					</div>
				)}


				{timelineItems.map(({ time, record }: {time: any, record: any}, key: any) => (
					<li key={key} className="mb-10 ml-6 ml-20 min-h-[25px]">
						<span
							className="absolute flex items-center justify-center h-6 rounded-full p-3 -left-8 bg-gray-200 ">
								{time}
						</span>

						{record ? (
							<MealLog
								allMealMetrics={allMealMetrics}
								setAllMealMetrics={setAllMealMetrics}
								record={record}
								pushToAllMealMetrics={pushToAllMealMetrics}
							/>
						): (
							<div> </div>
						)}
					</li>
				))}
			</ol>
		</div>
	)
}

export default Timeline
