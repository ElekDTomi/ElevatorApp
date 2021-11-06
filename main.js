for (let i = 0; i < 7; i++) {
  document.querySelector(`.btn${i}`).addEventListener("click", () => {
    addOrder(i);
  });
}
const elevator = document.querySelector(".elevator");
const display = document.querySelector(".display p");
let prevfloor = 0;
let prevMove;
let order = [];
let switchLet = true;

elevator.addEventListener("transitionend", () => {
  switchLet = true;
});

function addOrder(x) {
  if (order[order.length - 1] != x) {
    order.push(x);
    console.log(order);
    document.querySelector(`.btn${x}`).setAttribute("disabled", "");
  }
}

setInterval(controller, 500);

function controller() {
  if (order.length != 0 && switchLet == true) {
    let floor = order.shift();
    move(floor);
    switchLet = false;
  }
}

function move(floor) {
  console.log(floor);
  let floorMove = prevfloor - floor;
  floorMove = Math.abs(floorMove);

  elevator.classList.remove(`move${prevMove}`);
  elevator.classList.add(`move${floorMove}`);

  prevMove = floorMove;

  elevator.classList.add(`floor${floor}`);
  elevator.classList.remove(`floor${prevfloor}`);

  document.querySelector(`.btn${prevfloor}`).removeAttribute("disabled");

  prevfloor = floor;
  if (floor == 0) {
    floor = "T";
  }
  display.innerHTML = floor;
  controller();
}
