import React, { Component } from 'react';
import './App.css';
import Forecast from "./containers/Forecast/Forecast";
import HourlyForecast from "./containers/HourlyForecast/HourlyForecast";
import {BrowserRouter, Route} from "react-router-dom";

class App extends Component {


	render() {
		
		return (
			<BrowserRouter>
				<div className="App">
					<Route path = "/"  exact component = {Forecast} />
					<Route path = "/:day" component = {HourlyForecast} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
