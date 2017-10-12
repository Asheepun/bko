const makeDrawBackground = (img, width, height, scale = 1)  => ctx  => {
    const scl = 40*scale;
    for(let i = 0; i < height/scl; i++){
        for(let j = 0; j < width/scl; j++){
            ctx.drawImage(img,
                j*scl, i*scl, scl, scl
            );
        }
    }
}  

export default makeDrawBackground;