import React from 'react';

interface FoodItemProps {
	record: any
}

const FoodItem = ({record}: FoodItemProps) => {

	const {
		name,
		calories,
		fat,
		carbs,
		protein
	} = record

	console.log('this is what is comin in to the FoodItem -->', record)

	return (
		<div className="bg-white mt-3 rounded-lg p-3">
			<div className="meal-title">
				<h3 className="font-bold pb-2">{name}</h3>
			</div>

			<div className="meal-metrics text-sm text-gray-400 flex justify-between">
				<p className="pr-12">{calories} Cal</p>

				<p>{fat} F</p>

				<p>{carbs} C</p>

				<p>{protein} P</p>
			</div>
		</div>
	);
};

export { FoodItem }