import auth from "./auth";
import api from "./api";
import user from "./user";

var artifactMgr = {};

artifactMgr.create = function (artifactForm) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(artifactForm);
  console.log("artifact_form", artifactForm);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(api.to("artifacts/"), requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      // update userdata
      var data = JSON.parse(result);
      user.setData(data.userData);
      artifactMgr.openEditor(data.artifactId);
    })
    .catch((error) => console.log("error", error));
};

artifactMgr._validatePos = function (p) {
  return {
    x: p.x ? p.x : 0,
    y: p.y ? p.y : 0,
    z: p.z ? p.z : 0,
  };
};

artifactMgr.update = async function (_museumId, _artifact) {
  console.log("update-artifact ", _artifact);
  // *** validate data
  // ** validate pos model
  _artifact.modelAr.position = artifactMgr._validatePos(
    _artifact.modelAr.position
  );
  _artifact.modelAr.rotation = artifactMgr._validatePos(
    _artifact.modelAr.rotation
  );
  _artifact.modelAr.scale = artifactMgr._validatePos(_artifact.modelAr.scale);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    museumId: _museumId,
    artifact: _artifact,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(api.to("artifacts/"), requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      user.setData(data.userData);
    })
    .catch((error) => console.log("error", error));
};

artifactMgr.getArtifact = function (museumId, artifactId) {
  var museum = user.getMuseumById(museumId);
  return museum.artifacts.find((artifact) => artifact.id === artifactId);
};

// should return the url to for vistors scan qr code
artifactMgr.getUrlArtifact = function (museumId, artifactId) {
  return api.to(
    "guests/" + user.userData.id + "/" + museumId + "/" + artifactId
  );
};

artifactMgr.openEditor = function (artifactId) {
  localStorage.setItem("current_artifact_id", artifactId);
  window.location.replace("/#artifact-editor-page");
};

artifactMgr.removeArtifact = function (museumId, artifactId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.credential_token);
  var raw = "";

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var url = api.to(`artifacts/?museumId=${museumId}&artifactId=${artifactId}`);
  fetch(url, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.text();
      } else {
        alert("Lỗi! Vui lòng thử lại sau");
        // eslint-disable-next-line no-throw-literal
        throw `error with status ${response.status}`;
      }
    })
    .then((result) => {
      console.log(result);
      window.location.replace("/#artifacts-page");
    })
    .catch((error) => console.log("error", error));
};

export default artifactMgr;
