import auth from "./auth";
import api from "./api";
import user from "./user";

var museumsMgr = {};

museumsMgr.update = async function (museumId, museum) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(museum);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(api.to("museums/" + museumId), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("error update museum, please try again");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log(result);
      var museum = JSON.parse(result);
      user.getData().museums = user.getData().museums.map((m) => {
        if (m.id === museum.id) {
          return museum;
        } else {
          return m;
        }
      });
    })
    .catch((error) => console.log("error", error));
};

museumsMgr.createMuseum = function (museum) {
  var myHeaders = new Headers();
  console.log("token: ", auth.credential_token);
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(museum);
  console.log("create museum: " + museum);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(api.to("museums"), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("error create museum, please try again");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log(result);
      var museum = JSON.parse(result);
      user.getData().museums.push(museum);
      user.saveDataToCache();
      window.Museums.doneCreateMuseum();
    })
    .catch((error) => console.log("error", error));
};

museumsMgr.deleteMuseum = function (id) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(api.to("museums/" + id), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("error delete museum, please try again");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log(result);
      user.getData().museums = user
        .getData()
        .museums.filter((museum) => museum.id !== id);
      user.saveDataToCache();
      window.Museums.doneDeleteMuseum();
    })
    .catch((error) => console.log("error", error));
};

export default museumsMgr;
