import alarmSound from '../assets/Alarm Sound Effect.mp3';

let audioInstance = null;

/**
 * Plays the emergency alarm sound effect.
 * Safely handles browser autoplay policies and rapid re-triggers.
 */
export const playAlert = (volume = 0.8) => {
  try {
    if (!audioInstance) {
      audioInstance = new Audio(alarmSound);
    }
    audioInstance.volume = volume;
    audioInstance.currentTime = 0; // Rewind to start for immediate replay
    const playPromise = audioInstance.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio playback waiting for user interaction:', err);
      });
    }
  } catch (err) {
    console.error('Failed to play alarm sound:', err);
  }
};

/**
 * Stops any currently playing alarm sound.
 */
export const stopAlert = () => {
  try {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    }
  } catch (err) {
    console.error('Failed to stop alarm sound:', err);
  }
};

export default playAlert;