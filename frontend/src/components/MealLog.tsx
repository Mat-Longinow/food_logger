import React, { useEffect, useState } from 'react'
import { FoodItem } from "./FoodItem"
import { foodItem } from "./types/types"

interface MealLogProps {
	record: any,
	allMealMetrics: any,
	setAllMealMetrics: any,
	pushToAllMealMetrics: any
}

const MealLog = ({ record: meals, allMealMetrics, setAllMealMetrics, pushToAllMealMetrics }: MealLogProps) => {
	const [totalMealMetrics, setTotalMealMetrics] = useState({
		time: "",
		calories: 0,
		fat: 0,
		carbs: 0,
		protein: 0,
		sodium: 0
	})

	const calculateTotalMealMetrics = async (meal: foodItem[]) => {
		const mealMetrics = {
			time: meals[0].time,
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
			sodium: 0
		}

		await meal.forEach((foodItem: any) => {
			mealMetrics["calories"] = mealMetrics["calories"] + foodItem["calories"]
			mealMetrics["fat"] = mealMetrics["fat"] + foodItem["fat"]
			mealMetrics["carbs"] = mealMetrics["carbs"] + foodItem["carbs"]
			mealMetrics["protein"] = mealMetrics["protein"] + foodItem["protein"]
			mealMetrics["sodium"] = mealMetrics["sodium"] + foodItem["sodium"]
		})

		setTotalMealMetrics(mealMetrics)

		pushToAllMealMetrics(totalMealMetrics)
	}

	useEffect(() => {
		if(meals[0].foodItems) {
			calculateTotalMealMetrics(meals[0].foodItems)
		}
	}, [meals])

	const totalMealMetricCSS = 'rounded-full pl-2 pr-2 pt-1 pb-1 bg-gray-200'

	return (
		<div className="w-80">
			<div className="text-gray-500 flex justify-between pl-1 pr-1 text-gray-600 text-sm">
				<p>{totalMealMetrics.calories} <span className={totalMealMetricCSS}>Cal</span></p>

				<p>{totalMealMetrics.fat} <span className={totalMealMetricCSS}>F</span></p>

				<p>{totalMealMetrics.carbs} <span className={totalMealMetricCSS}>C</span></p>

				<p>{totalMealMetrics.protein} <span className={totalMealMetricCSS}>P</span></p>

				<p>{totalMealMetrics.sodium} <span className={totalMealMetricCSS}>S</span></p>
			</div>

			{meals[0].foodItems.map((record: any, key: any) => <FoodItem key={key} record={record}/>)}
		</div>
	);
};

export {MealLog}