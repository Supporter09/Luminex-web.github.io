import FilmContainer from "./FilmContainer.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
  <link rel="stylesheet" href="./css/filmList.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  <div id="label" class="container">New film</div>
  <div class="container" id="film-list">
  </div>
`;

export default class FilmList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    
    this.$filmList = this.shadowRoot.getElementById("film-list");
  }

  static get observedAttributes(){
    return ["film-list"];
  }
  // Lọc film rồi gán
  attributeChangedCallback(attrName, oldValue, newValue){
    if(attrName == "film-list"){
      let filmDatas = JSON.parse(newValue);
      for(let filmData of filmDatas){
        let $filmData = new FilmContainer(filmData);
        this.$filmList.appendChild($filmData);
      }
    }
  }

}

window.customElements.define("film-list", FilmList);
