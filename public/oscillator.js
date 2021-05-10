import pulse from './pulse.js';

export default class Oscillator {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new AudioContext();
    this.osc = new OscillatorNode(this.context);
    this.isPlaying = false;
  }
  
  play() {
    //this.osc = this.context.createOscillator();
    this.osc.connect(this.context.destination);
    this.osc.start();
    this.isPlaying = true;
  }
  
  end() {
    this.osc.stop();
    this.isPlaying = false;
  }
}