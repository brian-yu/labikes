import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import mbxDirections from '@mapbox/mapbox-sdk'
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import StationCoords from './data/stations.js';
import StationInfo from './data/stationInfo.js'

/*** User Stories ***/
// I want the stations to be colored by popularity
// I want to be able to click on a station to get more information on it
//		- Most traveled to station frmo here
//		- Most traveled frmo station to here
// 		- routes for the above 2?
//		- Number of trips to/from here
//		- long lat / geocoding?
//		- most common pass type
// I want to see general stats when I first load the page
// I want to see a heatmap of routes??

export default class Map extends Component {

	constructor(props) {
		super(props);
		this.state = {
    	map: null,
    	mapReady: false,
    }
    this.defaultCenter = [-118.24756238108466, 34.04734689922698];
    this.defaultZoom = 13;
	}

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW55dSIsImEiOiJjajVycTJ0cTMwemt0MzNwbGQxN3JvbWF5In0.YddKaK6iFrT0IG1JVU8mUQ';
		const map = new mapboxgl.Map({
			  container: 'map',
			  style: 'mapbox://styles/mapbox/streets-v9',
			  center: this.defaultCenter,
			  zoom: this.defaultZoom,
			});

		const directionsClient = mbxDirections({ accessToken: 'pk.eyJ1IjoiYnJpYW55dSIsImEiOiJjajVycTJ0cTMwemt0MzNwbGQxN3JvbWF5In0.YddKaK6iFrT0IG1JVU8mUQ'});

		// directionsClient
		//   .getDirections({
		//     waypoints: [
		//       {
		//         coordinates: [-118.25904799999999, 34.0485497]
		//       },
		//       {
		//         coordinates: [-118.26273300000001, 34.046611799999994]
		//       }
		//     ]
		//   })
		//   .send()
		//   .then(response => {
		//     const directions = response.body;
		//   });

		this.setState({map: map})

		console.log('pls')
		map.on('load', () => {
	    map.addSource("stations", {
          "type": "geojson",
          "data": {
				    "type":"FeatureCollection",
				    "features": StationCoords
				  }
      });

      console.log(map.getSource('stations'));

	    map.addLayer({
          'id': 'stations',
          'type': 'circle',
          'source': 'stations',
          'paint': {
              'circle-radius': 5,
              'circle-color': ["case",
                ["boolean", ["feature-state", "selected"], false],
                '#f00',
                '#3498db'
            	],
              'circle-stroke-color': '#ffffff',
              'circle-stroke-width': 2
          }
      });

	    this.setState({mapReady: true})

		});


		// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'stations', (e) => {

        if (e.features.length > 0) {
        		this.props.selectStation(e.features[0].id)
        }
    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'stations', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'stations', function () {
        map.getCanvas().style.cursor = '';
    });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.state.mapReady) {
			if (prevProps.selectedStation != null) {
				this.state.map.setFeatureState({source: 'stations', id: prevProps.selectedStation}, { selected: false});
			}
			if (this.props.selectedStation) {
				this.state.map.setFeatureState({source: 'stations', id: this.props.selectedStation}, { selected: true});
				this.state.map.flyTo({
    			center: StationInfo[this.props.selectedStation].coordinates,
    			speed: .7,
    			zoom: 15
    		});
			} else {
				this.state.map.flyTo({
    			center: this.defaultCenter,
    			speed: .8,
    			zoom: this.defaultZoom
    		});
			}
		}
	}

  render() {
    return (
    	<div id="map-container">
      	<div id="map"/>
      	<a type="button" className="home-btn btn btn-light" id="reset" onClick={() => this.props.selectStation(null)}>Home</a>
      </div>
    );
  }
}