const form = document.querySelector('#inputCity')
const buttonEnviar = document.querySelector('#buttonEnviar')
const selectCountry = document.querySelector('#country')
const temperatura = document.querySelector('.temp')
const nameCity = document.querySelector('.nameCity')
const umidade = document.querySelector('.umidadeValue')
const vento = document.querySelector('.ventoValue')
const imgClima = document.querySelector('#imgClima')

buttonEnviar.addEventListener('click',()=>{
  const value = form.value
  const country = selectCountry.value
  const keyAPI = '9c8c716d34159b02fc95aa11008665f6'
  

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value},${country}&appid=${keyAPI}`)
    .then(response => response.json())
    .then(data =>{
      const lat = data[0].lat
      const lon = data[0].lon

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}`)
        .then(response => response.json())
        .then(data =>{

          let valueTemperaturaKelvin = data.main.temp
          let valueTemperaturaCelcius = valueTemperaturaKelvin - 273.15
          temperatura.innerHTML = `
            ${valueTemperaturaCelcius.toFixed(0)} °C
          ` 

          if(valueTemperaturaCelcius < 20){
            imgClima.src = 'img/nuvem.png'
          } else if(valueTemperaturaCelcius >= 20 && valueTemperaturaCelcius <= 27){
            imgClima.src = 'img/nublado.png'
          } else{
            imgClima.src = 'img/sol.png'
          }

          nameCity.innerText = data.name
          
          umidadeValue = data.main.humidity
          umidade.innerHTML = `
            ${umidadeValue}%
          `

          let valueVentoMetrosPorSegundo = data.wind.speed
          let valueVentoQuilometroPorHora = valueVentoMetrosPorSegundo * 3.6
          vento.innerHTML = `
            ${valueVentoQuilometroPorHora.toFixed(1)}KM/H
          `
        })
    }).catch(error => console.log('error',error))
  })
