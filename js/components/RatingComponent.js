const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./css/ratingComponent.css"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="row">
      <div class="col-sm-1 component">
      <h3 id="ranking"></h3>
      </div>
      <div class="col-sm-3 component">
        <img id="image" class="card-img-top" src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg" alt="Film Image">
      </div>
      <div class="col-sm-3 component">
        <h2 id="name"></h2>
      </div>
      <div class="col-sm-3 component">
        <h2 id="director"></h2>
      </div>
      <div class="col-sm-2 component">
        <h3 id="rating"></h3>
      </div>
    </div>
    `;

export default class RatingComponent extends HTMLElement {
  constructor(film, rank) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$ranking = this.shadowRoot.getElementById("ranking");
    this.$img = this.shadowRoot.getElementById("image");
    this.$name = this.shadowRoot.getElementById("name");
    this.$director = this.shadowRoot.getElementById("director");
    this.$rating = this.shadowRoot.getElementById("rating");
    this.setAttribute("film", film);
    this.setAttribute("rank", rank);
  }

  connectedCallback() {
    this.$name.onclick = () => {
      let name = this.$name.innerHTML;
      localStorage.setItem("name", name);
      window.location.href = "#!/livefilm";
    };

    this.$img.onclick = () => {
      let name = this.$name.innerHTML;
      localStorage.setItem("name", name);
      window.location.href = "#!/livefilm";
    };
  }

  static get observedAttributes() {
    return ["film", "rank"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "film") {
      let filmData = JSON.parse(newValue);
      this.$img.src = filmData.img;
      this.$name.innerHTML = filmData.name;
      this.$director.innerHTML = filmData.director;
      this.$rating.innerHTML = filmData.rating;
    } else if (attrName == "rank") {
      this.$ranking.innerHTML = newValue;
    }
  }
}

window.customElements.define("rating-component", RatingComponent);
