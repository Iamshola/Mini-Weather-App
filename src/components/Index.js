import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'
import moment from 'moment'
import _ from 'lodash'

const initalCountry = ['London', 'Lagos', 'New York', 'Barcelona', 'Tallinn', 'Tema']

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: [],      
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
  }
 
  getData(){
    const token = process.env.WEATHER_KEY
    this.setState({ weather: [] })
    
    initalCountry.map(x =>
      axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${x}&APPID=${token}`)
        .then(res => {
          this.setState({ weather: [res.data].concat(this.state.weather), currentTime: moment().format('MMMM Do YYYY, h:mm:ss a') })
        })
    )

  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleSubmit() {
    this.props.history.push('/matched/' + this.state.searchTerm)

  }

  render() {
  
    if (this.state.weather === 0) {
      return null
    }

    return ( 
      <section className="hero is-warning is-medium">
        <div className="hero-body">
          <div className="container">
            <h2 className="has-text-centered title is-2 heading">Whats your weather?</h2>
            <hr />
            <h2 className="has-text-centered title is-3 heading">Our Favourite five</h2>
            <hr />
            <div className="columns">
              {this.state.weather.map(x =>
                <div 
                  className="column" 
                  key={x.id}
                >
                
                  <Link to={`/matched/${x.name}`}> 
                    <h1 className="title">  {x.name}, {x.sys.country}</h1>
                 
                    <Card 
                      image={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}
                      tempMax={x.main.temp_max}
                      tempMin={x.main.temp_min}
                      feelsLike={x.main.feels_like}
                      humidity={x.main.humidity}
                      description={_.startCase(x.weather.map(des => des.description))}
                    /> 
                   
                  </Link>
                </div> 
              )}
            </div>
          </div>  
          <div>
            <br />
            <br />
            <h1 className="has-text-centered title">OR</h1>
     
          </div>
          
          <div className="column is-6 is-offset-3">
            <div className="field">
              <div className="control">
                <form onSubmit={this.handleSubmit}>
                  <input type="text" placeholder="Search your favourite city" className="input is-danger is-rounded" onChange={this.handleChange} />
                  {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={this.handleChange}/>
                   */}
                </form>
              </div>
            </div>

            <p className="has-text-centered">Last Updated: {this.state.currentTime} </p>
            <div className="buttons has-addons is-centered">
              <button className=" button has-text-centered is-small is-danger" onClick={this.getData}>Get Updates here</button>
            </div>


          </div>


        </div>

      </section>



    )
  }

}

export default Index