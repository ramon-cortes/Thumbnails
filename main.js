import { data } from "./data.js";
let staticView = false;
const original = document.getElementById('original');
const finished = document.getElementById('finished');
const highlights = document.getElementById('highlights');

//console.log(data);

function getRandom() {
  return Math.round(Math.random() * (data.length - 1));
}


function staticToggle() {
  const staticDiv = document.getElementById('static');
  if (staticView) {
    staticDiv.classList.remove('static-enabled');
  } else {
    staticDiv.classList.add('static-enabled');
  }
  staticView = !staticView;
}
document.getElementById('static').addEventListener('click', staticToggle);

function run() {
  if (!staticView) {
    original.innerHTML = '';
    finished.innerHTML = '';
    highlights.innerHTML = '';
    highlights.classList.remove('img-activate')

    const index = getRandom();
    original.innerHTML = `<img id="img-original" src="${data[index].original}">`;
    finished.innerHTML = `<img id="img-finished" src="${data[index].finished}">`;  
    const ul = document.createElement('ul');
    ul.id = 'highlight-list';
    for (let i = 0; i < data[index].highlights.length; i++) {
      const li = document.createElement('li');
      li.innerText = data[index].highlights[i];
      ul.appendChild(li);
    }
    highlights.appendChild(ul);

    setTimeout(() => document.getElementById('img-original').classList.add('img-activate'), 300);
    setTimeout(() => document.getElementById('img-finished').classList.add('img-activate'), 1800);
    setTimeout(() => highlights.classList.add('img-activate'), 3100);
  } else {
    //AQUÍ:
    original.innerHTML = 'PÁGINA ESTÁTICA AQUÍ';
    finished.innerHTML = '';
    highlights.innerHTML = '';
  }

  

}

run();
let id = setInterval(run, 9000);
