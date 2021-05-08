export default class Oscillator {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new AudioContext();
  }
}