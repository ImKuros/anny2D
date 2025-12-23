class Platform {
  constructor(
    x,
    y,
    width = 80,
    height = 16,
    isFinish = false,
    isBase = false
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isFinish = isFinish;
    this.isBase = isBase; // ← PRIMEIRA PLATAFORMA
  }

  anchorPlayer(player) {
    if (!this.isBase) return;

    player.onGround = true;
    player.vy = 0;
    player.y = this.y - player.height;
  }

  draw(ctx) {
    ctx.fillStyle = this.isFinish ? "#00ff00" : "#492908ff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
