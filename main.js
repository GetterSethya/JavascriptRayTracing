function ray_color(r, world) {
    const rec = new HitRecord();

    if (world.hit(r, 0, Infinity, rec)) {
        const normal = rec.normal;
        const white = new Vec3(0.5, 0.5, 0.5);
        return normal.multiply(0.5).add(white);
    }

    let unit_direction = r.direction.unit;
    t = 0.5 * (unit_direction.y + 1.0);
    let white = new Vec3(1.0, 1.0, 1.0);
    let blue = new Vec3(0.5, 0.7, 1.0);

    return white.multiply(1.0 - t).add(blue.multiply(t));
}

function hit_sphere(center, radius, r) {
    const oc = r.origin.subtract(center);
    const a = r.direction.squaredLength;
    const half_b = oc.dot(r.direction);
    const c = oc.squaredLength - radius * radius;
    const discriminant = half_b * half_b - a * c;
    if (discriminant < 0) {
        return -1.0;
    } else {
        return (-half_b - Math.sqrt(discriminant)) / a;
    }
}

//image
const aspect_ratio = 16.0 / 9.0;
const width = 512;
const height = width / aspect_ratio;
const samples_per_pixel = 100;

//canvas
const canvas = document.getElementById("main_canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height);

//world
let world = new HittableList();
world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

let imageData = new ImageData(width, height);
let ppm_body;
let arrppm = [];

//camera
const cam = new Camera();

for (let j = height - 1; j >= 0; j--) {
    for (let i = 0; i < width; i++) {
        let pixel_color = new Vec3(0, 0, 0);

        for (let s = 0; s < samples_per_pixel; s++) {
            const u = (i + random_double()) / (width - 1);
            const v = (j + random_double()) / (height - 1);
            const r = cam.get_ray(u, v);
            pixel_color = pixel_color.add(ray_color(r, world));
        }
        const scale = 1.0 / samples_per_pixel;
        const scaled_color = pixel_color.multiply(scale);

        const ir = Math.floor(255.999 * clamp(scaled_color.x, 0.0, 0.999));
        const ig = Math.floor(255.999 * clamp(scaled_color.y, 0.0, 0.999));
        const ib = Math.floor(255.999 * clamp(scaled_color.z, 0.0, 0.999));

        if (ppm_body == undefined) {
            ppm_body = `${ir} ${ig} ${ib}\n`;
        } else {
            ppm_body += `${ir} ${ig} ${ib}\n`;
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
