class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.collected = false;
  }

  draw(ctx) {
    if (this.collected) return;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  checkCollision(player) {
    if (
      !this.collected &&
      player.x < this.x + this.size &&
      player.x + player.width > this.x &&
      player.y < this.y + this.size &&
      player.y + player.height > this.y
    ) {
      this.collected = true;
      return true;
    }
    return false;
  }
}
