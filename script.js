// add task on submit

var myForm = document.getElementById("form");
var inputVal = document.getElementById("textVal");
var progress = document.querySelector('[data-type="progress"]');

window.onload = function () {
  const layout = JSON.parse(localStorage.getItem("dragDropLayout"));
  if (!layout) return;

  for (const zoneId in layout) {
    const zone = document.querySelector(`[data-type="${zoneId}"]`);
    layout[zoneId].forEach((item) => {
      zone.insertAdjacentHTML("beforeend", item.html);
    });
  }
};

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
  saveLayout();
  inputVal.value = "";
});

function addTask() {
  const taskId = `dragTarget-${Date.now()}`; // Use Date.now() for unique ID

  var cartona = `<li
  ondragstart="dragStart(event)"
            draggable="true"
            id=${taskId}
            >
            ${inputVal.value}
            </li>`;
  progress.insertAdjacentHTML("beforeend", cartona);
  // saveLayout({id:},name:value,html:'inprogress');
}

// implement drag and drop

function dragStart(event) {
  event.dataTransfer.setData("Text", event.currentTarget.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("Text");
  const element = document.getElementById(data);

  let dropZone = event.target;
  while (dropZone && !dropZone.classList.contains("droptarget")) {
    dropZone = dropZone.parentElement;
  }

  if (dropZone) {
    dropZone.appendChild(element);
    saveLayout(); // save after drop
  }
}

function saveLayout() {
  const zones = document.querySelectorAll(".droptarget");

  const layout = {};

  zones.forEach((zone) => {
    const type = zone.getAttribute("data-type");
    const items = Array.from(zone.children).map((child) => ({
      id: child.id,
      html: child.outerHTML,
    }));

    layout[type] = items;
  });

  localStorage.setItem("dragDropLayout", JSON.stringify(layout));
}
