import validateEmail, { getDataFromDoc, getDataFromDocs } from '../utils.js'
import InputWrapper from "./InputWrapper.js";
import NavbarFilter from "./Navbar.js"
import FooterDiv from "./Footer.js"
const $template = document.createElement('template');
// <-- Khi submit thi chuyen den duong dan trong attr action cua form -->
$template.innerHTML = /*html*/ `
<!--===============================================================================================-->	
<link rel="icon" type="image/png" href="./img/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="./vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="./fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="./vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="./vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="./vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="./css/login-form-util.css">
	<link rel="stylesheet" type="text/css" href="./css/login-from-main.css">
<!--===============================================================================================-->
	<navbar-filter></navbar-filter>
	<br></br>
	<br></br>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="./img/img-01.png" alt="IMG">
				</div>

				<form class="login100-form validate-form" id='login-form'>
					<span class="login100-form-title">
						Sign In
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" id="email" type="text" name="email" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" id='password' type="password" name="pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" id="submit-btn">
							Login
						</button>
						<p class="txt2" id="error"></p>
					</div>

					<div class="text-center p-t-12">
						<span class="txt1">
							Forgot
						</span>
						<a class="txt2" href="#">
							Username / Password?
						</a>
					</div>

					<div class="text-center p-t-136">
						<a class="txt2" href="#!/sign-up">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	<br></br>
	<footer-div></footer-div>

<!--===============================================================================================-->	
<script src="./vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="./vendor/bootstrap/js/popper.js"></script>
	<script src="./vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="./vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="./vendor/tilt/tilt.jquery.min.js"></script>
	<script >
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
<!--===============================================================================================-->
	<script src="../LoginFormCss.js"></script>

`

// Shadow DOM
export default class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.appendChild($template.content.cloneNode(true));
		// this.$form = this.shadowRoot.getElementById('login-form');
		this.$submit_btn = this.shadowRoot.getElementById('submit-btn');
        this.$email = this.shadowRoot.getElementById('email');
		this.$password = this.shadowRoot.getElementById('password');
		this.$error = this.shadowRoot.getElementById('error');
    }

    connectedCallback() {
        this.$submit_btn.onclick = async (event) => {
            event.preventDefault();
            // console.log(this.$email.value());
            let email = this.$email.value;
            let password = this.$password.value;

			
            // if (email == '') {
            //     this.$email.alertError('Nhập email của bạn')	
            // }else{
            //     this.$email.alertError('');
            // }
            // let isPassed =
            //     InputWrapper.checkForm(this.$email, (value) => value != '', 'Nhap vao ten dang ki') &
            //     InputWrapper.checkForm(this.$password, (value) => value != '', 'Nhap vao mat khau')
            // console.log(isPassed)

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
					var encodedPass = '';
					for(let i  = 0; i < password.split('').length; i++) {
						encodedPass += '*';
					}
					// Signed in 
					localStorage.setItem('pass', encodedPass);
					console.log("Sign In Succesfully")
					window.location.href = "./"
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorMessage)
					this.$error.innerHTML = errorMessage;
                });



            // if (isPassed) {
            //     let result = await firebase
            //         .firestore()
            //         .collection('users')
            //         .where('email', '==', email)
            //         .where('password', '==', CryptoJS.MD5(password).toString())
            //         .get();

            //     if (result.empty) {
            //         alert('Email hoac mat khau khong chinh xac')
            //     } else {
            //         router.navigate('/chat')
            //     }
            // }
        }
    }

}

window.customElements.define('login-form', RegisterForm);