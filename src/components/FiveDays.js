import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'

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
      main: {}
    }

  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=' + this.props.match.params.days + '&APPID=362ab4995b2bd8af16368699f72a0b13')
      .then(res => {
        this.setState({ searchedCountry: res.data }, () => {
          this.handleFilter()
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


  render() {
    console.log(this.state.searchedCountry)
    // console.log(this.state.country.weather)

    return (
   
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <h2> {this.state.searchedCountry.city.name},  {this.state.searchedCountry.city.country}</h2>
          <div className="home-container">
          
            
            {this.state.country.map(weather => 
              <div key={weather.id} >
                <h1>{weather.weather.map(item => item.main)}</h1>
                <Card
                  image={`http://openweathermap.org/img/wn/${weather.weather.map(item => item.icon)}@2x.png`}
                  tempMax={weather.main.temp_max}
                  tempMin={weather.main.temp_min}
                  feelsLike={weather.main.feels_like}
                  humidity={weather.main.humidity}
                  timezone={0}
                  description={weather.weather.map(item => item.description)}
                />
              </div>
                
            )}
      
      
      
          </div>
        </div>

        <Link to="/"> Back Home</Link>

      </section>



    )


  }

}

export default FiveDays