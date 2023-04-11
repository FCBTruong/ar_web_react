import auth from "./auth";
import api from "./api";
var user = {};

user.userData = null;

// load from cache

user.setData = function (_userData) {
  user.userData = _userData;
  localStorage.setItem("user_data", JSON.stringify(_userData));
};

user.getData = function () {
  if (user.userData) {
    return user.userData;
  } else {
    var cachedUserData = localStorage.getItem("user_data");
    console.log(cachedUserData);
    // eslint-disable-next-line no-use-before-define
    if (cachedUserData) {
      user.userData = JSON.parse(cachedUserData);
    }
    return user.userData;
  }
};

user.saveDataToCache = function () {
  localStorage.setItem("user_data", JSON.stringify(user.userData));
};

user.requestData = async function () {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.to("users/get-info"), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("error request data");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log("request user data successful");
      user.setData(JSON.parse(result));
    })
    .catch((error) => console.log("error", error));
};

user.createMuseum = function (name, introduction) {
  var myHeaders = new Headers();
  console.log("token: ", auth.credential_token);
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: name,
    introduction: introduction,
  });

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
      var museum = JSON.parse(result)
      user.getData().museums.push(museum)
      window.Museums.doneCreateMuseum();
    })
    .catch((error) => console.log("error", error));
};

user.getMuseumById = function (id) {
  console.log("id... museum ", id);
  return user.userData.museums.find((museum) => museum.id === id);
};

user.uploadFile = async function (file) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var formdata = new FormData();
  formdata.append("file", file);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  var link = null;
  link = await fetch(api.to("files"), requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return JSON.parse(result).url;
    })
    .catch((error) => console.log("error", error));

  return link;
};

user.addAsset3D = async function (file) {
  // add a new 3d model to gallery
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var formdata = new FormData();
  formdata.append("file", file);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  var asset = await fetch(api.to("asset3d/"), requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var ass = JSON.parse(result);
      return ass.asset;
    })
    .catch((error) => console.log("error", error));
  return asset;
};

user.uploadToCloudinary = async function (file, type = "image") {
  // todo later
  const media = {
    width: 400,
    height: 400,
    format: "image",
    name: "test",
    id: "test",
    secure_url: require("assets/img/museum/museum_bg_0.jpeg"),
  };

  return {
    data: media,
    url: require("assets/img/museum/museum_bg_0.jpeg"),
  };
};

user.setEditMode = function (editMode) {
  user.getData().editMode = editMode;
  user.saveDataToCache();

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var raw = "";

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var url = api.to("users/editmode?editmode=" + editMode);

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export default user;
