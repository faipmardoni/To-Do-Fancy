function statusChangeCallback(response) {
  if (response.status === "connected") {
    // Logged into your app and Facebook.
    // window.location='http://localhost:8080/#/'
    const access_token = response.authResponse.accessToken
    axios
      .post("http://127.0.0.1:3000/users/login", {access_token})
      .then(res => {
        console.log('res :', res);
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
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function() {
  FB.init({
    appId: "438246529936726",
    cookie: true, 
    xfbml: true, 
    version: "v3.0"
  })
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk")