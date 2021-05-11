import pulse from './pulse.js';

export default class Oscillator {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new AudioContext();
    this.osc;
    this.isPlaying = false;
  }
  
  play() {
    const waves = {
      '0.125': this.context.createPeriodicWave(pulse['0.125'].real, pulse['0.125'].imag),
      '0.25': this.context.createPeriodicWave(pulse['0.25'].real, pulse['0.25'].imag),
      '0.5': this.context.createPeriodicWave(pulse['0.5'].real, pulse['0.5'].imag),
      '0.75': this.context.createPeriodicWave(pulse['0.75'].real, pulse['0.75'].imag),
    };
    
    
    this.osc = this.context.createOscillator();
    this.osc.setPeriodicWave(waves['0.75']);
    this.osc.connect(this.context.destination);
    this.osc.start();
    this.isPlaying = true;
  }
  
  end() {
    this.osc.stop();
    this.isPlaying = false;
  }
}