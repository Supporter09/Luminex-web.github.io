import {getDataFromDoc, getDataFromDocs} from ".././utils.js"

const $template = document.createElement('template');
$template.innerHTML = /*html*/ `

        <style>    
            .fa-heart{
                color: pink;
                font-size: 40px;
            }

            .fa-user-plus {
                color: purple;
                font-size: 40px;
            }

            .fa-calendar {
                color: green;
                font-size: 40px;
            }
            .fab {
                font-size: 40px;
            }

            .fa-facebook-f {
                color: darkblue;
            }  

            .fa-twitter {
                color: lightblue;
            }

            .fa-vk {
                color: blue;
            }
            #statistic-number {
                color: rgb(255,255,255);
            }
            #statistic-info {
                color: rgb(255,255,255);
            }
            #plus-link {
                color: rgb(255,255,255);
                font-weight: bold;
            }
            #plus-button {
                color: rgb(255,255,255);
            }

        </style>


        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> 
        <script src="https://kit.fontawesome.com/af8c35088d.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        
        <div class="shadow-none p-4 mb-2 rounded" style="background-color: #3B3B3B;">
        <div class="row">
            <div class="col-lg-3">
                <span id="statistic-icon" class="bi bi-align-bottom"></span>
            </div>
        <div class="col-lg-8">
            <div>
                <h3 id="statistic-number"></h3>
            </div>
            <div id="statistic-info">
                
            </div>
            <div id="plus-link"></div>
        </div>
            <div class="col-lg-1" id="plus-button-controller">
                <div>
                    <span id="plus-button" class="btn btn-primary"></span>
                </div> 
            </div>
        </div>


        </div>
        <script src="https://kit.fontawesome.com/af8c35088d.js" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    `;

export default class StatisticData extends HTMLElement {
    constructor(class1, number, info, plus, link) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$statisticIcon = this.shadowRoot.getElementById('statistic-icon');
        this.$statisticNumber = this.shadowRoot.getElementById('statistic-number');
        this.$statisticInfo = this.shadowRoot.getElementById('statistic-info');
        this.$plusButton = this.shadowRoot.getElementById('plus-button');
        this.$modal = this.shadowRoot.getElementById('exampleModal');
        this.$plusLink = this.shadowRoot.getElementById('plus-link');
        this.$plusButtonController = this.shadowRoot.getElementById('plus-button-controller');

        this.setAttribute('class1', class1);
        this.setAttribute('number', number);
        this.setAttribute('info', info);
        this.setAttribute('plus', plus);
        this.setAttribute('plus-link', link);
        
        
    }

    static get observedAttributes () {
        return ['class1', 'number', 'info', 'plus-link' ,'plus'];
    }

    
    connectedCallback() {
        this.$plusButton.onclick = () => {
            let link = prompt('Mời bạn nhập vào đường dẫn: ');
            switch(this.$statisticIcon.className) {
                case 'fab fa-facebook-f':
                    this.checkPlusButton(link,'facebook.com/');
                    break;
                case 'fab fa-twitter':
                    this.checkPlusButton(link,'twitter.com/');
                    break;
                case 'fab fa-vk':
                    this.checkPlusButton(link,'vk.com/');
                    break;
            }
        }
    }

    attributeChangedCallback (attrName, oldValue, newValue) {
        switch(attrName) {
            case 'class1':
                this.$statisticIcon.className = newValue;
            break;

            case 'number':
                this.$statisticNumber.innerHTML = newValue;
            break;

            case 'info':
                this.$statisticInfo.textContent = newValue;

            case 'plus':
                this.$plusButton.className = newValue;

            case 'plus-link':
                this.$plusLink.innerHTML = newValue;
        }
    }

    async checkPlusButton(link, sign) {
        var fb = '';
        var twitter = '';
        var vk = '';
        if(link.toLowerCase().indexOf(sign) > -1)  {
            this.setAttribute('plus-link', link);
            switch(sign) {
                case 'facebook.com/':
                fb = link;
                break;
                case 'twitter.com/':
                twitter = link;
                break;
                case 'vk.com/':
                vk = link;
                break;
            }

            let result = await firebase.firestore().collection('users').where('email', '==', 'hieu@gmail.com').get();
            let realdata = getDataFromDocs(result.docs);
            let links = [realdata[0].linkFb, realdata[0].linkTwitter, realdata[0].linkVk];
            console.log(realdata[0].linkFb);
            if(links[0] == fb || fb == ''){
                fb = links[0];
            }

            if(links[1] == twitter || twitter == ''){
                twitter = links[1];
            }

            if(links[2] === vk || vk == ''){
                vk = links[2];
            }
            this.$plusLink.style.fontWeight = 'bold';
            firebase.firestore().collection('users').doc('JpgvpL0EetidNHoVXATz').update({
                linkFb: fb,
                linkTwitter: twitter,
                linkVk: vk
            });
        }else {
            alert('Bạn nhập sai định dạng đường dẫn!');
        }

    }
    linkMessage() {
        return this.$plusLink.innerHTML;
    }

}

window.customElements.define('statistic-data', StatisticData);