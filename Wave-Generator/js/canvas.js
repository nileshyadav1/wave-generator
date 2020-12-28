// import * as dat from "dat.gui";

// const dat = require("dat.gui");
const gui = new dat.GUI();
const canvas = document.querySelector("canvas");
const c= canvas.getContext("2d");



canvas.width = innerWidth;
canvas.height = innerHeight;

const wave ={
    y:canvas.height/2,
    length:0.01,
    amplitude:100,
    frequency :0.01
}

const strokeColor = {
 Hue:200,
 Saturation:50,
 Luminance:50
 
}
const CST = {
 cos:0.7,
 sin:0.1,
 tan:0.45
 
}
const backgroundColor ={
    r:0,
    g:0,
    b:0,
    a:0.01
}
const waveFolder = gui.addFolder("wave");

waveFolder.add(wave,'y' , 0 , canvas.height)
waveFolder.add(wave,'length' , -0.01 , 0.01)
waveFolder.add(wave,'amplitude' , -300  , 300)
waveFolder.add(wave,'frequency' , -0.01  , 1)

waveFolder.open()

const strokeFolder = gui.addFolder("strokeColor")
strokeFolder.add(strokeColor, 'Hue', 0,360);
strokeFolder.add(strokeColor, 'Saturation', 0,100);
strokeFolder.add(strokeColor, 'Luminance', 0,100);
let increment = wave.frequency

const bgFolder = gui.addFolder("backgroundColor")
bgFolder.add(backgroundColor, 'r', 0,255);
bgFolder.add(backgroundColor, 'g', 0,255);
bgFolder.add(backgroundColor, 'b', 0,255);
bgFolder.add(backgroundColor, 'a', 0,1);

const cstFolder =gui.addFolder("CST");
cstFolder.add(CST,"cos",0,1);
cstFolder.add(CST,"sin",0,1);
cstFolder.add(CST,"tan",0,1);

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle= `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a}`
    c.fillRect(0,0,canvas.width, canvas.height)
    c.beginPath();
c.moveTo(0 , canvas.height/2);
for(let i=0;i<canvas.width;i++){
    c.lineTo(i , wave.y+Math.sin(i*wave.length + increment)*wave.amplitude*Math.cos(increment*`${CST.cos}`)*Math.sin(increment*`${CST.sin}`)*Math.tan(increment*`${CST.tan}`));
   
}

c.strokeStyle = `hsl(${strokeColor.Hue*Math.sin(increment)} , ${strokeColor.Saturation}% , ${strokeColor.Luminance}%)`
c.stroke();
increment += wave.frequency;
}

animate()