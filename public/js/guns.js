import { v, add, mul, sub, div, pipe, reverse, normalize, half } from "/js/vector.js";
import bullet from "/js/bullet.js";

const getGuns = () => [
    makeGun({
        name: "pistol",
        shotSpeed: 0.6,
        fireRate: 500,
        damage: 1,
        penetration: 1,
        overheat: 3,
        size: v(15, 30),
    }),
    makeGun({
        name: "assault rifle",
        shotSpeed: 1,
        fireRate: 200,
        damage: 2,
        penetration: 1,
        overheat: 4,
        size: v(15, 30),
    }),
    makeGun({
        name: "big berta",
        shotSpeed: 0.6,
        fireRate: 1000,
        damage: 5,
        penetration: 5,
        overheat: 8,
        size: v(30, 60),
    }),
    makeGun({
        name: "minigun",
        shotSpeed: 0.6,
        fireRate: 50,
        damage: 1,
        penetration: 1,
        overheat: 1.5,
        size: v(15, 30),
        spread: 0.2,
    }),
    makeGun({
        name: "sniper",
        shotSpeed: 1,
        fireRate: 1000,
        damage: 5,
        penetration: 2,
        overheat: 5,
        size: v(10, 30),
        spread: 0,
    }),
];

const makeGun = ({ name = "pistol", overheat = 3, fireRate = 500, shotSpeed = 0.6, size = v(15, 30), damage = 1, penetration = 1, spread = 0.1 }) => {
    const gun = {
        name,
        shot: 0,
        shooting: false,
        overheating: 0,
    };

    gun.update = ({ pointer, player, bullets, sentBullets, deltaTime, lastTime, sprites }) => {
        
                if(gun.shot + fireRate < lastTime) gun.shooting = false;

                if(gun.overheating > 0) gun.overheating -= 0.06*deltaTime; 
        
                if(pointer.down && !gun.shooting && gun.overheating < 200){
                    gun.overheating += overheat*deltaTime;
                    gun.shooting = true;
                    gun.shot = lastTime;
                    
                    const speed = pipe(
                        sub(player.center, pointer.pos),
                        reverse,
                        normalize,
                        x => mul(x, shotSpeed),
                        x => add(x, v(Math.random()*spread-spread/2, Math.random()*spread-spread/2)),
                    );
        
                    const pos = pipe(
                        player.center,
                        x => add(x, mul(div(speed, shotSpeed), 20)),
                        x => sub(x, half(size)),
                    );
        
                    const b = bullet({
                        pos, 
                        speed,
                        size,
                        penetration,
                        damage,
                        id: player.id,
                        img: sprites[2],
                    });
        
                    bullets.push(b);
                    sentBullets.push(b);
                }
            }
    return gun;
}

export default getGuns;