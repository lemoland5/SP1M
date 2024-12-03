const miesiace = new Map()
miesiace.set("Jan", "Stycznia")
miesiace.set("Feb", "Lutego")
miesiace.set("Mar", "Marca")
miesiace.set("Apr", "Kwietnia")
miesiace.set("May", "Maja")
miesiace.set( "Jun", "Czerwca")
miesiace.set("Jul", "Lipca")
miesiace.set("Aug", "Sierpnia")
miesiace.set("Sep", "Września")
miesiace.set("Oct", "Października")
miesiace.set("Nov", "Listopada")
miesiace.set("Dec", "Grudnia")


const sqlDateToString = (date) => {
    console.log(date.toString());

    let string = date.toString().substr(4,11);
    let newString = "";
    newString += string.substr(4,2) + " ";
    if (newString[0] == '0'){
        newString = newString.slice(1);
    }

    newString += miesiace.get(string.substr(0,3)) + ' ';
    newString += string.substr(7,4);

    return newString
}

const fixDatesSql = (array, field = "data") => {
    array.forEach(element => {
        let date = element[field];
        element[field] = sqlDateToString(date);
    });

    return array
}

module.exports = {sqlDateToString, fixDatesSql}