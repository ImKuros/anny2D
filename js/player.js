class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;

        this.velocityY = 0;
        this.gravity = 0.6;
        this.onGround = false;

        this.image = new Image();
        this.image.src = "assets/anny.png";
    }

    update(platforms) {
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        this.onGround = false;

        platforms.forEach(platform => {
            if (
                this.y + this.height <= platform.y &&
                this.y + this.height + this.velocityY >= platform.y &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width
            ) {
                this.velocityY = 0;
                this.y = platform.y - this.height;
                this.onGround = true;
            }
        });
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
