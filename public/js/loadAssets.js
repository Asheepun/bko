export const loadSprites = (...urls) => urls.reduce((arr, url) => {
    const sprite = new Image();
    sprite.src = `/sprites/${url}.png`;
    arr.push(sprite);
    return arr;
}, []);
