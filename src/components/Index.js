import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'




class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: {
        main: {},
        sys: {},
        weather: []
      }, 
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=362ab4995b2bd8af16368699f72a0b13')
      .then(res => {
        this.setState({ weather: res.data })
      })
  }



  handleChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleSubmit() {
    this.props.history.push('/search/' + this.state.searchTerm)

  }


  render() {
    console.log(this.state.weather)
    console.log(this.state.searchTerm)
    return (
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {this.state.weather.name}, {this.state.weather.sys.country}
            </h1>

            <p>Maximum temp : {this.state.weather.main.temp_max}</p>
            <p>Minimum temp : {this.state.weather.main.temp_min}</p>

            <p>Feels Like: {this.state.weather.main.temp_min}</p>

            <p>Humidity: {this.state.weather.main.humidity}</p>
            <p>Description: {this.state.weather.weather.map(des => des.description)}</p>

            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Search your favourite ingredient" className="input" onChange={this.handleChange} />
            </form>


          </div>
        </div>
      </section>



    )
  }

}

export default Index