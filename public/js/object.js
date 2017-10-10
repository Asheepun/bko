import { v, half, add, sub } from "/js/vector.js";

const object = ({ pos, size = v(40, 40), speed = v(0, 0), img, imgPos = v(0, 0) }) => {
    const object = {
        pos,
        size,
        speed,
        img,
        imgPos,
    }
    object.center = add(pos, half(size));
    object.rotation = 0;
    object.alpha = 1;

    object.draw = (ctx) => {
        ctx.save();
        ctx.translate(object.center.x, object.center.y);
        ctx.rotate(object.rotation);
        ctx.globalAlpha = object.alpha;
        ctx.drawImage(object.img,
            object.imgPos.x, object.imgPos.y, object.size.x, object.size.y,
            -object.size.x/2, -object.size.y/2, object.size.x, object.size.y
        );
        ctx.globalAlpha = 1;
        ctx.restore();
    }
    return object;
}

export default object;