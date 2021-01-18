const $template = document.createElement('template');
$template.innerHTML= /*html*/ `
    <style>
    #error-message {
        color: red;
    }
    input {
        opacity: 0.93;
    }

    </style>


    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div id="input-component">
            <div id="input-label" style="color: lightgrey;"></div>
        <div class="input-group input-group-lg mb-3">
            <input type="text" id="input-content" class="form-control" required>
        </div>
        <div>
            <p id="error-message"></p>
        </div>
    </div>
`;

 
export default class InputComponent extends HTMLElement{
    constructor(content, label, type) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$inputComponent = this.shadowRoot.getElementById('input-component');
        this.$inputLabel = this.shadowRoot.getElementById('input-label');
        this.$inputContent = this.shadowRoot.getElementById('input-content');
        this.$errorMessage = this.shadowRoot.getElementById('error-message');

        this.setAttribute('label', label)
        this.setAttribute('content', content);
        this.setAttribute('type', type);
    }
    static get observedAttributes () {
        return ['label', 'content', 'type1', 'error'];
    }

    attributeChangedCallback (attrName, oldValue, newValue) {
        switch(attrName) {
            case 'label': 
                this.$inputLabel.innerHTML = newValue;
                break;

            case 'content':
                this.$inputContent.value = newValue;
                break;
            
            case 'type1':
                this.$inputContent.type = newValue;

            case 'error':
                this.$errorMessage.innerHTML = newValue;

        }
    }

    value() {
        return this.$inputContent.value;
    }

    error(message) {
        this.setAttribute('error', message);
    }

    colorError(){
        this.$errorMessage.style.color = "#8bc34a";
        this.$errorMessage.style.fontWeight = "bold";
    }

    static validate($inputComponent, condition, message) {
        let value = $inputComponent.value();
        if(condition(value)) {
           $inputComponent.error('');
           return true;
        }else {
            $inputComponent.error(message);
            return false;
        }
    }
}

window.customElements.define('input-component', InputComponent);