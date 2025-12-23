class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 40;
    this.height = 48;

    // 🔧 HITBOX
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

    // Direção
    this.direction = "right"; // right | left

    // Estados
    this.state = "idle"; // idle | walk | jump

    // 🖼️ Sprites
    this.spriteIdle = new Image();
    this.spriteIdle.src = "anny.png";

    this.spriteWalk = new Image();
    this.spriteWalk.src = "anny2.png";

    this.spriteJump = new Image();
    this.spriteJump.src = "anny3.png";
  }

  get bounds() {
    return {
      x: this.x + this.hitbox.offsetX,
      y: this.y + this.hitbox.offsetY,
      width: this.hitbox.width,
      height: this.hitbox.height
    };
  }

  update(input, canvas) {
    let moving = false;

    /* ================= MOVIMENTO HORIZONTAL ================= */
    if (input.left) {
      this.x -= this.speed;
      this.direction = "left";
      moving = true;
    }

    if (input.right) {
      this.x += this.speed;
      this.direction = "right";
      moving = true;
    }

    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));

    /* ================= PULO ================= */
    if (input.jump && this.onGround) {
      this.vy = this.jumpForce;
      this.onGround = false;
    }

    /* ================= GRAVIDADE ================= */
    this.vy += this.gravity;
    this.y += this.vy;

    /* ================= ESTADO ================= */
    if (!this.onGround) {
      this.state = "jump";
    } else if (moving) {
      this.state = "walk";
    } else {
      this.state = "idle";
    }
  }

  draw(ctx) {
    let sprite;

    switch (this.state) {
      case "walk":
        sprite = this.spriteWalk;
        break;
      case "jump":
        sprite = this.spriteJump;
        break;
      default:
        sprite = this.spriteIdle;
    }

    ctx.save();

    if (this.direction === "left") {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, 0, 0, this.width, this.height);
    } else {
      ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    }

    ctx.restore();

    /* 🔍 DEBUG HITBOX (opcional)
    const b = this.bounds;
    ctx.strokeStyle = "red";
    ctx.strokeRect(b.x, b.y, b.width, b.height);
    */
  }
}
