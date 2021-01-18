const $templatePopularFilm = document.createElement("template");
import {
  getDataFromFirebase,
  getDataFromDoc,
  getDataFromDocs,
} from "../utils.js";

$templatePopularFilm.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./css/popularFilm.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <div class="container" id="label">Most popular</div>
    <div id="popular-container" class="container">
      <div class="row">
        <div id="imgBox" class="col-sm-5">
          <img id="image" src="http://dummyimage.com/300x300.bmp/5fa2dd/ffffff" alt="" witdh="" height="">
        </div>
        
        <div id="filmInformation" class="col-sm-7">
          <h1 id="name-popular-film"></h1>
          <p id="description"></p>
          <p id="release"></p>
        </div>
      </div>
    </div>
`;

export default class PopularFilm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($templatePopularFilm.content.cloneNode(true));
    this.$card = this.shadowRoot.getElementById("popular-container");
    this.$name = this.shadowRoot.getElementById("name-popular-film");
    this.$description = this.shadowRoot.getElementById("description");
    this.$release = this.shadowRoot.getElementById("release");
    this.$image = this.shadowRoot.getElementById("image");
  }

  connectedCallback() {
    this.$card.onclick = () => {
      let name = this.$name.innerHTML;
      localStorage.setItem("name", name);
      window.location.href = "#!/livefilm";
    };
  }

  static get observedAttributes() {
    return ["film-data", "src"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "film-data") {
      let filmDatas = JSON.parse(newValue);
      let theMostPopularFilm = filmDatas[0];
      let ratingOfPopularFilm = theMostPopularFilm.rating;
      for (let filmData of filmDatas) {
        //* lấy ra thông tin film dc nhiều rate nhất.
        if (filmData.rating > ratingOfPopularFilm) {
          ratingOfPopularFilm = filmData.rating;
          theMostPopularFilm = filmData;
        }
      }
      console.log(theMostPopularFilm);
      //* xử lí thông tin sau khi lấy được theMostPopularFilm
      this.$image.src = theMostPopularFilm.img;
      this.$description.innerHTML = theMostPopularFilm.bio;
      this.$release.innerHTML = theMostPopularFilm.birth_details;
      this.$name.innerHTML = theMostPopularFilm.name;
    }
  }
}

window.customElements.define("popular-film", PopularFilm);
