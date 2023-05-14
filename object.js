class Thingamobober {
    constructor(x,y,type) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.type = type;
        this.img = loadImage("media/final/" + this.type + ".png")
    }

    show() {
        image(this.img,this.x,this.y,this.w,this.w);
    }

    setType(type) {
        this.type = type;
        this.img = loadImage("media/final/" + this.type + ".png")
    }
}