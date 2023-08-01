import { data } from "./data.js";
const state = {
  staticView: false,
  line: data.length - 1
}
let staticView = false;
const original = document.getElementById('original');
const finished = document.getElementById('finished');
const highlights = document.getElementById('highlights');
const staticDiv = document.getElementById('static-div');

//console.log(data);

function getRandom() {
  return Math.round(Math.random() * (data.length - 1));
}

function makeUl(i) {
  const ul = document.createElement('ul');
  ul.id = 'highlight-list';
  for (let j = 0; j < data[i].highlights.length; j++) {
    const li = document.createElement('li');
    li.innerText = data[i].highlights[j];
    ul.appendChild(li);
  }
  return ul;
}


function staticToggle() {
  const staticDiv = document.getElementById('static');
  if (state.staticView) {
    staticDiv.classList.remove('static-enabled');
  } else {
    staticDiv.classList.add('static-enabled');
  }
  state.staticView = !state.staticView;
}
document.getElementById('static').addEventListener('click', staticToggle);

function run() {
  if (!state.staticView) {
    staticDiv.innerHTML = '';
    original.innerHTML = '';
    finished.innerHTML = '';
    highlights.innerHTML = '';
    highlights.classList.remove('img-activate')

    //const index = getRandom();
    original.innerHTML = `<img id="img-original" src="${data[state.line].original}">`;
    finished.innerHTML = `<img id="img-finished" src="${data[state.line].finished}">`;    
    highlights.appendChild(makeUl(state.line));

    // Temporizador
    setTimeout(() => document.getElementById('img-original').classList.add('img-activate'), 200);
    setTimeout(() => document.getElementById('img-finished').classList.add('img-activate'), 1200);
    setTimeout(() => highlights.classList.add('img-activate'), 2200);

    state.line > 0 ? state.line-- : state.line = data.length - 1;
    
  } else {
    // Vista estática
    original.innerHTML = '';
    finished.innerHTML = '';
    highlights.innerHTML = '';
    staticDiv.innerHTML = '';
    const table = document.createElement('table');

    for (let i = data.length - 1; i >= 0; i--) {
      const tr = table.insertRow();
      const cell1 = tr.insertCell();
      cell1.innerHTML = `<img class="img-activate" src="${data[i].original}"><br>`;
      const cell2 = tr.insertCell();
      cell2.innerHTML = `<img class="img-activate" src="${data[i].finished}"><br>`;
      cell1.className = 'table-photos';
      cell2.className = 'table-photos';
      const cell3 = tr.insertCell();
      cell3.appendChild(makeUl(i));
      cell3.className = 'table-highlights';
    }
    staticDiv.appendChild(table);    
  }
}

run();
let id = setInterval(run, 7000);
