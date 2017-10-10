const drawHud = ({ player, gun }, ctx) => {
    
    //healthBar
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 200, 20);
    ctx.fillStyle = "#3382bd";
    ctx.fillRect(0, 0, player.health*20, 20);
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(player.health + "/10", 5, 16);

    //overheating
    ctx.fillStyle = "orange";
    if(gun.overheating >= 200) ctx.fillStyle = "red";
    ctx.fillRect(0, 20, gun.overheating, 20);

}

export default drawHud;