// add task on submit

var myForm = document.getElementById("form");
var inputVal = document.getElementById("textVal");
var progress = document.querySelector('[data-type="progress"]');

let idnum = 1;
var elementID = `dragTarget-${idnum}`;

window.onload = function () {
  const layout = JSON.parse(localStorage.getItem("dragDropLayout"));
  if (!layout) return;

  for (const zoneId in layout) {
    const zone = document.getElementById(zoneId);
    layout[zoneId].forEach((item) => {
      zone.insertAdjacentHTML("beforeend", item.html);
    });
  }
};

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
  inputVal.value = "";
});

function addTask() {
  var cartona = `<li
  ondragstart="dragStart(event)"
            draggable="true"
            id=${`dragTarget-${idnum++}`}
            >
            ${inputVal.value}
            </li>`;
  progress.insertAdjacentHTML("beforeend", cartona);
  saveLayout({id:},name:value,html:'inprogress');
}

// implement drag and drop

function dragStart(event) {
  event.dataTransfer.setData("Text", elementID);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("Text");
  const element = document.getElementById(data);

  event.target.appendChild(element);

  saveLayout(); // save after drop
}

function saveLayout() {
  const zones = document.querySelectorAll(".droptarget");
  console.log(zones);

  const layout = { id: child.id, html: child.outerHTML };

  // zones.forEach((zone) => {
  //   const items = Array.from(zone.children).map((child) => ({
  //     id: child.id,
  //     html: child.outerHTML,
  //   }));

  //   layout[zone.id] = items;
  // });
  console.log(layout);
  localStorage.setItem("dragDropLayout", JSON.stringify(layout));
}
