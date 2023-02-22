const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  name: String,
  weekRecords: [
    {
    	week: {
        	beginning: String,
          	end: String
        },
      	dayRecords: [
          {
          	date: String,
            meals: [
              {
              	time: String,
                totalMealMetrics: {
                    calories: Number,
                    fat: Number,
                    carbs: Number,
                    protein: Number
                },
                foodItems: [
                  {
                    name: String,
                    icon: String,
                    amount: String,
                    calories: Number,
                    fat: Number,
                    carbs: Number,
                    protein: Number,
                    sodium: Number
                  }
                ]
              }
            ]
          }
        ]
    }
  ]
});

// this tells which collection within your database to be looking in
module.exports = mongoose.model('Model', memberSchema, 'foodLoggerCollection');