export const loadSprites = (...urls) => urls.reduce((arr, url) => {
    const sprite = new Image();
    sprite.src = `/sprites/${url}.png`;
    arr.push(sprite);
    return arr;
}, []);

export const loadAudio = (...urls) => urls.reduce((arr, url) => {
    const audio = new Audio(`/audio/${url}.wav`);
    audio.volume = 0.5;
    arr.push(audio);
    return arr;
}, []);