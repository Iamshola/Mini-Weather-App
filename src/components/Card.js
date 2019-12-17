import React from 'react'

const Card = ({ tempMax, tempMin, feelsLike, humidity, timezone, description, image }) => {
  return (

    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} /> 
        </figure>
      </div>
      <div className="card-content">

        <p>{Math.round(tempMax - 273.15)} °C / {Math.round(tempMin - 273.15)} °C </p>
        <p>Feels Like: {Math.round(feelsLike - 273.15)} °C</p>

        <p>Humidity: {humidity} %</p>
        <p>Description: {description}</p>


        <p>Timezone: {Math.round(timezone) / 3600} GMT  </p>
      </div>
    </div>

  )
}
export default Card
