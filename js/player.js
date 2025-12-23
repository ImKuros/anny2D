class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 42;
    this.height = 42;

    this.vx = 0;
    this.vy = 0;

    this.speed = 3.5;
    this.jumpForce = 13;
    this.gravity = 0.6;

    this.onGround = false;
    this.canDoubleJump = true;

    // 🔁 direção do personagem
    this.facingRight = true;

    this.spriteIdle = new Image();
    this.spriteWalk = new Image();
    this.spriteJump = new Image();

    this.spriteIdle.src = "assets/anny.png";
    this.spriteWalk.src = "assets/anny2.png";
    this.spriteJump.src = "assets/anny3.png";

    this.currentSprite = this.spriteIdle;
  }

  update(input, canvas) {
    // Movimento horizontal
    this.vx = 0;

    if (input.left) {
      this.vx = -this.speed;
      this.facingRight = false; // 👈 vira para esquerda
    }

    if (input.right) {
      this.vx = this.speed;
      this.facingRight = true; // 👉 vira para direita
    }

    // Pulo
    if (input.jump) {
      if (this.onGround) {
        this.vy = -this.jumpForce;
        this.onGround = false;
        this.canDoubleJump = true;
      } else if (this.canDoubleJump) {
        this.vy = -this.jumpForce;
        this.canDoubleJump = false;
      }
      input.jump = false;
    }

    // Física
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // Limites laterais
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }

    // Animação
    if (!this.onGround) {
      this.currentSprite = this.spriteJump;
    } else if (this.vx !== 0) {
      this.currentSprite = this.spriteWalk;
    } else {
      this.currentSprite = this.spriteIdle;
    }
  }

  draw(ctx) {
    ctx.save();

    if (!this.facingRight) {
      // 🔁 espelha horizontalmente
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.currentSprite,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        this.currentSprite,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    ctx.restore();
  }
}
