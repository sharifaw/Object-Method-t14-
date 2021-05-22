let info ="Prius,2017,red,automatic,y,y,y,n,n,y,10000#Ionic,2020,blue,automatic,y,y,y,y,y,y,13000#Audi,2013,gray,manual,y,y,n,n,n,n,7500#Golf,1995,black,manual,n,n,n,n,n,n,2100#Kia,2007,white,automatic,n,y,n,n,n,n,5300#Mercedes,1998,silver,automatic,y,y,y,n,n,n,8600";

function splitInfo (string){
    return string.split("#");
}
// console.log(splitInfo(info));

function secSplit (array)
{
    return array.map(index => index.split(","));
}

// console.log(secSplit(splitInfo(info)));

function getInfo(carInfo)
{
    
    let array = [];
    carInfo.map(function sort (value) 
    {
        let obj = 
        {
            type: "",
            model: "",
            color: "",
            transmission: "",
            features:
                {
                    aC: "",
                    electricWindows: "",
                    electricMirrors: "",
                    sunroof: "",
                    autopark: "",
                    cruiseControl: "",
                    totalPrice: "",
                }
        };
        [obj.type,obj.model,obj.color,obj.transmission]=value;
        [,,,,obj.features.aC,obj.features.electricWindows,obj.features.electricMirrors]=value;
        [,,,,,,,obj.features.sunroof,obj.features.autopark,obj.features.cruiseControl,obj.features.totalPrice]=value;

        obj=checkFeatures(obj);
        obj.features.totalPrice = +(obj.features.totalPrice) + checkPrice(obj);
        array.push(obj);        
    })

    return array;
}

function checkFeatures(object) {
    (object.features.aC === "y") ? object.features.aC = "yes" : object.features.aC = "no";

    (object.features.autopark === "y") ? object.features.autopark = "yes" : object.features.autopark = "no";

    (object.features.cruiseControl === "y") ? object.features.cruiseControl = "yes" : object.features.cruiseControl = "no";

    (object.features.electricMirrors === "y") ? object.features.electricMirrors = "yes" : object.features.electricMirrors = "no";

    (object.features.electricWindows === "y") ? object.features.electricWindows = "yes" : object.features.electricWindows = "no";

    (object.features.sunroof === "y") ? object.features.sunroof = "yes" : object.features.sunroof = "no";

    return object;
}

function checkPrice (object) 
{
    let OriginalPrice = object.features.totalPrice;
    let total=0;
    

    (object.model >= 2015) ? total = OriginalPrice * 0.10  : false;
    (object.model >= 2010 && object.model <= 2014) ? total = OriginalPrice * 0.08  : false;
    (object.model >= 2005 && object.model <= 2009) ? total = OriginalPrice * 0.06  : false;
    (object.model >= 2000 && object.model <= 2004) ? total = OriginalPrice * 0.04  : false;
    (object.model <= 1999) ? total = OriginalPrice * 0.02  : false;

    (object.transmission === "automatic") ? total += OriginalPrice * 0.03 : false;
    (object.features.aC === "yes") ? total += OriginalPrice * 0.05 : false;
    (object.features.electricMirrors === "yes") ? total += OriginalPrice * 0.06 : false;
    (object.features.electricWindows === "yes") ? total += OriginalPrice * 0.08 : false;
    (object.features.sunroof === "yes") ? total += OriginalPrice * 0.07 : false;
    (object.features.autopark === "yes") ? total += OriginalPrice * 0.05 : false;
    (object.features.cruiseControl === "yes") ? total += OriginalPrice * 0.04 : false;

    return total;
}

function printDescending (object){
 object.sort(function (firstObj,secondObj) { return secondObj.features.totalPrice - firstObj.features.totalPrice}) 
 return object
}

console.log(printDescending(getInfo(secSplit(splitInfo(info)))));