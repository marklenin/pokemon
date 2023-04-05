let API = "https://pokeapi.co/api/v2/pokemon";
let container = document.querySelector(".container");
let modal = document.querySelector(".modal");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let every = document.querySelector(".every");
let countt = document.querySelector(".count");
let count = 1;

let nextvar = "";
let prevvar = "";

async function getFromApi(link = API) {
  container.innerHTML = "";
  let res = await fetch(link);
  let data = await res.json();
  let info = data.results;
  //   console.log(info);
  info.forEach((a, index) => {
    let info = "";
    fetch(a.url)
      .then((res) => res.json())
      .then((inf) => {
        container.innerHTML += `
        <div  onclick="getInfo(${index})" class="every one" >
        <img src="${inf.sprites.front_default}" alt="#">
          <div class="word">${a.name}</div>
          </div>`;

        // a.addEventListener("mouseover", async function () {
        //   inf.sprites.front_default.style.width = "110%";
        // });
      });

    // console.log(info);
  });
  countt.innerHTML = count;
}
getFromApi();

async function getInfo(index) {
  modal.style.display = "block";
  let res = await fetch(API);
  let data = await res.json();
  let info = data.results;
  fetch(info[index].url)
    .then((res) => res.json())
    .then((data) => {
      modal.innerHTML = "";
      let buck = [];
      data.types.forEach((a) => {
        buck.push(a.type.name);
      });
      modal.innerHTML += `
      <div class="eachChar">
        <img src="${data.sprites.front_default}" height=170 width=170>
        <div class="information">
        <h1>${data.name}</h1>
        <p>type : ${buck.join(", ")}</p>
        <p>height: ${data.height}</p>
        <p>weight: ${data.weight}</p>
        <div>
        <button onclick="closeModal()">X</button>
        <div>`;
      //   console.log(buck);
    });
}

function closeModal() {
  modal.style.display = "none";
}

async function nex(click) {
  //   container.innerHTML = "";
  modal.style.display = "none";
  let res = await fetch(API);
  let data = await res.json();
  nextvar = data.next;
  if (nextvar == null) {
    alert("no next page!!!, enter the previous button ;)");
    return;
  }
  API = nextvar;
  count++;
  getFromApi(nextvar);
  //   console.log(nextvar);
}

async function pre(click) {
  //   container.innerHTML = "";
  modal.style.display = "none";

  let res = await fetch(API);
  let data = await res.json();
  prevvar = data.previous;
  if (prevvar == null) {
    alert("no prev page!!!, enter the next button ;)");
    return;
  }
  API = prevvar;
  count--;
  getFromApi(prevvar);
}

next.addEventListener("click", nex);
prev.addEventListener("click", pre);

// console.log(nextvar);
