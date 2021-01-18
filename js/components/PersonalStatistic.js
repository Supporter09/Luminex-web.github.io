import StatisticData from "./StatisticData.js"
import {getDataFromDoc, getDataFromDocs} from ".././utils.js"

const $template = document.createElement('template')
$template.innerHTML = /*html*/ `
    <script src="https://kit.fontawesome.com/af8c35088d.js" crossorigin="anonymous"></script>
    <style>
        .social-media {
            text-align: center;
            font-weight: bold; 
            color: rgb(255,255,255);
        }
    </style>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/af8c35088d.js" crossorigin="anonymous"></script>
    <statistic-data number="2562" class1="fas fa-heart" info="Likes delivered for all time" plus-link=""></statistic-data>
    <statistic-data number="15" class1="fas fa-user-plus" info="New users invited" plus-link=""></statistic-data>
    <statistic-data number="329" class1="fa fa-calendar" info="Days since registration" plus-link=""></statistic-data><br/>
    <div>
        <p class="social-media" >Social Media</p>
    </div>
    <div id="link"></div>
`

export default class PersonalStatistic extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$link = this.shadowRoot.getElementById('link');
        this.$linkFacebook = this.shadowRoot.getElementById('link-facebook');
    }
    
    async connectedCallback() {
        let result = await firebase.firestore().collection('users').where('email', '==', 'hieu@gmail.com').get();
        let realdata = getDataFromDocs(result.docs);
        let links = [realdata[0].linkFb, realdata[0].linkTwitter, realdata[0].linkVk];
            let $statisticData = new StatisticData('fab fa-facebook-f', '', 'Facebook', 'fas fa-plus', links[0]);
            let $statisticData2 = new StatisticData('fab fa-twitter', '', 'Twitter', 'fas fa-plus', links[1]);
            let $statisticData3 = new StatisticData('fab fa-vk', '', 'Vkontakte', 'fa fa-plus', links[2]);
            let statisticDataFinal = [$statisticData, $statisticData2, $statisticData3];
            for(let i = 0; i < statisticDataFinal.length; i++) {
                this.$link.appendChild(statisticDataFinal[i]);
            }        
    }
}



window.customElements.define('personal-statistic', PersonalStatistic);