import auth from "./auth";
import api from "./api";
var admin = {};

admin.setData = function (data) {
  admin.data = data;
};

admin.getAdminData = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.to("admin/get-data"), requestOptions)
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
      console.log(result);
      admin.setData(JSON.parse(result));
    })
    .catch((error) => console.log("error", error));
};

admin.acceptPendingMuseum = async function (userId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.to("public/accept-pending/?userId=" + userId), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("error accept");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log(result);
      // admin.data.pendingMuseums.remove(userId);
    })
    .catch((error) => console.log("error", error));

  const index = admin.data.pendingMuseums.findIndex(
    (obj) => obj.userId === userId
  );

  console.log('hello' + index)
  if (index !== -1) {
    admin.data.publicizedMuseums.push(admin.data.pendingMuseums[index]);
    admin.data.pendingMuseums.splice(index, 1);
  }
};

admin.rejectPendingMuseum = async function (userId) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkNWY0ODJjNy1hOTFkLTRhZDEtYmVlMS1jNzQ0NzkxMGMzMDUiLCJzdWIiOlsiSHV5IFRydW9uZyIsIjIiXSwiZW1haWwiOiJuZ3V5ZW5odXl0cnVvbmc5MTEya0BnbWFpbC5jb20iLCJqdGkiOiIwZGY0YzkwYi1lN2M1LTRlM2QtYTM5NS0zZTZlZGIzY2I2MWEiLCJleHAiOjE2ODM3MjE2MzAsImlzcyI6Imh1eXRydW9uZy5jb20iLCJhdWQiOiJodXl0cnVvbmcuY29tIn0.AB8FNFUGa59iH4RPAqolDD5WLcdge7je4IUQ4tp2oDo"
  );

  var raw = "";

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(api.to("public/reject-pending/?userId=" + userId), requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("error reject");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));

  const index = admin.data.pendingMuseum.findIndex(
    (obj) => obj.userId === userId
  );
  if (index !== -1) {
    admin.data.pendingMuseum.splice(index, 1);
  }
};
export default admin;
