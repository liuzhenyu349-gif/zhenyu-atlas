const points = [
  { x: 70, y: 175, lon: 113.24102, lat: 35.21431, speed: 18, time: "08:00:00" },
  { x: 150, y: 145, lon: 113.24218, lat: 35.21472, speed: 25, time: "08:00:52" },
  { x: 250, y: 160, lon: 113.24361, lat: 35.21451, speed: 31, time: "08:01:43" },
  { x: 340, y: 205, lon: 113.24491, lat: 35.21388, speed: 22, time: "08:02:41" },
  { x: 430, y: 180, lon: 113.24622, lat: 35.21423, speed: 28, time: "08:03:36" },
  { x: 510, y: 135, lon: 113.24738, lat: 35.21485, speed: 35, time: "08:04:25" },
  { x: 620, y: 105, lon: 113.24897, lat: 35.21526, speed: 38, time: "08:05:21" },
  { x: 715, y: 130, lon: 113.25034, lat: 35.21492, speed: 26, time: "08:06:17" },
  { x: 790, y: 205, lon: 113.25142, lat: 35.21389, speed: 21, time: "08:07:25" },
  { x: 825, y: 305, lon: 113.25193, lat: 35.21252, speed: 2, time: "08:09:02" },
  { x: 775, y: 405, lon: 113.25120, lat: 35.21115, speed: 24, time: "08:10:48" },
  { x: 670, y: 450, lon: 113.24968, lat: 35.21053, speed: 29, time: "08:11:45" },
  { x: 545, y: 430, lon: 113.24788, lat: 35.21080, speed: 33, time: "08:12:43" },
  { x: 430, y: 470, lon: 113.24622, lat: 35.21025, speed: 27, time: "08:13:46" },
  { x: 305, y: 510, lon: 113.24441, lat: 35.20970, speed: 20, time: "08:14:58" },
  { x: 205, y: 465, lon: 113.24297, lat: 35.21032, speed: 16, time: "08:16:05" }
];

const routeSegments = document.querySelector("#routeSegments");
const traveled = document.querySelector("#traveled");
const vehicle = document.querySelector("#vehicle");
const progress = document.querySelector("#progress");
const playButton = document.querySelector("#play");
const liveStatus = document.querySelector("#liveStatus");
const toSeconds = time => time.split(":").reduce((total, value) => total * 60 + Number(value), 0);
const startSeconds = toSeconds(points[0].time);
const endSeconds = toSeconds(points.at(-1).time);
const durationSeconds = endSeconds - startSeconds;
let position = 0;
let playing = false;
let lastFrame = null;
let frameId = null;
let follow = true;

function speedColor(speed) {
  if (speed < 3) return "#ff7a72";
  if (speed < 22) return "#ffb75a";
  return "#42e1c2";
}

for (let index = 1; index < points.length; index++) {
  const a = points[index - 1], b = points[index];
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", a.x); line.setAttribute("y1", a.y); line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
  line.setAttribute("class", "route-segment");
  line.setAttribute("stroke", speedColor((a.speed + b.speed) / 2));
  routeSegments.appendChild(line);
}

function interpolate(a, b, ratio, key) { return a[key] + (b[key] - a[key]) * ratio; }
function geodesicDistance(a, b) {
  const radius = 6371000;
  const toRadians = value => value * Math.PI / 180;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat), lat2 = toRadians(b.lat);
  const haversine = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(haversine));
}

function pathDistance(endIndex, partialRatio) {
  let total = 0;
  for (let index = 1; index <= endIndex; index++) {
    const a = points[index - 1], b = points[index];
    total += geodesicDistance(a, b);
  }
  if (endIndex < points.length - 1) {
    const a = points[endIndex], b = points[endIndex + 1];
    total += geodesicDistance(a, b) * partialRatio;
  }
  return total;
}

function render() {
  const currentSeconds = startSeconds + position * durationSeconds;
  let index = points.findIndex((_, pointIndex) => pointIndex < points.length - 1 && toSeconds(points[pointIndex + 1].time) >= currentSeconds);
  if (index < 0) index = points.length - 2;
  const segmentStart = toSeconds(points[index].time);
  const segmentEnd = toSeconds(points[index + 1].time);
  const ratio = Math.min(Math.max((currentSeconds - segmentStart) / (segmentEnd - segmentStart), 0), 1);
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
  const elapsed = Math.round(position * durationSeconds);
  const value = startSeconds + elapsed;
  const hh = String(Math.floor(value / 3600)).padStart(2, "0");
  const mm = String(Math.floor(value % 3600 / 60)).padStart(2, "0");
  const ss = String(value % 60).padStart(2, "0");
  document.querySelector("#clock").textContent = `${hh}:${mm}:${ss}`;
  const chartX = position * 1000;
  const chartY = 116 - current.speed / 40 * 96;
  document.querySelector("#speedCursor").setAttribute("cx", chartX);
  document.querySelector("#speedCursor").setAttribute("cy", chartY);
  vehicle.classList.toggle("follow", follow);
}

function setPlaying(value) {
  if (frameId !== null) cancelAnimationFrame(frameId);
  frameId = null;
  playing = value;
  playButton.textContent = playing ? "Ⅱ 暂停" : "▶ 播放";
  liveStatus.classList.toggle("paused", !playing);
  liveStatus.querySelector("b").textContent = playing ? "正在回放" : "已暂停";
  lastFrame = null;
  if (playing) frameId = requestAnimationFrame(tick);
}

function tick(timestamp) {
  frameId = null;
  if (!playing) return;
  if (lastFrame !== null) {
    const speed = Number(document.querySelector("#speed").value);
    position = Math.min(1, position + (timestamp - lastFrame) / (durationSeconds * 16.67) * speed);
    render();
    if (position >= 1) { setPlaying(false); return; }
  }
  lastFrame = timestamp;
  frameId = requestAnimationFrame(tick);
}

playButton.addEventListener("click", () => { if (position >= 1) position = 0; setPlaying(!playing); render(); });
document.querySelector("#restart").addEventListener("click", () => { position = 0; setPlaying(false); render(); });
progress.addEventListener("input", () => { position = Number(progress.value) / 1000; render(); });
document.querySelector("#follow").addEventListener("click", event => {
  follow = !follow;
  event.currentTarget.classList.toggle("active", follow);
  event.currentTarget.textContent = follow ? "◎ 跟随开启" : "◎ 跟随关闭";
});

const chartPoints = points.map(point => `${(toSeconds(point.time) - startSeconds) / durationSeconds * 1000},${116 - point.speed / 40 * 96}`);
document.querySelector("#speedLine").setAttribute("points", chartPoints.join(" "));
document.querySelector("#speedArea").setAttribute("d", `M0,116 L${chartPoints.join(" L")} L1000,116 Z`);
const stopCount = points.filter(point => point.speed < 3).length;
const gapCount = points.slice(1).filter((point, index) => toSeconds(point.time) - toSeconds(points[index].time) > 120).length;
document.querySelector("#qualitySummary").textContent = `${points.length} 个观测点 · ${stopCount} 个停留点 · ${gapCount} 个时间缺口`;
document.querySelector("#quality").textContent = gapCount ? `演示规则检查：${gapCount} 处时间缺口` : "演示规则检查：无时间缺口";
render();
