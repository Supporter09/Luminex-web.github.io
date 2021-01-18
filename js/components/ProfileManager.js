import InputComponent from "./InputComponent.js";
import {getDataFromDoc, getDataFromDocs} from "../utils.js";

const $template = document.createElement('template')
$template.innerHTML = /*html*/ `
        <style>
            #saveChangesWrapper {
                display: flex; 
                justify-content: center;
            }
        </style>

        <div id="profile-manager">
        </div>

        <form id="profile-form">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <input-component id="new-password" label="New Password" content="" type1="password" error=""></input-component>
        <input-component id="confirm-new-password" label="Confirm New Password" content="" type1="password" error=""></input-component><br/>
        
        <div id="general-error">
        </div>

        <div id="saveChangesWrapper">
            <button id="update-info" class="btn btn-light" style="border: solid black 1.5px;">Save Changes</button>
        </div>
        </form>
        <script src="https://kit.fontawesome.com/af8c35088d.js" crossorigin="anonymous"></script>
`;

export default class ProfileManager extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$profileManager = this.shadowRoot.getElementById('profile-manager');
        this.$newPassword = this.shadowRoot.getElementById('new-password');
        this.$confirmNewPassword = this.shadowRoot.getElementById('confirm-new-password');
        this.$profileForm = this.shadowRoot.getElementById('profile-form');
        this.$generalError = this.shadowRoot.getElementById('general-error');

    }

    async connectedCallback() {
        this.personalProfile();
        this.newPassword = this.$newPassword.value();
        this.$profileForm.onsubmit = async (event) => {
            event.preventDefault();
            let notNull = (InputComponent.validate(this.$newPassword, (value) => value != '' ,'Mật khẩu mới không được trống') 
            & InputComponent.validate(this.$confirmNewPassword, (value) => value != '', 'Xác nhận mật khẩu mới không được trống'))

            if(notNull) {
                let checkEqual = InputComponent.validate(this.$confirmNewPassword, (value) => value == this.$newPassword.value(), 'Mật khẩu mới và xác nhận mật khẩu không trùng nhau');
                if(checkEqual == true) {
                    this.$confirmNewPassword.error('Đổi mật khẩu thành công');
                    let result = this.$confirmNewPassword.colorError();
                    console.log(result);
                    firebase.firestore().collection('users').doc('JpgvpL0EetidNHoVXATz').update({
                        password: CryptoJS.MD5(this.$confirmNewPassword.value()).toString()
                    });
                }
            }
        };
  
    }

    async personalProfile() {
        let rawuserData = await firebase.firestore().collection("users").where("email", "==", "hieu@gmail.com").get();
        let realdata = getDataFromDocs(rawuserData.docs);
        let label_arr = ["Name", "Nickname", "E-mail", "Primary Password"];
        let realdata_arr = [realdata[0].name, realdata[0].nickname, realdata[0].email, ''];
        
        for(let i =0; i < realdata_arr.length; i++) {
            let $inputComponent = new InputComponent(realdata_arr[i], label_arr[i]);
            this.$profileManager.appendChild($inputComponent);
        }
    }
}

window.customElements.define('profile-manager', ProfileManager);