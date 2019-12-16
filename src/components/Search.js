import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      searchedCountry: {
        main: {},
        sys: {},
        weather: [] 
      },
      searchTerm: ''
    }

  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' + this.props.match.params.city + '&APPID=362ab4995b2bd8af16368699f72a0b13')
      .then(res => {
        this.setState({ searchedCountry: res.data })
      })
      .catch(err => this.setState({ err })) 
  }


  handleKeyUp(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }


  render() {
    console.log(this.state.searchedCountry)


    if (this.state.searchedCountry.weather.length === 0 ) {
      return <Link to="/"> Back Home</Link>
    }
   
    return (
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">

            <h1 className="title">{this.state.searchedCountry.name}, {this.state.searchedCountry.sys.country}  </h1>

            <Card
              image={`http://openweathermap.org/img/wn/${this.state.searchedCountry.weather[0].icon}@2x.png`}
              tempMax={this.state.searchedCountry.main.temp_max}
              tempMin={this.state.searchedCountry.main.temp_min}
              feelsLike={this.state.searchedCountry.main.feels_like}
              humidity={this.state.searchedCountry.main.humidity}
              timezone={this.state.searchedCountry.timezone}
              description={this.state.searchedCountry.weather.map(des => des.description)}
            />
    
          </div>
        </div>

        <Link to="/"> Back Home</Link>

      </section>



    )

    
  }

}

export default Search