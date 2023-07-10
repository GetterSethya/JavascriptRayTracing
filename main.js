function ray_color(r) {
  let t = hit_sphere(new Vec3(0, 0, -1), 0.5, r);

  if (t > 0.0) {
    const n = r.pointAt(t).subtract(new Vec3(0, 0, -1)).unit;

    return new Vec3(n.x + 1, n.y + 1, n.z + 1).multiply(0.5);
  }

  let unit_direction = r.direction.unit;
  t = 0.5 * (unit_direction.y + 1.0);
  let white = new Vec3(1.0, 1.0, 1.0);
  let blue = new Vec3(0.5, 0.7, 1.0);

  return white.multiply(1.0 - t).add(blue.multiply(t));
}

function hit_sphere(center, radius, r) {
  const oc = r.origin.subtract(center);
  const a = r.direction.dot(r.direction);
  const b = 2.0 * oc.dot(r.direction);
  const c = oc.dot(oc) - radius * radius;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return -1.0;
  } else {
    return (-b - Math.sqrt(discriminant)) / (2.0 * a);
  }
}

//image
const aspect_ratio = 16.0 / 9.0;
const width = 512;
const height = width / aspect_ratio;

//canvas
const canvas = document.getElementById("main_canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height);

let imageData = new ImageData(width, height);
let ppm_body;
let arrppm = [];

//camera
const viewport_height = 2.0;
const viewport_width = aspect_ratio * viewport_height;
const focal_length = 1.0;

const origin = new Vec3(0, 0, 0);
const horizontal = new Vec3(viewport_width, 0, 0);
const vertical = new Vec3(0, viewport_height, 0);
const lower_left_corner = origin
  .subtract(horizontal.multiply(0.5))
  .subtract(vertical.multiply(0.5))
  .subtract(new Vec3(0, 0, focal_length));

for (let j = height; j >= 0; j--) {
  for (let i = 0; i < width; i++) {
    const u = i / (width - 1);
    const v = j / (height - 1);
    const direction = lower_left_corner
      .add(horizontal.multiply(u))
      .add(vertical.multiply(v))
      .subtract(origin);
    const r = new Ray(origin, direction);
    const color = ray_color(r);

    if (ppm_body == undefined) {
      ppm_body = `${color.x * 255} ${color.y * 255} ${color.z * 255}\n`;
    } else {
      ppm_body += `${color.x * 255} ${color.y * 255} ${color.z * 255}\n`;
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
