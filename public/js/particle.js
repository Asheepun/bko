import object from "/js/object.js";
import { v, add, half, angle } from "/js/vector.js";

const particle = ({ pos, img, size, speed, time }) => {
    const particle = object({
        pos,
        img,
        size,
        speed,
    });
    particle.started = 0;
    particle.time = time;
    particle.stopped = false;
    particle.rotation = angle(particle.pos, add(particle.pos, particle.speed));

    particle.update = ({ lastTime }) => {
        if(!particle.stopped){

            if(particle.started === 0) particle.started = lastTime;
            if(particle.started + time < lastTime) particle.stopped = true; 

            particle.pos = add(particle.pos, particle.speed);
            particle.center = add(particle.pos, half(particle.size));

        }
    }
    return particle;
}

export default particle;