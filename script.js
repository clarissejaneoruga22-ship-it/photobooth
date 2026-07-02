const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const filter = document.getElementById("filter");

const countdown = document.getElementById("countdown");

navigator.mediaDevices.getUserMedia({
    video: true
})

    .then(stream => {

        video.srcObject = stream;

    });

async function wait(ms) {

    return new Promise(r => setTimeout(r, ms));

}

async function takeStrip() {

    ctx.fillStyle = "white";

    ctx.fillRect(0, 0, 420, 1100);

    ctx.fillStyle = "#ff4fa1";

    ctx.font = "35px Arial";

    ctx.fillText("FunHouse Photo Booth", 35, 50);

    for (let i = 0; i < 3; i++) {

        for (let c = 3; c >= 1; c--) {

            countdown.innerHTML = c;

            await wait(1000);

        }

        countdown.innerHTML = "";

        ctx.filter = filter.value;

        ctx.drawImage(video, 35, 80 + i * 320, 350, 260);

        ctx.filter = "none";

        ctx.strokeStyle = "#ddd";

        ctx.lineWidth = 5;

        ctx.strokeRect(35, 80 + i * 320, 350, 260);

        await wait(300);

    }

    ctx.fillStyle = "#999";

    ctx.font = "18px Arial";

    ctx.fillText(new Date().toLocaleString(), 70, 1080);

}

document.getElementById("captureBtn").onclick = takeStrip;

document.getElementById("downloadBtn").onclick = () => {

    const a = document.createElement("a");

    a.download = "photostrip.png";

    a.href = canvas.toDataURL("image/png");

    a.click();

}