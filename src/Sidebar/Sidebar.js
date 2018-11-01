import React, { Component } from 'react';
import './Sidebar.css';
import passesvsmonth from './passesvsmonth.png';
import StationInfo from '../Map/data/stationInfo.js';
import { tripHourData, tripHourOptions, tripMonthData, tripMonthOptions, tripDurationData, tripDurationOptions } from './graphs.js';
import {Bar} from 'react-chartjs-2';


export default class Sidebar extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.hours = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
		this.months = ['2016-07','2016-08','2016-09','2016-10','2016-11','2016-12','2017-01','2017-02','2017-03'];
    }

    stationLink = (props) => {
    	return <a href="#" onClick={() => this.props.selectStation(props.id)}>{StationInfo[props.id].name}</a>
    }

    defaultInfo = () => {

    	return (
    		<div>
				<h1>Los Angeles Bikeshare Data</h1>
				<p>66 stations. 9 months. 132,427 rides. 1 website.</p>
				<h4>Click on any station to learn more about it.</h4>

				<h2>At a glance</h2>
				<h4>Quick Facts</h4>
					<ul>
						<li>
							<p>This dataset covers bikeshare trip data between <strong>July 7, 2016</strong> and <strong>March 31, 2017</strong>.</p>
						</li>
						<li>
							<p>
							The most popular starting station during this period was <this.stationLink id={3069}/>.
							The most popular destination was <this.stationLink id={3005}/>.
							</p>
						</li>
						<li>
							<p>The average distance traveled was 4.14 miles.</p>
						</li>
						<li>
							<p>On average, there were 495 bike trips per day.</p>
						</li>
					</ul>
				<h4>Graphs & Analysis</h4>
				<Bar data={tripHourData} options={tripHourOptions}/>
				<Bar data={tripMonthData} options={tripMonthOptions}/>
				<Bar data={tripDurationData} options={tripDurationOptions}/>
				<img src={passesvsmonth} alt='graph'/>
			</div>
    	)
    }

    stationInfo = (id) => {
    	const info = StationInfo[this.props.selectedStation];
    	const data = {
			labels: this.hours,
			datasets: [
				{
					label: "Leaving",
					backgroundColor: "rgba(54,162,235,0.5)",
					borderColor: "rgba(220,220,220,0.8)",
					hoverBackgroundColor: "rgba(54,162,235,0.75)",
					hoverBorderColor: "rgba(220,220,220,1)",
					data: info.data.trips_leaving
				},
				{
					label: "Arriving",
					backgroundColor: "rgba(255,99,132,0.5)",
					borderColor: "rgba(151,187,205,0.8)",
					hoverBackgroundColor: "rgba(255,99,132,0.75)",
					hoverBorderColor: "rgba(151,187,205,1)",
					data: info.data.trips_arriving
				}
			]
		};
		const options = {
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

		return (
    		<div>
    			<h1>{info.name}</h1>
    			<p>{info.coordinates[1].toFixed(4)}°N, {Math.abs(info.coordinates[0]).toFixed(4)}°W</p>
    			<p>Open since {info['open_since']}</p>
    			<Bar data={data} options={options}/>
    			<ul>
    				<li>The most popular <strong>destination</strong> from here was <this.stationLink id={info.data.biggest_dest}/>.</li>
    				<li>The most popular <strong>source</strong> station to here was <this.stationLink id={info.data.biggest_source}/>.</li>
    				<li>A total of <strong>{info.data.trip_count}</strong> trips ended or started here</li>
    				<li>An average of <strong>{info.data.trip_avg.toFixed(2)}</strong> trips ended or started here per day</li>
    				<li>On average, trips starting or ending here were <strong>{info.data.distance_avg.toFixed(2)}</strong> miles</li>
    			</ul>
    		</div>
    	)
    }

    render() {

    	return (
    		<div id="sidebar">
    			{this.props.selectedStation ? <this.stationInfo/> : <this.defaultInfo/>}
    		</div>
    	)
    }

}