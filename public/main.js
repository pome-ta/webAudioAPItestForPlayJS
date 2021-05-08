import Oscillator from './oscillator.js';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const hoge = new Oscillator();
console.log({hoge});

const ctx = new AudioContext();
let osc;
// 再生中でtrue
let isPlaying = false;
let mode = 0;
const analyser = ctx.createAnalyser();


document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if (isPlaying) return;
  osc = ctx.createOscillator();
  osc.connect(analyser).connect(ctx.destination);
  osc.start();
  isPlaying = true;
});

document.querySelector("#stop").addEventListener("click", () => {
  osc?.stop();
  isPlaying = false;
});




// canvas

const canvasctx = document.getElementById("graph").getContext("2d");
const gradbase = canvasctx.createLinearGradient(0, 0, 0, 256);
gradbase.addColorStop(0, "rgb(20,22,20)");
gradbase.addColorStop(1, "rgb(20,20,200)");

const gradline = [];
for (let i = 0; i < 256; ++i) {
  gradline[i] = canvasctx.createLinearGradient(0, 256 - i, 0, 256);
  const n = (i & 64) * 2;
  gradline[i].addColorStop(0, "rgb(255,0,0)");
  gradline[i].addColorStop(1, "rgb(255," + i + ",0)");
}

/*
function DrawGraph() {
  canvasctx.fillStyle = gradbase;
  canvasctx.fillRect(0, 0, 256, 256);
  const data = new Uint8Array(256);
  if(mode == 0) analyser.getByteFrequencyData(data); //Spectrum Data
  else analyser.getByteTimeDomainData(data); //Waveform Data
  for(var i = 0; i < 256; ++i) {
    canvasctx.fillStyle = gradline[data[i]];
    canvasctx.fillRect(i, 256 - data[i], 1, data[i]);
  }
}
*/

const DrawGraph = () => {
  canvasctx.fillStyle = gradbase;
  canvasctx.fillRect(0, 0, 256, 256);
  const data = new Uint8Array(256);
  if (mode == 0) analyser.getByteFrequencyData(data); //Spectrum Data
  else analyser.getByteTimeDomainData(data); //Waveform Data
  for (var i = 0; i < 256; ++i) {
    canvasctx.fillStyle = gradline[data[i]];
    canvasctx.fillRect(i, 256 - data[i], 1, data[i]);
  }
}

setInterval(DrawGraph, 100);

