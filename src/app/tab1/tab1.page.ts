import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Time } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';

declare var sensors;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  
  var:any; //var to stock the interval
  proximity:number;

  constructor(private geolocation: Geolocation,private alertController: AlertController,  platform: Platform) {

    this.proximity = 0;
    
    platform.ready().then(() => {
      this.initSensor();
    })

  }
  
  //function to catch geolocation data
   locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
     
     }).catch((error) => {
       console.log('Error getting location', error);
       this.errorAlert();
     });
  }


  //interval about function of data collect

  locationRepeat(){
    this.presentAlert();
    this.var = setInterval(() => {
      this.locate()
    },3000)
  }

   stopLocation(){
    clearInterval(this.var);
  }
  //ALERT
 //Error alert
  async errorAlert(){
    const alert = await this.alertController.create({
      header: 'Erreur',
      message: 'Veuillez réessayer',
      buttons: ['Cancel']
    });
    await alert.present();
  }

  //Starting alert 
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'C\'est parti !',
      message: 'Démarrage de l\'analyse',
      buttons: ['Let\'s go']
    });
    await alert.present();
  }

  initSensor() {
    sensors.enableSensor("LIGHT")
    setInterval(() => {
      sensors.getState((values) => {
        this.proximity = values[0]
      });
    }, 300)
    console.log(this.proximity);
  }

 /* initSensor(){
    sensors.enableSensor("LIGHT");
    console.log(sensors.getState());
  }*/
  }
