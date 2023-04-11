
var api = {};
var DEV_LOCAL = true
api.to = function(s){
    if(DEV_LOCAL){
        return "https://localhost:5001/api/" + s;
    }
    return "https://ar-dashboard.azurewebsites.net/api/" + s
}

export default api;