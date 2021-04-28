const filters = {
    capitalizeFirstCharacter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    //capitalize all words of a string. 
    capitalizeWords(string:string) {
        return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }
  }
  export default filters;