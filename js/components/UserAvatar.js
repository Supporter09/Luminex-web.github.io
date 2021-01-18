const $template = document.createElement('template');
$template.innerHTML= /*html*/ `
    <style>
        .column1{
            margin-left: 10px;
        }
        .avatar {
            height: 300px;
            width: 300px;
        }
        .avatar-container {
            display: flex;
            justify-content: center;
        }

        .input-avatar-container{
            display: flex;
            justify-content: center;
            margin-top: 5px;
        }

        #avatar-label {
            color: rgb(255,255,255);
        }
    </style>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <div class="avatar-container shadow-none p-3 bg-grey rounded" style="opacity: 0.9;">
        <img id="avatar" width="300" height="100" src="" class="avatar">
        
    </div>
    <div class="input-avatar-container">
        <h6 id="avatar-label" style="display: block;"></h6>
    </div><br/><br/>
    <div>
        <footer-div></footer-div>
    </div>
`;

export default class UserAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$avatar = this.shadowRoot.getElementById('avatar');
        this.$avatarLabel = this.shadowRoot.getElementById('avatar-label');
    }
    static get observedAttributes () {
        return ['avatar', 'label'];
    }

    
    attributeChangedCallback (attrName, oldValue, newValue) {
        if(attrName == 'avatar') {
            this.$avatar.src = newValue;
        }else if(attrName == 'label'){
            this.$avatarLabel.innerHTML = newValue;
        }
    }
}



window.customElements.define('user-avatar', UserAvatar);