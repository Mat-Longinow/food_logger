import React from 'react';

interface FoodItemProps {
	record: any
}

const FoodItem = ({record}: FoodItemProps) => {

	const {
		name,
		amount,
		calories,
		fat,
		carbs,
		protein,
		sodium
	} = record

	return (
		<div className="bg-white mt-3 rounded-lg p-3">
			<div className="meal-title">
				<h3 className="font-bold pb-2">{name} <span className="text-sm text-gray-400 font-light pl-1">({amount})</span></h3>
			</div>

			<div className="meal-metrics text-sm text-gray-400 flex justify-between">
				<p className="pr-12">{calories} Cal</p>

				<p>{fat} F</p>

				<p>{carbs} C</p>

				<p>{protein} P</p>

				<p>{sodium} S</p>
			</div>
		</div>
	);
};

export { FoodItem }