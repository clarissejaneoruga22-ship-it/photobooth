const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const filterSelect = document.getElementById("filter");
const countdown = document.getElementById("countdown");

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false
        });

        video.srcObject = stream;
        // Siguraduhin na ang video ay pwedeng mag-play nang inline
        video.setAttribute("playsinline", true);
        video.play().catch(e => {
            console.error("Autoplay failed:", e);
            alert("Pakipindot ang screen o i-allow ang autoplay.");
        });
    } catch (err) {
        console.error("Error:", err);
        alert("Camera Error: " + err.message);
    }
}

filterSelect.onchange = () => {
    // Para sa CSS filter
    video.style.filter = filterSelect.value;
};

async function takeStrip() {
    canvas.width = 420;
    canvas.height = 1100;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 1100);

    for (let i = 0; i < 3; i++) {
        for (let c = 3; c >= 1; c--) {
            countdown.innerHTML = c;
            await new Promise(r => setTimeout(r, 1000));
        }
        countdown.innerHTML = "";

        ctx.filter = filterSelect.value;
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
    a.download = "ClaPhotoBooth.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
};

startCamera();