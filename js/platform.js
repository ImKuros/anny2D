class Platform {
  constructor(x, y, width = 80, height = 16, isFinish = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isFinish = isFinish;
  }

  draw(ctx) {
    ctx.fillStyle = this.isFinish ? "#00ff00" : "#654321";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
player.onGround = true;
player.vy = 0;
player.y = platform.y - player.height;