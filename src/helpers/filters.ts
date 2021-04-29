const filters = {
    capitalizeFirstCharacter(string:string) {
        return string?string.charAt(0).toUpperCase() + string.slice(1):'';
    },
    //capitalize all words of a string. 
    capitalizeWords(string:string) {
        return string?string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }):'';
    },
    replaceNullNumber(number:number) {
        return number?number:'--';
    },
  }
  export default filters;