const hours = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const months = ['2016-07','2016-08','2016-09','2016-10','2016-11','2016-12','2017-01','2017-02','2017-03'];

const tripHourData = {
	labels: hours,
	datasets: [
		{
			label: "Trips",
			backgroundColor: "rgba(54,162,235,0.5)",
			borderColor: "rgba(220,220,220,0.8)",
			hoverBackgroundColor: "rgba(54,162,235,0.75)",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [1783, 1346, 870, 446, 419, 562, 1742, 4751, 6920, 6283, 5410, 7648, 10034, 9769, 8494, 8331, 9998, 11740, 10450, 7946, 5995, 4882, 3834, 2774]
		}
	]
}
const tripHourOptions = {
	scales: {
		xAxes: [{
	      scaleLabel: {
	        display: true,
	        labelString: 'Hour of day'
	      }
	    }],
	    yAxes: [{
	      scaleLabel: {
	        display: true,
	        labelString: 'Total number of trips'
	      }
	    }]
	},
	title: {
    	display: true,
    	text: 'Trips vs. time of day'
    }
}

const tripMonthData = {
	labels: months,
	datasets: [
		{
			label: "Trips",
			backgroundColor: "rgba(255,99,132,0.5)",
			borderColor: "rgba(151,187,205,0.8)",
			hoverBackgroundColor: "rgba(255,99,132,0.75)",
			hoverBorderColor: "rgba(151,187,205,1)",
			data: [11420, 24153, 19866, 18159, 14430, 10613, 10347, 9533, 13906]
		}
	]
}
const tripMonthOptions = {
	scales: {
		xAxes: [{
	      scaleLabel: {
	        display: true,
	        labelString: 'Month'
	      }
	    }],
	    yAxes: [{
	      scaleLabel: {
	        display: true,
	        labelString: 'Number of trips'
	      }
	    }]
	},
	title: {
    	display: true,
    	text: 'Number of trips vs. month'
    }
}

const tripDurationData = {
	labels: months,
	datasets: [
		{
			label: "Duration",
			backgroundColor: "rgba(46, 204, 113, 0.5)",
			borderColor: "rgba(151,187,205,0.8)",
			hoverBackgroundColor: "rgba(46, 204, 113, 0.75)",
			hoverBorderColor: "rgba(151,187,205,1)",
			data: [18.466637478108581, 26.860514221835796, 23.550387596899224, 26.094388457514182, 24.388288288288287, 25.317535098464148, 29.600560548951385, 30.114444560998638, 30.016180066158491]
		}
	]
}
const tripDurationOptions = {
	scales: {
		xAxes: [{
	      scaleLabel: {
	        display: true,
	        labelString: 'Month'
	      }
	    }],
	    yAxes: [{
	      scaleLabel: {
	        display: true,
	        labelString: 'Average trip duration'
	      }
	    }]
	},
	title: {
    	display: true,
    	text: 'Trip duration vs. month'
    }
}

export { tripHourData, tripHourOptions, tripMonthData, tripMonthOptions, tripDurationData, tripDurationOptions };