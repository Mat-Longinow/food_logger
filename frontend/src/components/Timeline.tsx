import { MealLog } from "./MealLog";
import {useEffect, useMemo, useState} from "react";

interface TimelineProps {
	day: any
	className: any
	weekData: any
}

const generateTimeLineItems: any = (record: any) => {
	const timelineItemsArray = []

	for(let i = 0; i < 17; i++) {
		let hour = i + 7 // 7AM start time
		let amPM = "AM"

		if(hour > 12) {
			hour = hour - 12
			amPM = "PM"
		}

		const time = `${hour} ${amPM}`

		console.log('generateTimelineItems record --> ', {record: record, time: time})

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
			// record: timeLineItemRecord.length > 1 ? record : {}
			record: record.length > 0 ? getTimeSpecificMealRecord(record) : ""
		})
	}

	return timelineItemsArray
}

const Timeline = ({ day, className, weekData }: TimelineProps) => {
	console.log('timeline props --> ', {
		day: day,
		className: className,
		weekData: weekData
	})

	const [timelineItems, setTimelineItems] = useState<any>([])

	const getTodaysRecords = () => {
		if(weekData.length > 0) {
			return weekData[0].dayRecords.filter((dayData: any) => {
				console.log('inside the filter loop -->', {
					dayData: dayData,
					dayDataDate: dayData.date,
					dayDate: day.date,
					isEqual: dayData.date === day.date
				})
				return dayData.date === day.date
			})
		}
	}

	useEffect(() => {
		console.log('weekData has changed 💪🏻')
		setTimelineItems(generateTimeLineItems(getTodaysRecords()))
	}, [weekData])

	if(weekData.length < 1){
		return <div className="bg-mild-gray h-full w-full"> </div>
	}


	return (
		<div className={`flex flex-nowrap pl-24 basis-1/7 bg-mild-gray ` + className}>
			<ol className="relative border-l border-gray-200 dark:border-gray-200 pt-12 mr-5">
				<h1 className="text-4xl rounded-full pt-1 pb-1 pr-3 pl-3 text-center ml-[75px] mb-20 font-bold text-gray-600">
					{ day.day }
				</h1>

				{timelineItems.map(({ time, record }: {time: any, record: any}, key: any) => (
					<li key={key} className="mb-10 ml-6 ml-20 min-h-[25px]">
						<span
							className="absolute flex items-center justify-center h-6 rounded-full p-3 -left-8 bg-gray-200 ">
								{time}
						</span>

						{record ? (
							<MealLog record={record}/>
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
