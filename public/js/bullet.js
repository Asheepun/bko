import object from "/js/object.js";
import { v, sub, half, add, mul, div, angle, pipe, normalize, reverse } from "/js/vector.js";
import { checkProx } from "/js/colission.js";
import particle from "/js/particle.js";

const bullet = ({ pos, speed, size = v(15, 30), penetration = 1, damage = 1, id, img }) => {
    const bullet = object({
        pos,
        speed,
        size,
        img,
    });
    bullet.id = id;
    bullet.penetration = penetration;
    bullet.damage = damage;
    bullet.rotation = angle(pos, add(pos, speed));
    
    //fixWeirdDrawingBug
    bullet.draw = (ctx) => {
        ctx.save();
        ctx.translate(bullet.center.x, bullet.center.y);
        ctx.rotate(bullet.rotation);
        ctx.drawImage(bullet.img,
            -bullet.size.x/2, -bullet.size.y/2, bullet.size.x, bullet.size.y
        );
        ctx.restore();
    }

    bullet.update = ({ obstacles, bullets, deltaTime, enemies, player, sprites, particles }) => {
        bullet.pos = add(bullet.pos, mul(bullet.speed, deltaTime));
        bullet.center = add(bullet.pos, half(bullet.size));

        const col = checkProx(bullet.center, obstacles.map(o => o.center), bullet.size.x/2 + 20);
        if(col){
            obstacles.find(o => o.center === col).hit = true;
            bullet.penetration--;
        }
        
        const enemyCol = checkProx(bullet.center, enemies.map(e => e.center), bullet.size.x/2 + 15);
        if(enemyCol){
            bullet.penetration = 0;
            bloodEffect({ pos: enemyCol, particles, speed, img: sprites[6]});
        }

        if(bullet.id !== player.id){
            const playerCol = checkProx(bullet.center, [player.center], bullet.size.x/2 + 15);
            if(playerCol){
                bullet.penetration = 0;
                player.hit = true;
                player.damage = bullet.damage;
                bloodEffect({ pos: player.center, particles, speed, img: sprites[6]});
            }
        }

        if(bullet.penetration <= 0) bullets.splice(bullets.indexOf(bullet), 1);
    }
    return bullet;
}

const bloodEffect = ({ pos, particles, speed, img }) => {
    for(let i = 0; i < 10; i++){
        particles.push(particle({
            pos,
            speed: pipe(
                speed,
                normalize,
                reverse,
                x => mul(x, 10),
                x => add(x, v(Math.random()*4-3, Math.random()*4-2))
            ),
            size: v(5, 5),
            time: 60,
            img,
        }));
    }
}

export default bullet;