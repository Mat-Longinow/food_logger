const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  name: String,
  records: [
    {
    	dates: {
        	beginning: Date,
          	end: Date
        },
      	records: [
          {
          	date: Date,
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
                	  calories: Number,
                  	fat: Number,
                  	carbs: Number,
                  	protein: Number
                  }
                ]
              }
            ]
          }
        ]
    }
  ]
});

module.exports = mongoose.model('Member', memberSchema);