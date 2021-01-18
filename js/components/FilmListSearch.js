import { getDataFromDoc, getDataFromDocs, getDataFromFirebase } from "../utils.js";
import FilmContainer from "./FilmContainer.js";
const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
  <link rel="stylesheet" href="./css/filmListSearch.css">
  <div id="filmListSearch">
  </div>
`;

export default class FilmListSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$filmListSearch = this.shadowRoot.getElementById('filmListSearch');
  }

  async connectedCallback(){
    let filmData = await getDataFromFirebase();
        for(let film of filmData){
          let $film = new FilmContainer(getDataFromDoc(film));
          this.$filmListSearch.appendChild($film);
        }
  }

  static get observedAttributes(){
    return ["value"];
  }
  
  async attributeChangedCallback(attrName, oldValue, newValue){
    if(attrName = 'value'){
      this.$filmListSearch.innerHTML = "";
      if(newValue == ""){
        console.log('Thanh tìm kiếm trống');
        let filmData = await getDataFromFirebase();
        for(let film of filmData){
          let $film = new FilmContainer(getDataFromDoc(film));
          this.$filmListSearch.appendChild($film);
        }
      }
      else{
        this.$filmListSearch.innerHTML = "";
        console.log(newValue);
        let filmData = await getDataFromFirebase();
        let checkInputValueValidate = true;
        for(let film of filmData){
          if(getDataFromDoc(film).name.toLowerCase().includes(newValue.toLowerCase())){
            let $film = new FilmContainer(getDataFromDoc(film));
            this.$filmListSearch.appendChild($film);
            checkInputValueValidate = false;
          }
        }

        if(checkInputValueValidate){
          let filmData = await getDataFromFirebase();
          for(let film of filmData){
            let $film = new FilmContainer(getDataFromDoc(film));
            this.$filmListSearch.appendChild($film);
          }

          let notFoundFilmEvent = new CustomEvent('not-found-film-event', {
            bubbles: true,
            detail: {
              message: "Không tìm thấy phim"
            }
          });
          this.dispatchEvent(notFoundFilmEvent);

        }
      }
    }
  }
}

window.customElements.define("film-list-search", FilmListSearch);
