import {getDataFromDoc, getDataFromDocs} from "../../js/utils.js";
const $template = document.createElement("template");

$template.innerHTML = /*html*/ `\
  <link rel="stylesheet" href ="./css/filmContainer.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">  
    <div class="card">
      <img class="card-img-top" src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg" alt="Film Image">
      <div class="card-body">
        <h5 class="card-title">marvasdadsdawdawdaddasdl</h5>
        <p class="card-text">this is the be asd asda sdst selling film ever I have seen in my life. Its characters is so good.</p>
      </div>
    </div>
`;

export default class FilmContainer extends HTMLElement {
  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$Image = this.shadowRoot.querySelector(".card-img-top");
    this.$filmName = this.shadowRoot.querySelector(".card-title");
    this.$dayRelase = this.shadowRoot.querySelector(".card-text");
    this.$card = this.shadowRoot.querySelector('.card');
    this.setAttribute("data", JSON.stringify(data));
  }

  static get observedAttributes(){
      return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue){
    if(attrName == "data"){
      let $filmInfo = JSON.parse(newValue);
      this.$Image.src = $filmInfo.img;
      this.$filmName.innerHTML = $filmInfo.name;
      this.$dayRelase.innerHTML = $filmInfo.birth_details;
    }
  }

   connectedCallback() {
    this.$card.onclick = () => {
      let name = this.$filmName.innerHTML;
      localStorage.setItem('name', name);
      // let result =  firebase.firestore().collection('FilmData').where('name', '==', '').get();
      // console.log(result);
      // let realdata = getDataFromDocs(result.docs);
      // console.log(realdata);
      window.location.href="#!/livefilm";
    }
  }

}


window.customElements.define("film-container", FilmContainer);
