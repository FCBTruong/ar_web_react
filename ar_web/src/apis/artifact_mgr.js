import auth from "./auth"
import api from "./api"
import user from "./user";

var artifactMgr = {};

artifactMgr.create = function (artifactForm) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + auth.credential_token
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(artifactForm)
  console.log('artifact_form', artifactForm)

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(api.to("artifacts/"), requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

artifactMgr.getArtifact = function(museumId, artifactId){
    var museum = user.getMuseumById(museumId)
    return museum.artifacts.find(artifact => artifact.id === artifactId)
}

// should return the url to for vistors scan qr code
artifactMgr.getUrlArtifact = function(museumId, artifactId){
  return api.to('guests/' + user.userData.id + '/' + museumId + '/' + artifactId)
}

export default artifactMgr;
