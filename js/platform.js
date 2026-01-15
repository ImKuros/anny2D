class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = "assets/plataforma.png";
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
