const getKeys = (document) => {
    const keys = {
        a: false,
        d: false,
        s: false,
        w: false,
    }

    const switchKeys = (e, change) => {
        switch(e.keyCode){
            case 65: 
                keys.a = change;
                break;
            case 68: 
                keys.d = change;
                break;
            case 87: 
                keys.w = change;
                break;
            case 83: 
                keys.s = change;
                break;
        }
    }

    document.addEventListener("keydown", e => switchKeys(e, true));
    document.addEventListener("keyup", e => switchKeys(e, false));

    return keys;
}

export default getKeys;