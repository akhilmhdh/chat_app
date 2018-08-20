function deparam(str){
    return str.split("&").reduce(function(params,param){
        let paramSplit=param.split("=").map((val)=>{
            return decodeURIComponent(val.replace(/\+/g," "));
        });
        params[paramSplit[0]]=paramSplit[1];
        return params;
    },{});
}