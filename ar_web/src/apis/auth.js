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
    .then((response) => response.text())
    .then(async (result) => {
      auth.credential_token = JSON.parse(result).token
      localStorage.setItem("credential_token", auth.credential_token)
      console.log(result)
      window.location.replace("/museums-page");
    })
    .catch((error) => console.log("error", error));
};



export default auth;
