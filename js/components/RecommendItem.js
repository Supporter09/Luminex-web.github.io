const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./css/recommendItem.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <div id="container" class="shadow-none p-4 mb-2 bg-light rounded">
        <div>
            <img id="film-image" src="" alt="imagine" width="200" height="150">
        </div>
        <div>
            <h3 id="film-name">Frozen</h3>
        </div>
    </div>
`;

export default class RecommendItem extends HTMLElement {
  constructor(recommendedFilmData) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$card = this.shadowRoot.getElementById("container");
    this.$filmImage = this.shadowRoot.getElementById("film-image");
    this.$filmName = this.shadowRoot.getElementById("film-name");

    this.setAttribute("recommended-film", recommendedFilmData);
  }

  connectedCallback() {
    this.$card.onclick = () => {
      let name = this.$filmName.innerHTML;
      localStorage.setItem("name", name);
      let FilmChangeEvent1 = new CustomEvent("film-change-event1", {
        bubbles: true,
        detail: {
          message: `${name}`,
        },
      });
      this.dispatchEvent(FilmChangeEvent1);
    };
  }

  static get observedAttributes() {
    return ["recommended-film"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "recommended-film") {
      let filmData = JSON.parse(newValue);
      console.log("hung");
      this.$filmImage.src = filmData.img;
      this.$filmName.innerHTML = filmData.name;
    }
  }
}

window.customElements.define("recommend-item", RecommendItem);
