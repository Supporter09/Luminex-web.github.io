const $templateFooter = document.createElement("template");

$templateFooter.innerHTML = /*html*/ `
  <link rel="stylesheet" href="./css/footer.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  <nav class="navbar fixed-bottom navbar-dark bg-dark">
    <a id="name-product">A product by Team3</a>
    <a class="navbar-brand" href="#!/">Netflix</a>
  </nav>
`;

export default class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($templateFooter.content.cloneNode(true));
  }
}

window.customElements.define("footer-div", Footer);
