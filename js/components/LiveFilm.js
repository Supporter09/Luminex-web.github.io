import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import RecommendContainer from "./RecommendContainer.js";
import { getDataFromDoc, getDataFromDocs } from "../../js/utils.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./css/liveFilm.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <navbar-filter></navbar-filter>
    <div class="container">
        <div class="row">
            <div class="col-lg-9" style="height: 80vh;">
                <iframe id="film" src="" width="100%" height="100%"></iframe>
                <div id="nameAndRating">
                  <p id="name"></p>
                  <button id="rating-btn" type="button" class="btn btn-light">Vote!</button>
                </div>
                <div><p id="date"></p></div>
                <div><p id="bio"></p></div>
            </div>
            <div class="col-lg-3">
                <div>
                    <h3 style="color: rgb(255,255,255);">Recommend</h3>
                </div>
                <recommend-container id="recommend-container"></recommend-container>
            </div>
        </div>
    </div>
    `;

export default class LiveFilm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$name = this.shadowRoot.getElementById("name");
    this.$date = this.shadowRoot.getElementById("date");
    this.$bio = this.shadowRoot.getElementById("bio");
    this.$ratingbtn = this.shadowRoot.getElementById("rating-btn");
    this.$recommendContainer = this.shadowRoot.getElementById(
      "recommend-container"
    );
  }

  connectedCallback() {
    let name = localStorage.getItem("name");
    console.log(name);
    this.setAttribute("name", name);

    this.$recommendContainer.addEventListener("film-change-event2", (event) => {
      name = event.detail.message;
      console.log(name);
      this.setAttribute("name", name);
    });

    this.$ratingbtn.onclick = async () => {
      let result = await firebase
        .firestore()
        .collection("FilmData")
        .where("name", "==", name)
        .get();
      let realdata = getDataFromDocs(result.docs);
      // hàm tăng giá trị lên 1
      const increment = firebase.firestore.FieldValue.increment(1);
      const storyRef = await firebase
        .firestore()
        .collection("FilmData")
        .doc(`${realdata[0].id}`)
        .update({
          rating: increment,
        });
      console.log(`${name} + 1`);
      this.$ratingbtn.disabled = true;
    };
  }

  static get observedAttributes() {
    return ["name"];
  }

  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "name") {
      let result = await firebase
        .firestore()
        .collection("FilmData")
        .where("name", "==", newValue)
        .get();
      let realdata = getDataFromDocs(result.docs);
      this.$film = this.shadowRoot.getElementById("film");
      this.$film.src = realdata[0].film_url;
      this.$name.innerHTML = realdata[0].name;
      this.$date.innerHTML = realdata[0].birth_details;
      this.$bio.innerHTML = realdata[0].bio;
      console.log(realdata[0].film_url);
      console.log(this.$film.src);
      window.scroll(0, 0);
      this.$ratingbtn.disabled = false;
    }
  }
}

window.customElements.define("live-film", LiveFilm);
