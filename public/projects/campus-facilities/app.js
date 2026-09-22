const facilities = [
  { id: 1, name: "第一教学楼", category: "教学", x: 210, y: 145, lon: 113.24291, lat: 35.21492, hours: "07:00–22:00", schedule: [420, 1320], description: "公共课教室与测绘实验室，东侧设无障碍入口。", keywords: "教室 实验室 测绘" },
  { id: 2, name: "图书馆", category: "教学", x: 520, y: 150, lon: 113.24685, lat: 35.21486, hours: "08:00–22:30", schedule: [480, 1350], description: "提供自习区、电子阅览室和专业文献检索服务。", keywords: "自习 图书 文献" },
  { id: 3, name: "创新实践中心", category: "教学", x: 715, y: 235, lon: 113.24932, lat: 35.21381, hours: "09:00–21:00", schedule: [540, 1260], description: "用于竞赛、项目开发与学生创新实践。", keywords: "竞赛 项目 机房" },
  { id: 4, name: "第一食堂", category: "生活", x: 235, y: 420, lon: 113.24323, lat: 35.21145, hours: "06:30–21:30", schedule: [390, 1290], description: "两层综合食堂，支持校园卡与移动支付。", keywords: "吃饭 餐厅" },
  { id: 5, name: "学生服务中心", category: "生活", x: 525, y: 430, lon: 113.24691, lat: 35.21132, hours: "08:30–17:30", schedule: [510, 1050], description: "办理校园卡、证明、资助与后勤服务。", keywords: "校园卡 证明 后勤" },
  { id: 6, name: "校医院", category: "生活", x: 730, y: 505, lon: 113.24951, lat: 35.21038, hours: "全天急诊", schedule: null, description: "基础诊疗、健康咨询与急救服务。", keywords: "医疗 急诊 健康" },
  { id: 7, name: "东操场", category: "运动", x: 135, y: 250, lon: 113.24196, lat: 35.21361, hours: "06:00–22:00", schedule: [360, 1320], description: "400 米跑道、足球场及体能训练区。", keywords: "跑步 足球 体育" },
  { id: 8, name: "体育馆", category: "运动", x: 365, y: 520, lon: 113.24488, lat: 35.21019, hours: "08:00–21:30", schedule: [480, 1290], description: "篮球、羽毛球与室内体测场地。", keywords: "篮球 羽毛球 体测" }
];

const demoLocation = { lon: 113.2451, lat: 35.20972 };

const colors = { 教学: "#207564", 生活: "#e98752", 运动: "#4b7ea8" };
const markers = document.querySelector("#markers");
const list = document.querySelector("#facilityList");
const search = document.querySelector("#search");
const count = document.querySelector("#resultCount");
let category = "全部";
let selectedId = null;

function isOpen(facility, date = new Date()) {
  if (!facility.schedule) return true;
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= facility.schedule[0] && minutes <= facility.schedule[1];
}

function distanceMeters(a, b) {
  const radius = 6371000;
  const toRadians = value => value * Math.PI / 180;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const haversine = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(haversine));
}

function selectFacility(id) {
  selectedId = id;
  const facility = facilities.find(item => item.id === id);
  document.querySelector("#detailName").textContent = facility.name;
  document.querySelector("#detailDescription").textContent = facility.description;
  document.querySelector("#detailCategory").textContent = facility.category;
  document.querySelector("#detailHours").textContent = facility.hours;
  document.querySelector("#detailCoords").textContent = `${facility.lon.toFixed(5)}°E, ${facility.lat.toFixed(5)}°N`;
  document.querySelector("#detailDistance").textContent = `${Math.round(distanceMeters(demoLocation, facility))} m · 直线距离`;
  const badge = document.querySelector("#openBadge");
  const open = isOpen(facility);
  badge.textContent = open ? "按当前时间：开放" : "按当前时间：非开放时段";
  badge.className = `open-badge ${open ? "open" : "closed"}`;
  render();
}

function visibleFacilities() {
  const term = search.value.trim().toLowerCase();
  return facilities.filter(item => {
    const categoryMatches = category === "全部" || item.category === category;
    const textMatches = `${item.name} ${item.keywords}`.toLowerCase().includes(term);
    return categoryMatches && textMatches;
  });
}

function render() {
  const visible = visibleFacilities();
  const visibleIds = new Set(visible.map(item => item.id));
  count.textContent = `显示 ${visible.length} / ${facilities.length} 个设施`;
  list.innerHTML = visible.map(item => `
    <button class="facility-item ${selectedId === item.id ? "active" : ""}" data-id="${item.id}">
      ${item.name}<small>${item.category} · ${item.hours}</small>
    </button>`).join("");
  list.querySelectorAll("button").forEach(button => button.addEventListener("click", () => selectFacility(Number(button.dataset.id))));
  document.querySelectorAll(".marker").forEach(marker => {
    const id = Number(marker.dataset.id);
    marker.classList.toggle("hidden", !visibleIds.has(id));
    marker.classList.toggle("active", selectedId === id);
  });
}

facilities.forEach(item => {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("class", "marker");
  group.dataset.id = item.id;
  group.innerHTML = `<rect x="${item.x - 52}" y="${item.y - 24}" width="104" height="48" rx="13" fill="${colors[item.category]}"></rect><text x="${item.x}" y="${item.y + 5}">${item.name}</text>`;
  group.addEventListener("click", () => selectFacility(item.id));
  markers.appendChild(group);
});

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  category = button.dataset.category;
  render();
}));
search.addEventListener("input", render);
document.querySelector("#nearest").addEventListener("click", () => {
  const nearest = facilities.reduce((best, facility) => distanceMeters(demoLocation, facility) < distanceMeters(demoLocation, best) ? facility : best);
  category = "全部";
  search.value = "";
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item.dataset.category === "全部"));
  selectFacility(nearest.id);
  document.querySelector(`[data-id="${nearest.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
render();
