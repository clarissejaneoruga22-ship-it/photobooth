const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const filter = document.getElementById("filter");
const countdown = document.getElementById("countdown");
let currentFacingMode = "user";

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode }
    });
    video.srcObject = stream;
}

document.getElementById("flipBtn").onclick = () => {
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
    startCamera();
};

async function takeStrip() {
    canvas.width = 420; canvas.height = 1100;
    ctx.fillStyle = "white"; ctx.fillRect(0, 0, 420, 1100);

    for (let i = 0; i < 3; i++) {
        for (let c = 3; c >= 1; c--) {
            countdown.innerHTML = c;
            await new Promise(r => setTimeout(r, 1000));
        }
        countdown.innerHTML = "";
        ctx.filter = filter.value;
        ctx.drawImage(video, 35, 80 + i * 320, 350, 260);
        ctx.filter = "none";
        ctx.strokeRect(35, 80 + i * 320, 350, 260);
    }
    canvas.style.display = "block";
    canvas.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("captureBtn").onclick = takeStrip;
document.getElementById("downloadBtn").onclick = () => {
    const a = document.createElement("a");
    a.download = "funhouse.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
};

startCamera();