import React from 'react'
import { Component } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'


import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import _ from 'lodash'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

class FiveDays extends React.Component {
  constructor() {
    super()
    this.state = {
      searchedCountry: {
        main: {},
        sys: {},
        list: [],
        city: {}
      },
      searchTerm: '', 
      country: [], 
      graphData: [],
      main: {}
    }

  }

  componentDidMount() {
    const token = process.env.WEATHER_KEY
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${this.props.match.params.days}&APPID=${token}`)
      .then(res => {
        this.setState({ searchedCountry: res.data }, () => {
          this.handleFilter()
          this.handleGraph()
        })
  
      })
  }


  handleKeyUp(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleFilter(){
    const country = this.state.searchedCountry.list.filter(
      (weather) =>
        weather.dt === this.state.searchedCountry.list[0].dt ||
        weather.dt === this.state.searchedCountry.list[0].dt + 86400 ||
        weather.dt === this.state.searchedCountry.list[0].dt + 86400 * 2 ||
        weather.dt === this.state.searchedCountry.list[0].dt + 86400 * 3 ||
        weather.dt === this.state.searchedCountry.list[0].dt + 86400 * 4
    ).map(weather => weather)

    this.setState({ country })
  }

  handleGraph(){
    const graphData = this.state.searchedCountry.list.map(weather => weather).slice(0, 8)

    this.setState({ graphData })

  }



  render() {
    console.log(this.state.searchedCountry)
    console.log(this.state.graphData)

    const data = this.state.graphData.map(weather => {
      return ({ 
        name: days[new Date(weather.dt * 1000).getDay()]+ ', ' + weather.dt_txt.slice(12, 20), 
        max: Math.round(weather.main.temp_max - 273.15), 
        min: Math.round(weather.main.temp_min - 273.15), 
        feelsLike: Math.round(weather.main.feels_like - 273.15) 
      }) 
    })
   
    console.log(data)
    

    if (this.state.searchedCountry.list.length === 0)  {
      return (
        <section className="hero is-warning is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div id="notfound">
                <div className="notfound">
                  <div className="notfound-404">
                    <img className="spinner" src="https://offerscouponsdeals.in/public/ocd_images/overlay-loader.gif" alt="Loading" />
                    <h2 className="title is-3 has-text-centered">No Results Found</h2>
                    <div className="title is-6 has-text-centered"><Link to="/"> Let's go back home! </Link></div> 

                  </div>

                </div>
              </div>
            </div>

         
          </div>
        </section>
      )
    }
    
    return (
      <section className="hero is-warning is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h2 className="has-text-centered title is-1 heading">Weather App</h2>
            <hr />
            <h2 className="has-text-centered title is-3 heading"> {this.state.searchedCountry.city.name},  {this.state.searchedCountry.city.country}</h2>
            <hr />
          
            <div className="columns">
              {this.state.country.map(weather => 
                <div 
                  className="column" 
                  key={weather.id} >
                  <p className="has-text-centered subtitle is-5 heading">{days[new Date(weather.dt * 1000).getDay()]}</p>
                  <Card
                    image={`http://openweathermap.org/img/wn/${weather.weather.map(item => item.icon)}@2x.png`}
                    tempMax={weather.main.temp_max}
                    tempMin={weather.main.temp_min}
                    feelsLike={weather.main.feels_like}
                    humidity={weather.main.humidity}
                    description={_.startCase(weather.weather.map(item => item.description))}
                  />
                </div>
                
              )}
            </div>
            
            <hr />

            <h3 className="has-text-centered title is-3 heading"> Further details....</h3>
            <LineChart width={1300} height={400} data={data}
              margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
              <XAxis dataKey="name"
                label={{ value: 'random text', position: 'insideBottomRight', offset: -20 }}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="min" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="feelsLike" stroke="#82ca9d" strokeDasharray="3 2" />
              <Line type="monotone" dataKey="max" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>

            <br />
            <br />
            <div className="buttons has-addons is-centered">
              <div className="has-text-centered button"> <Link to="/"> Back Home</Link> </div>
            </div>
          </div>
        </div>
      </section>



    )


  }

}

export default FiveDays