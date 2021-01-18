const $template = document.createElement('template');
$template.innerHTML= /*html*/ `
    
    <style>
        * {
            margin-left: 33px;
        }
    </style>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div>
        <navbar-filter></navbar-filter>
    </div><br/><br/>
    <div>
        <h3 style="color: rgb(255,255,255);">Profile</h3>
    </div>
    <div class="row">
        <div id="column1" class="col-lg-3">
            <avatar-wrapper></avatar-wrapper>
        </div>
        <div class="col-lg-4"> 
            <profile-manager></profile-manager>
        </div>

        <div class="col-lg-4">
            <personal-statistic></personal-statistic>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/af8c35088d.js" crossorigin="anonymous"></script>
`;

export default class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('user-profile', UserProfile);