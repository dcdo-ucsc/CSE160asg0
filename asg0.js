// DrawRectangle.js
var ctx;
var canvas;

function main() {
    // Retrieve <canvas> element <- (1)
    canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');

    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
} 

function handleDrawEvent(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let v1 = new Vector3(({0: document.getElementById("v1x").value, 1: document.getElementById("v1y").value, 2: 0}));
    let v2 = new Vector3(({0: document.getElementById("v2x").value, 1: document.getElementById("v2y").value, 2: 0}));

    let cx = canvas.width/2;
    let cy = canvas.height/2;

    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+(v1.elements[0]*20), cy-(v1.elements[1]*20));
    ctx.stroke();

    ctx.strokeStyle = 'blue';

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+(v2.elements[0]*20), cy-(v2.elements[1]*20));
    ctx.stroke();

    ctx.strokeStyle = 'green';

    let operation = document.getElementById("operation-select").value;
    let s = parseFloat(document.getElementById("scalar").value);

    let v3 = new Vector3(({0: 0, 1: 0, 2: 0}));
    let v4 = new Vector3(({0: 0, 1: 0, 2: 0}));

    switch (operation){
        case 'add':
            v3 = v1.add(v2);
            break;
        case 'sub':
            v3 = v1.sub(v2);
            break;
        case 'mult':
            v3 = v1.mult(s);
            v4 = v2.mult(s);
            break;
        case 'div':
            v3 = v1.div(s);
            v4 = v2.div(s);
            break;
        case 'angle':
            let dp = Vector3.dot(v1, v2);
            let magv1 = v1.magnitude();
            let magv2 = v2.magnitude();
            console.log("Angle: " + Math.acos(dp/(magv1 * magv2)) * (180/Math.PI));
            break;
        case 'area':
            console.log("Area of a Triangle: " + Vector3.cross(v1, v2).magnitude()/2);
            break;
        case 'mag':
            console.log("Magnitude v1: " + v1.magnitude());
            console.log("Magnitude v2: " + v2.magnitude());
            break;
        case 'norm':
            v3 = v1.normalize();
            v4 = v2.normalize();
            break;
        default:
            break;
    }
    
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+(v3.elements[0]*20), cy-(v3.elements[1]*20));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+(v4.elements[0]*20), cy-(v4.elements[1]*20));
    ctx.stroke();
}