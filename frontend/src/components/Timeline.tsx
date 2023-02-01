import { MealLog } from "./MealLog";
import {useEffect, useMemo, useState} from "react";

interface TimelineProps {
	day: string
	className: any
}



const generateTimeLineItems = () => {
	const timelineItemsArray = []

	for(let i = 0; i < 17; i++) {
		let hour = i + 7 // 7AM start time
		let amPM = "AM"

		if(hour > 12) {
			hour = hour - 12
			amPM = "PM"
		}

		const time = `${hour} ${amPM}`

		timelineItemsArray.push({
			time: time,
			record: ""
		})
	}

	return timelineItemsArray
}

const Timeline = ({ day, className }: TimelineProps) => {
	const timelineItems = useMemo(generateTimeLineItems, [])

	console.log('rendering!')

	return (
		<div className={`flex flex-nowrap pl-24 basis-1/7 bg-mild-gray ` + className}>
			<ol className="relative border-l border-gray-200 dark:border-gray-200 pt-12 mr-5">
				<h1 className="text-4xl rounded-full pt-1 pb-1 pr-3 pl-3 text-center ml-[75px] mb-20 font-bold text-gray-600">
					{ day }
				</h1>

				{timelineItems.map(({ time, record }, key: any) => (
					<li key={key} className="mb-10 ml-6 ml-20 min-h-[25px]">
						<span
							className="absolute flex items-center justify-center h-6 rounded-full p-3 -left-8 bg-gray-200 ">
								{time}
						</span>

						{record ? (
							<MealLog />
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
