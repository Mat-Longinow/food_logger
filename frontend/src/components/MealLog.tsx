import React from 'react';
import { FoodItem } from "./FoodLog";
import {foodItem} from "./types/types";

interface MealLogProps {
}

const meal: foodItem[] = [
	{
		name: 'item1',
		calories: 157,
		fat: 45,
		carbs: 45,
		protein: 45
	},
	{
		name: 'item2',
		calories: 356,
		fat: 47,
		carbs: 68,
		protein: 35
	}
]

const totalMealMetrics = {
	calories: 0,
	fat: 0,
	carbs: 0,
	protein: 0
}

const calculateTotalMealMetrics = () => {
	meal.forEach((foodItem) => {
		totalMealMetrics["calories"] = totalMealMetrics["calories"] + foodItem["calories"]
		totalMealMetrics["fat"] = totalMealMetrics["fat"] + foodItem["fat"]
		totalMealMetrics["carbs"] = totalMealMetrics["carbs"] + foodItem["carbs"]
		totalMealMetrics["protein"] = totalMealMetrics["protein"] + foodItem["protein"]
	})
}

calculateTotalMealMetrics()

const MealLog = () => {
	return (
		<div className="w-80">
			{meal.map((record, key) => <FoodItem key={key} record={record}/>)}
		</div>
	);
};

export {MealLog}