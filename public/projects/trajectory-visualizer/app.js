const points = [
  { x: 70, y: 175, lon: 113.24102, lat: 35.21431, speed: 18 },
  { x: 150, y: 145, lon: 113.24218, lat: 35.21472, speed: 25 },
  { x: 250, y: 160, lon: 113.24361, lat: 35.21451, speed: 31 },
  { x: 340, y: 205, lon: 113.24491, lat: 35.21388, speed: 22 },
  { x: 430, y: 180, lon: 113.24622, lat: 35.21423, speed: 28 },
  { x: 510, y: 135, lon: 113.24738, lat: 35.21485, speed: 35 },
  { x: 620, y: 105, lon: 113.24897, lat: 35.21526, speed: 38 },
  { x: 715, y: 130, lon: 113.25034, lat: 35.21492, speed: 26 },
  { x: 790, y: 205, lon: 113.25142, lat: 35.21389, speed: 21 },
  { x: 825, y: 305, lon: 113.25193, lat: 35.21252, speed: 17 },
  { x: 775, y: 405, lon: 113.25120, lat: 35.21115, speed: 24 },
  { x: 670, y: 450, lon: 113.24968, lat: 35.21053, speed: 29 },
  { x: 545, y: 430, lon: 113.24788, lat: 35.21080, speed: 33 },
  { x: 430, y: 470, lon: 113.24622, lat: 35.21025, speed: 27 },
  { x: 305, y: 510, lon: 113.24441, lat: 35.20970, speed: 20 },
  { x: 205, y: 465, lon: 113.24297, lat: 35.21032, speed: 16 }
];

const route = document.querySelector("#route");
const traveled = document.querySelector("#traveled");
const vehicle = document.querySelector("#vehicle");
const progress = document.querySelector("#progress");
const playButton = document.querySelector("#play");
const liveStatus = document.querySelector("#liveStatus");
const startSeconds = 8 * 3600;
let position = 0;
let playing = false;
let lastFrame = null;

route.setAttribute("points", points.map(point => `${point.x},${point.y}`).join(" "));

function interpolate(a, b, ratio, key) { return a[key] + (b[key] - a[key]) * ratio; }
function pathDistance(endIndex, partialRatio) {
  let total = 0;
  for (let index = 1; index <= endIndex; index++) {
    const a = points[index - 1], b = points[index];
    total += Math.hypot(b.x - a.x, b.y - a.y) * 1.9;
  }
  if (endIndex < points.length - 1) {
    const a = points[endIndex], b = points[endIndex + 1];
    total += Math.hypot(b.x - a.x, b.y - a.y) * 1.9 * partialRatio;
  }
  return total;
}

function render() {
  const scaled = position * (points.length - 1);
  const index = Math.min(Math.floor(scaled), points.length - 2);
  const ratio = Math.min(scaled - index, 1);
  const a = points[index], b = points[index + 1];
  const current = {
    x: interpolate(a, b, ratio, "x"), y: interpolate(a, b, ratio, "y"),
    lon: interpolate(a, b, ratio, "lon"), lat: interpolate(a, b, ratio, "lat"),
    speed: interpolate(a, b, ratio, "speed")
  };
  vehicle.setAttribute("transform", `translate(${current.x} ${current.y})`);
  const completed = points.slice(0, index + 1).map(point => `${point.x},${point.y}`);
  completed.push(`${current.x},${current.y}`);
  traveled.setAttribute("points", completed.join(" "));
  progress.value = Math.round(position * 1000);
  document.querySelector("#coords").textContent = `${current.lon.toFixed(5)}, ${current.lat.toFixed(5)}`;
  document.querySelector("#currentSpeed").textContent = `${current.speed.toFixed(1)} km/h`;
  document.querySelector("#distance").textContent = `${Math.round(pathDistance(index, ratio))} m`;
  document.querySelector("#percent").textContent = `${Math.round(position * 100)}%`;
  const elapsed = Math.round(position * 18 * 60);
  const value = startSeconds + elapsed;
  const hh = String(Math.floor(value / 3600)).padStart(2, "0");
  const mm = String(Math.floor(value % 3600 / 60)).padStart(2, "0");
  const ss = String(value % 60).padStart(2, "0");
  document.querySelector("#clock").textContent = `${hh}:${mm}:${ss}`;
}

function setPlaying(value) {
  playing = value;
  playButton.textContent = playing ? "Ⅱ 暂停" : "▶ 播放";
  liveStatus.classList.toggle("paused", !playing);
  liveStatus.querySelector("b").textContent = playing ? "正在回放" : "已暂停";
  lastFrame = null;
  if (playing) requestAnimationFrame(tick);
}

function tick(timestamp) {
  if (!playing) return;
  if (lastFrame !== null) {
    const speed = Number(document.querySelector("#speed").value);
    position = Math.min(1, position + (timestamp - lastFrame) / 18000 * speed);
    render();
    if (position >= 1) { setPlaying(false); return; }
  }
  lastFrame = timestamp;
  requestAnimationFrame(tick);
}

playButton.addEventListener("click", () => { if (position >= 1) position = 0; setPlaying(!playing); render(); });
document.querySelector("#restart").addEventListener("click", () => { position = 0; setPlaying(false); render(); });
progress.addEventListener("input", () => { position = Number(progress.value) / 1000; render(); });
render();

