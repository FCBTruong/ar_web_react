import auth from "./auth";
import api from "./api";
var user = {};

user.userData = null;

user.UserRole = {
  ADMIN: 2,
  USER: 1,
  GUEST: 0
}

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

user.getMuseumById = function (id) {
  console.log("id... museum ", id);
  return user.getData().museums.find((museum) => museum.id === id);
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
      user.getData().assets.push(ass.asset)
      user.saveDataToCache()
      return ass.asset;
    })
    .catch((error) => console.log("error", error));
  return asset;
};

user.removeAsset3D = async function (assetId) {
  var idx = user.getData().assets.findIndex(a => a.id === assetId)
  user.getData().assets.splice(idx, 1)
  user.saveDataToCache()
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);

  var formdata = new FormData();

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.to("asset3d/" + assetId), requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
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
