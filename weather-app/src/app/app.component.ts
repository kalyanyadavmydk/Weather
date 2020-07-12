import { Component ,OnInit,} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  img: any;
  constructor(private http:HttpClient){}
  weather_details;
  place='15.912899800000002,79.7399875';
  icon;
  currLat
  currLng
  ngOnInit() {
    
    navigator.geolocation.getCurrentPosition(position => {

      this.currLat = position.coords.latitude;
      this.currLng = position.coords.longitude;
      console.log(this.currLat,this.currLng)
    });
    this.weather()
  }

  weather(){
    console.log(this.currLat,this.currLng)
    console.log(this.place)
    var params={access_key:'209ef56ca752812541b50fa3e511b587',
    query :this.place,
    hourly :'1'
  }
    this.http.get<any>('http://api.weatherstack.com/current',{params}).subscribe((data)=>{
  
        try {
          console.log(data)
          this.weather_details=data
          this.icon=this.weather_details.current.weather_icons[0];
          console.log(this.icon)
        } catch (error) {
          return alert('City Not Found Try another')
        }

    })
  }
  getimage(){
    let descr=this.weather_details.current.weather_descriptions[0].toLowerCase()
    let image = document.getElementsByClassName("sub-body1") as HTMLCollectionOf<HTMLElement>;
    if(descr.includes('cloud')){
      
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/cloud.jpg')"
    }
    else if(descr.includes('thunderstorm')){
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/thunderstorm.jpg')"
    }
    else if(descr.includes('rain')){
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/rain.jpg')"
    }

    else if(descr.includes('snow') || this.weather_details.current.temperature<=0){
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/snow.jpg')"
    }
    else if(descr.includes('wind')){
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/wind.jpg')"
    }
    else if(descr.includes('mist')){
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/mist.jpg')"
    }
    else if(descr.includes('haze')){
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage="url('../assets/haze.jpg')"
    }
    else{
      (<HTMLElement>document.querySelector('.sub-body1')).style.backgroundImage ="url('../assets/sunny.jpg')"
    }
  }
  
}
