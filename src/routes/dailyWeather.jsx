import React from "react";

export default function DailyWeather() {
  function convertWindDegreeToDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
  }
  return <div>DailyWeather</div>;
}
