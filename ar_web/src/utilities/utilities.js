
var utilities = {
    
}

utilities.subStr = function(s, len){
    if(len >= s.length)
    {
        return s;
    }
    return s.substr(0, len) + '...'
}

utilities.getFileExtension = function(filename){
    return filename.split('.').pop();
}
export default utilities

