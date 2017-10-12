import { v, add, mul, sub, div, pipe, reverse, normalize, half } from "/js/vector.js";
import { checkCol } from "/js/colission.js";
import bullet from "/js/bullet.js";

const makeGun = ({ name = "pistol", overheat = 3, fireRate = 500, shotSpeed = 0.6, size = v(15, 30), damage = 1, penetration = 1, spread = 0.1, times = 1, shotDelay = 0, knockback = 1, sound = 0 }) => {
    const gun = {
        name,
        shot: 0,
        shooting: false,
        overheating: 0,
    };

    gun.update = ({ pointer, player, bullets, sentBullets, deltaTime, lastTime, sprites, obstacles, audio, scale }) => {
        
                if(gun.shot + fireRate < lastTime) gun.shooting = false;

                if(gun.overheating > 0) gun.overheating -= 0.06*deltaTime; 
        
                if(pointer.down && !gun.shooting && gun.overheating < 200){
                    gun.overheating += overheat*deltaTime;
                    gun.shooting = true;
                    gun.shot = lastTime;
                    
                    //makeBullet
                    const getBullet = () => {
                        const speed = pipe(
                            sub(player.center, pointer.pos),
                            reverse,
                            normalize,
                            x => mul(x, shotSpeed),
                            x => add(x, v(Math.random()*spread-spread/2, Math.random()*spread-spread/2)),
                        );
            
                        const pos = pipe(
                            player.center,
                            x => add(x, mul(normalize(speed), 20*scale)),
                            x => sub(x, half(size)),
                        );

                        return bullet({
                            pos, 
                            speed,
                            size,
                            penetration,
                            damage,
                            id: player.id,
                            img: sprites[2],
                            scale,
                        }); 
                    }

                    //fire
                    for(let i = 0; i < times; i++){
                        const b = getBullet();
                        if(shotDelay > 0){
                            setTimeout(() => {
                                bullets.push(b);
                                sentBullets.push(b);
                                audio[sound].load();
                                audio[sound].play();
                            }, i*shotDelay);
                        }else{
                            bullets.push(b);
                            sentBullets.push(b);
                            audio[sound].load();
                            audio[sound].play();
                        }
                    }
                    //knockback
                    const knock = pipe(
                        sub(player.center, pointer.pos),
                        normalize,
                        x => mul(x, knockback),
                        x => mul(x, scale),
                    );

                    //checkKnockbackColission and move
                    player.pos.x += knock.x;
            
                    const xCol = checkCol(player, obstacles);
                    if(xCol && knock.x > 0) player.pos.x = xCol.pos.x - xCol.size.x + 10;
                    if(xCol && knock.x < 0) player.pos.x = xCol.pos.x + xCol.size.x;
            
                    player.pos.y += knock.y;
            
                    const yCol = checkCol(player, obstacles);
                    if(yCol && knock.y > 0) player.pos.y = yCol.pos.y - yCol.size.y + 10;
                    if(yCol && knock.y < 0) player.pos.y = yCol.pos.y + yCol.size.y;

                }
            }
    return gun;
}

export default makeGun;