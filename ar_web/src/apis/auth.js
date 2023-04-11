import api from "./api";
import user from "./user";
var auth = {};

auth.credential_token = localStorage.getItem("credential_token");
auth.login = function (_email, _password) {
  console.log("email", _email);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: _email,
    password: _password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(api.to("login"), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
        window.Login.setState({
          isLoading: false,
        });
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then(async (result) => {
      console.log(result);
      auth.onLoginSuccess(JSON.parse(result).token);
    })
    .catch((error) => console.log("error", error));
};

auth.onLoginSuccess = function (token) {
  auth.credential_token = token;
  localStorage.setItem("credential_token", auth.credential_token);
  window.location.replace("/#museums-page");
};

auth.signup = function (_email, _password, _name) {
  console.log('signup ' + _email + ' : ' + _password + ' : ' + _name)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: _name,
    password: _password,
    email: _emailf,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(api.to("signup"), requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      auth.onLoginSuccess(JSON.parse(result).token);
    })
    .catch((error) => console.log("error", error));
};

auth.loginWithToken = async function () {
  if (!auth.credential_token) {
    return false;
  }
  var myHeaders = new Headers();
  console.log("tk", auth.credential_token);
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(api.to("login/verify"), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("token is invalid");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      auth.onLoginSuccess(auth.credential_token);
      return true
    })
    .catch((error) => console.log("error", error));
};

auth.signOut = function(){
  auth.credential_token = ""
  localStorage.setItem("credential_token", "")
  window.location.replace("/");
}

export default auth;
