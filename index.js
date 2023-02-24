$(document).ready( function(){

 const container = $(".container")[0];
 const search = $(".search-box button");
 const weatherBox = $(".weather-box")[0];
 const weatherDetails = $(".weather-details")[0];
 const error404 = $(".not-found")[0];

 search.on('click',function(){
    const APIKey = 'ac8c842ac20e3d9d70116d117f6e5903';
    const city = $(".search-box input").val();

        if(city === ''){
          return;
        }
        
        $.ajax({
            type:"POST",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`,
            success: (data) =>{
                          
                error404.style.display="none";
                error404.classList.remove('fadeIn');
               
                const image = $(".weather-box img")[0];
                const temperature = $(".weather-box .temperature")[0];
                const description = $(".weather-box .description")[0];
                const humidity = $(".weather-details .humidity span");
                const wind = $(".weather-details .wind span");

                switch(data.weather[0].main){

                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;

                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;

                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;

                    case 'Clouds':
                        image.src = 'images/clouds.png';
                        break;

                    case 'Haze':
                        image.src = 'images/haze.png';
                        break;
                        
                    default:
                        image.src = '';    

                }

                temperature.innerHTML = `${parseInt(data.main.temp)}<span>ºC</span>`;
                description.innerHTML = `${data.weather[0].description}`;
                humidity.innerHTML = `${data.main.humidity}%`;
                wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display= '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '590px';

            },
            error: (data) =>{
                
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display= 'none';
                error404.style.display="block";
                error404.classList.add('fadeIn');
                return;
              
            }
        })
  })

})