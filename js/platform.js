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
    this.isBase = isBase;
  }

  // Mantém o player fixo na plataforma base
  anchorPlayer(player) {
  if (!this.isBase) return;

  const isOnTop =
    player.x + player.width > this.x &&
    player.x < this.x + this.width &&
    player.y + player.height <= this.y + 5 &&
    player.y + player.height + player.vy >= this.y;

  if (!isOnTop) return;

  player.onGround = true;
  player.vy = 0;
  player.y = this.y - player.height;
}

  draw(ctx) {
    if (this.isFinish) {
      ctx.fillStyle = "#00ff00"; // linha de chegada
    } else if (this.isBase) {
      ctx.fillStyle = "#8B4513"; // plataforma inicial
    } else {
      ctx.fillStyle = "#654321"; // plataformas normais
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
