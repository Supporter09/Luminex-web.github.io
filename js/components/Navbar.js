const $templateNavbar = document.createElement("template");
$templateNavbar.innerHTML = /*html */ `
  
  <link rel="stylesheet" href="./css/navbar.css"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  
  <nav class="navbar navbar-expand-md fixed-top" >
    <a class="navbar-brand" href="#!/">Luminex</i></a>
    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <a href="#!/films" class="nav-link">Films</a>
        </li>
        <li class="nav-item">
          <a href="#!/ranking" class="nav-link">Ranking</a>
        </li>
        <li class="nav-item">
          <a id="news" href="#" class="nav-link">News</a>
        </li>
        <li class="nav-item">
          <a id="more" href="#" class="nav-link">More</a>
        </li>
        <button type="button" id="login-btn" class="btn btn-outline-light btn-sm" ><a href="#!/sign-in" style="text-decoration: none;">Login</a></button>
        <button type="button" id="logout-btn" class="btn btn-outline-light btn-sm" ><a href="#!/sign-in" style="text-decoration: none;">Log Out</a></button>
      </ul>
      <a href="#!/profile"><img src="" alt="" id="user-avatar" class=""></a>
      <p id="greeting" style="margin-bottom: 0px;padding-left: 20px;"></p>
    </div>
  </nav>
 
`;

//* shadowDOM
export default class NavbarOnTop extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild($templateNavbar.content.cloneNode(true));
    this.$sign_in_btn = this.shadowRoot.getElementById("login-btn");
    this.$log_out_btn = this.shadowRoot.getElementById("logout-btn");
    this.$navbar = this.shadowRoot.getElementById("navbar");
    this.$user_avatar = this.shadowRoot.getElementById("user-avatar");
    this.$greeting = this.shadowRoot.getElementById("greeting");
    this.$news = this.shadowRoot.getElementById("news");
    this.$more = this.shadowRoot.getElementById("more");
  }
  async connectedCallback() {
    this.$news.onclick = () => {
      this.$news.style.opacity = "0";
      this.$news.style.cursor = "default";
      alert("Chức năng đang thử nghiệm😁");
    }

    this.$more.onclick = () => {
      this.$more.style.opacity = "0";
      this.$more.style.cursor = "default";
      alert("Chức năng đang thử nghiệm😁");
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('user sign in')
        var user = firebase.auth().currentUser;
        var id, name, email, photoUrl, uid, emailVerified;
        var image = document.createElement('img')
        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          console.log(name,"  ",email,"  ",uid,"  ",photoUrl )
          // image.setAttribute('src',photoUrl);
          // this.$navbar.appendChild(image);
          this.$user_avatar.style.display = "block";
          this.$log_out_btn.style.display= "block";
          this.$sign_in_btn.style.display = "none"
          // this.$sign_in_btn.innerHTML = "Sign Out"
          // this.$sign_in_btn.setAttribute('src','#')
          this.$user_avatar.setAttribute('src',photoUrl)
          this.$greeting.innerHTML  = "Hello, " + name + " !"
          localStorage.setItem('email', email);
        }
        if (user.displayName == null && user.photoURL == null) {
          user.updateProfile({
            displayName: "Newbie",
            photoURL: "https://lh3.googleusercontent.com/pw/ACtC-3c62Ub_pEImDAGnAMUTc0V1UBj3Zwoyahb57mNbkR05x4aYOob-h-dOQYdnb2mcYe8XCO1C43JpeFKzKjykj_WS8z_4AUvYkactJmq_rsZq4O6SxvO-VQH48o39GgCDtHzks-cwE84_6IDqCk0BqdfA=s903-no?authuser=0"
          }).then(function() {
            
          }).catch(function(error) {
            
          });
        }
        
        
        this.$log_out_btn.addEventListener('click',()=>{
          firebase.auth().signOut().then(() => {
            // Sign-out successful.
            // alert("you have signed out")
            console.log("user sign out")
            window.location.href ="./"
          }).catch((error) => {
            // An error happened.
          });
        })
        

      } else {
        // No user is signed in.
        console.log('not sign in')
        this.$sign_in_btn.style.display ="block";
        this.$user_avatar.style.display = "none";
        this.$log_out_btn.style.display= "none";
      }
    });
}
}
window.customElements.define("navbar-filter", NavbarOnTop);