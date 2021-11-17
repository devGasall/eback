exports.genMatricule=(prefix,mat)=>{
    let nbz=prefix
    if((mat/10)<1){
        nbz=nbz+"0000000000"+mat
    }else if((mat/100)<1){
        nbz=nbz+"000000000"+mat
    }else if((mat/1000)<1){
        nbz=nbz+"00000000"+mat
    }else if((mat/10000)<1){
        nbz=nbz+"0000000"+mat
    }else if((mat/100000)<1){
        nbz=nbz+"000000"+mat
    }else if((mat/1000000)<1){
        nbz=nbz+"00000"+mat
    }else if((mat/10000000)<1){
        nbz=nbz+"0000"+mat
    }else if((mat/100000000)<1){
        nbz=nbz+"000"+mat
    }else if((mat/1000000000)<1){
        nbz=nbz+"00"+mat
    }else if((mat/10000000000)<1){
        nbz=nbz+"0"+mat
    }else if((mat/100000000000)<1){
        nbz=nbz+""+mat
    }
    return nbz
}