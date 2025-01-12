'use strict';

let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY';
/* utils */

function loadData() {
  const habbitsString = localStorage.getItem(HABBIT_KEY);
  const habbitArray = JSON.parse(habbitsString);
  if (Array.isArray(habbitArray)) {
    habbits = habbitArray;
  }
}

function saveData() {
  localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

/* render */
function rerenderMenu(activeHabbitId) {
  if (!activeHabbitId) {
    return;
  }
  for (const habbit of habbits) {
  }
}

/* init */
(() => {
  loadData();
})();
