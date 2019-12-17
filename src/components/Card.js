import React from 'react'

const Card = ({ tempMax, tempMin, feelsLike, humidity, description, image }) => {
  return (

    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={image} /> 
        </figure>
        <hr />
      </div>
      <div className="card-content">
        <p className="has-text-centered">{Math.round(tempMax - 273.15)}°C / {Math.round(tempMin - 273.15)}°C </p>
        <p className="has-text-centered">Feels Like: {Math.round(feelsLike - 273.15)}°C</p>
        <p className="has-text-centered"> Humidity: {humidity} %</p>
        <p className="has-text-centered">Description: {description}</p>
      </div>
    </div>

  )
}
export default Card
