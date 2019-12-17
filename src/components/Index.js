import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'
import moment from 'moment'

const initalCountry = ['London', 'Lagos', 'New York', 'Barcelona']

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
    this.setState({ weather: [] })
    
    initalCountry.map(x =>
      axios.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' + x + '&APPID=362ab4995b2bd8af16368699f72a0b13')
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
    console.log(this.state.weather)
    console.log(this.state.searchTerm)

    if (this.state.weather === 0) {
      return null
    }

    return ( 
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="home-container">

            {this.state.weather.map(x =>
              <div key={x.id}>
                <h1 className="title">
                  <Link to={`/matched/${x.name}`}> {x.name}, {x.sys.country} </Link>
                </h1>

                <Card 
                  image={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}
                  tempMax={x.main.temp_max}
                  tempMin={x.main.temp_min}
                  feelsLike={x.main.feels_like}
                  humidity={x.main.humidity}
                  timezone={x.timezone}
                  description={x.weather.map(des => des.description)}
                />    
              </div> 
            )}
          </div>  
          <h1>OR</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search your favourite ingredient" className="input" onChange={this.handleChange} />
          </form>
          <small>Last Updated: {this.state.currentTime} <button onClick={this.getData}>Get Updates here</button></small>
        </div>

      </section>



    )
  }

}

export default Index