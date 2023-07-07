const canvas = document.getElementById("main_canvas");
canvas.setAttribute("width", innerWidth);
canvas.setAttribute("height", innerHeight);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, innerWidth, innerHeight);

let imageData = new ImageData(innerWidth, innerHeight);
let ppm_body;
let arrppm = [];

for (let j = innerHeight; j >= 0; j--) {
  for (let i = 0; i < innerWidth; i++) {
    const r = i / (innerWidth - 1);
    const g = j / (innerHeight - 1);
    const b = 0.25;

    if (ppm_body == undefined) {
      ppm_body = `${r * 255} ${g * 255} ${b * 255}\n`;
    } else {
      ppm_body += `${r * 255} ${g * 255} ${b * 255}\n`;
    }
  }
}

ppm_body = ppm_body.slice(0, ppm_body.length - 2).split("\n");
for (let index = 0; index < ppm_body.length; index++) {
  arrppm.push(
    parseFloat(ppm_body[index].split(" ")[0]),
    parseFloat(ppm_body[index].split(" ")[1]),
    parseFloat(ppm_body[index].split(" ")[2]),
    255
  );
}

for (let data = 0; data < imageData.data.length; data++) {
  imageData.data[data] = arrppm[data];
}

ctx.putImageData(imageData, 0, 0);
