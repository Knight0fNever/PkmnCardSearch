let ourRequest = new XMLHttpRequest();
let loadBtn = document.getElementById("loadBtn");
let searchForm = document.getElementById("searchForm");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
prevBtn.hidden = true;
nextBtn.hidden = true;

let page = 1;
let prevPageNum = 0;
let nextPageNum = page + 1;

function load(query) {
  ourRequest.open("GET", query);
  ourRequest.onload = function() {

    let data = JSON.parse(ourRequest.responseText);
    let headers = ourRequest.getResponseHeader("link");
    let links = "";
    if (headers.length > 1) {
      nextBtn.hidden = false;
      links = parse_link_header(headers);
      let prevLink = links.last;
      let nextLink = links.next;
      // console.log('Next Page: ' + nextLink);
      // console.log('Prev Page: ' + prevLink);

    } else {
      console.log("Only 1 page.");
      nextBtn.hidden = true;
    }
    createHTML(data);

    [].forEach.call(document.querySelectorAll("img[data-src]"), function(img) {
      img.setAttribute("src", img.getAttribute("data-src"));
      img.onload = function() {
        img.removeAttribute("data-src");
      };
    });
  };
  ourRequest.send();
}

loadBtn.addEventListener("click", () => {
  load(queryBuilder(1));
});


prevBtn.addEventListener("click", () => {
  load(queryBuilder(parseInt(prevPageNum)));
  nextPageNum--;
  prevPageNum = nextPageNum - 1;
  if(prevPageNum < 1) {
    prevBtn.hidden = true;
  }
  console.log('Next Page: ' + nextPageNum);
  console.log('Prev. Page: ' + prevPageNum);
});

nextBtn.addEventListener("click", () => {
  load(queryBuilder(parseInt(nextPageNum)));
  nextPageNum++;
  prevPageNum = nextPageNum - 2;
  prevBtn.hidden = false;
  console.log('Next Page: ' + nextPageNum);
  console.log('Prev. Page: ' + prevPageNum);
});

function getPageNumbers(variable, url) {
  let uri = url.split('&');
  for(let i = 0; i < uri.length; i++) {
    let pair = uri[i].split('=');
    if(decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable)
}

function queryBuilder(page) {
  let baseURL = "https://api.pokemontcg.io/v1/cards?";
  let nameValue = "name=" + searchForm.elements.namedItem("name").value;
  let pokedexNumberValue =
    "nationalPokedexNumber=" +
    searchForm.elements.namedItem("pokedexNumber").value;
  let typesValue = "types=" + searchForm.elements.namedItem("types").value;
  let hpValue = "hp=" + searchForm.elements.namedItem("hp").value;
  let setNumber = "number=" + searchForm.elements.namedItem("setNumber").value;
  let attackDamage =
    "attackDamage=" + searchForm.elements.namedItem("attackDamage").value;
  let weaknesses =
    "weaknesses=" + searchForm.elements.namedItem("weakness").value;
  let resistances =
    "resistances=" + searchForm.elements.namedItem("resistances").value;
  let abilityName =
    "abilityName=" + searchForm.elements.namedItem("abilityName").value;
  let pageVal = "page=" + page;

  let result =
    baseURL +
    nameValue +
    "&" +
    pokedexNumberValue +
    "&" +
    typesValue +
    "&" +
    hpValue +
    "&" +
    setNumber +
    "&" +
    attackDamage +
    "&" +
    weaknesses +
    "&" +
    resistances +
    "&" +
    abilityName + 
    "&" +
    pageVal;
  // console.log(result);
  return result;
}

function createHTML(cards) {
  // console.log(cards.length);
  let rawTemplate = document.getElementById("entry-template").innerHTML;
  let compiledTemplate = Handlebars.compile(rawTemplate);
  let generatedHTML = compiledTemplate(cards);

  let imgContainer = document.getElementById("img-container");
  imgContainer.innerHTML = generatedHTML;
}

function pagination() {}

function parse_link_header(header) {
  if (header.length === 0) {
    throw new Error("input must not be of zero length");
  }

  // Split parts by comma
  var parts = header.split(",");
  var links = {};
  // Parse each part into a named link
  for (var i = 0; i < parts.length; i++) {
    var section = parts[i].split(";");
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, "$1").trim();
    var name = section[1].replace(/rel="(.*)"/, "$1").trim();
    links[name] = url;
  }
  return links;
}

let nameBar = document.getElementById("name");

nameBar.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    loadBtn.click();
  }
});
