export const loadSprites = (...urls) => urls.reduce((arr, url) => {
    const sprite = new Image();
    sprite.src = `/sprites/${url}.png`;
    arr.push(sprite);
    return arr;
}, []);

export const loadAudio = (...urls) => urls.reduce((arr, urls) => {
    arr.push(new Audio(`/audio/${url}.wav`));
    return arr;
}, []);