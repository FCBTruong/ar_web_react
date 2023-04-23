
var api = {};
var DEV_LOCAL = false
api.to = function(s){
    if(DEV_LOCAL){
        return "https://localhost:5001/api/" + s;
    }
    return "https://museum-server.azurewebsites.net/api/" + s
}

export default api;