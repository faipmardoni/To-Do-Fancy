function statusChangeCallback(response) {
  if (response.status === "connected") {
    // Logged into your app and Facebook.
    // window.location='http://localhost:8080/#/'
    const access_token = response.authResponse.accessToken
    axios
      .post("http://127.0.0.1:3000/users/login", { access_token })
      .then(res => {
        localStorage.setItem("Token", res.data.token)
        localStorage.setItem("userId", res.data.user._id)
        window.location.href = 'main.html'
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    // The person is not logged into your app or we are unable to tell.
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: "438246529936726",
    cookie: true,
    xfbml: true,
    version: "v3.0"
  })
};

// Load the SDK asynchronously
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk")


const login = new Vue({
  el: '#login',
  data: {
    email: '',
    password: '',
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/users/login-manual', {
        email: this.email,
        password: this.password
      })
        .then((result) => {
          // console.log('result :', result.data);
          localStorage.setItem("Token", result.data.token)
          localStorage.setItem("userId", result.data.user._id)
          window.location.href = 'main.html'
        }).catch((err) => {
          console.log('err :', err.response.data);
          alert(err.response.data.message)
        });
    }
  }
})
const register = new Vue({
  el: '#register',
  data: {
    email: '',
    password: '',
    name: ''
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/users/', {
        email: this.email,
        password: this.password,
        name: this.name
      })
        .then((result) => {
          localStorage.setItem("Token", result.data.token)
          localStorage.setItem("userId", result.data.user._id)
          window.location.href = 'main.html'
        }).catch((err) => {
          alert('failed to add user please try again')
          console.log('err :', err.response.data);
        });
    }
  }
})