import React from 'react';

interface FoodItemProps {
	record: any
}

const FoodItem = ({record}: FoodItemProps) => {
	const {
		name,
		icon,
		amount,
		calories,
		fat,
		carbs,
		protein,
		sodium
	} = record

	const getIconPath = (name: string) => {
		return `icons/${name}.png`
	}

	return (
		<div className="bg-white mt-3 rounded-lg p-3 flex">
			<div className="mr-2">
				<img className="h-10 w-10 mt-1" src={getIconPath(icon)} />
			</div>

			<div className="">
				<div className="meal-title">
					<h3 className="font-bold pb-2">{name} <span className="text-sm text-gray-400 font-light pl-1">({amount})</span></h3>
				</div>

				<div className="meal-metrics text-sm text-gray-400 flex justify-between">
					<p className="pr-8">{calories} Cal</p>

					<div className="flex justify-between w-40">
						<p>{fat} F</p>

						<p>{carbs} C</p>

						<p>{protein} P</p>

						<p>{sodium} S</p>
					</div>

				</div>
			</div>

		</div>
	);
};

export { FoodItem }