import { Browser } from 'leaflet';
import alarm_Sound from '../assets/Alarm Sound Effect.mp3'


  const playAlert =() => {
    const audio =new Audio(alarm_Sound);
    audio.play();
  }

 
 export default playAlert