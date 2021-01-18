import Footer from "./Footer.js";
import NavbarOnTop from "./Navbar.js";
import SearchBar from "./SearchBar.js";
import { keyword } from "./SearchBar.js";
const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
  <link rel="stylesheet" href="./css/films.css"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  <div class="container">
    <navbar-filter></navbar-filter>
    <search-bar id="keyword"></search-bar>
    <film-list-search id="film-list-search"></film-list-search>
    <footer-div></footer-div>
  </div>
`;

export default class FilmComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$keyword = this.shadowRoot.getElementById("keyword");
    this.$SearchedFilmsList = this.shadowRoot.getElementById(
      "film-list-search"
    );
  }

  connectedCallback() {
    this.$SearchedFilmsList.addEventListener(
      "not-found-film-event",
      (event) => {
        this.$keyword.setAttribute('error', event.detail.message);
      }
    );

    this.$keyword.onSearchFilm = (value) => {
      // console.log(value);
      this.$SearchedFilmsList.setAttribute("value", value);
    };
  }
}

window.customElements.define("films-component", FilmComponent);
