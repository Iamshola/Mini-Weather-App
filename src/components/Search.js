import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
  }


  handleKeyUp(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    console.log(this.state.searchedCountry)
   
    return (
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">

            <h1 className="title">{this.state.searchedCountry.name}, {this.state.searchedCountry.sys.country}  </h1>

            <p>Maximum temp : {this.state.searchedCountry.main.temp_max}</p>
            <p>Minimum temp : {this.state.searchedCountry.main.temp_min}</p>

            <p>Feels Like: {this.state.searchedCountry.main.temp_min}</p>

            <p>Humidity: {this.state.searchedCountry.main.humidity}</p>
            <p>Description: {this.state.searchedCountry.weather.map(des => des.description)}</p>


          </div>
        </div>

        <Link to="/"> Back Home</Link>

      </section>



    )
  }

}

export default Search