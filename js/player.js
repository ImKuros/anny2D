class Player {
  constructor(x, y) {
    // Posição real do sprite
    this.x = x;
    this.y = y;

    // Tamanho do sprite
    this.width = 40;
    this.height = 48;

    // 🔧 HITBOX (menor que o sprite)
    this.hitbox = {
      offsetX: 8,
      offsetY: 6,
      width: 24,
      height: 42
    };

    // Física
    this.vy = 0;
    this.speed = 3.5;
    this.jumpForce = -12;
    this.gravity = 0.6;
    this.onGround = false;

    // Direção do personagem
    this.direction = "right"; // right | left
  }

  // Retorna a hitbox real no mundo
  get bounds() {
    return {
      x: this.x + this.hitbox.offsetX,
      y: this.y + this.hitbox.offsetY,
      width: this.hitbox.width,
      height: this.hitbox.height
    };
  }

  update(input, canvas) {
    /* ================= MOVIMENTO HORIZONTAL ================= */
    if (input.left) {
      this.x -= this.speed;
      this.direction = "left";
    }

    if (input.right) {
      this.x += this.speed;
      this.direction = "right";
    }

    // Limite da tela
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));

    /* ================= PULO ================= */
    if (input.jump && this.onGround) {
      this.vy = this.jumpForce;
      this.onGround = false;
    }

    /* ================= GRAVIDADE ================= */
    this.vy += this.gravity;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.save();

    // 🔄 Inverte o sprite quando anda para a esquerda
    if (this.direction === "left") {
      ctx.translate(this.x + this.width / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(this.x + this.width / 2), 0);
    }

    // 🧍 Desenho do personagem (placeholder)
    ctx.fillStyle = "#ffccaa";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.restore();

    /* 🔍 DEBUG (opcional): desenhar hitbox
    const b = this.bounds;
    ctx.strokeStyle = "red";
    ctx.strokeRect(b.x, b.y, b.width, b.height);
    */
  }
}
