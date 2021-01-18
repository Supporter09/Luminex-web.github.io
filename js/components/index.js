import PopularFilm from "./PopularFilm.js";
import Footer from "./Footer.js";
import NavbarOnTop from "./Navbar.js";
import FilmContainer from "./FilmContainer.js";
import FilmList from "./FilmList.js";
import { getDataFromDocs, getDataFromFirebase } from "../utils.js";

const $templateContainer = document.createElement("template");

$templateContainer.innerHTML = /*html*/ `
  <link rel=stylesheet href="./css/index.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">  
  <br></br>
  <br></br>
  <div id="container">
    <navbar-filter></navbar-filter>
    <popular-film></popular-film>
    <film-list></film-list>
    <footer-div></footer-div>
  </div>
  <br></br>
`;

export default class ContainerBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($templateContainer.content.cloneNode(true));
    this.$popularFilm = this.shadowRoot.querySelector("popular-film");
    this.$listFilm = this.shadowRoot.querySelector("film-list");
  }

  async connectedCallback() {
    let dataFilm = await getDataFromFirebase();
    dataFilm = getDataFromDocs(dataFilm);
    this.$popularFilm.setAttribute("film-data", JSON.stringify(dataFilm));
    this.$listFilm.setAttribute("film-list", JSON.stringify(dataFilm));
  }
}

window.customElements.define("container-box", ContainerBox);