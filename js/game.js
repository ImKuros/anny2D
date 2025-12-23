class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    const maxWidth = 420;
    this.canvas.width = Math.min(window.innerWidth, maxWidth);
    this.canvas.height = window.innerHeight;

    this.input = new Input();
    this.player = new Player(
      this.canvas.width / 2 - 20,
      this.canvas.height - 120
    );

    this.platforms = [];
    this.hearts = [];

    this.totalPlatforms = 50;
    this.platformGap = 95;

    this.cameraY = 0;
    this.score = 0;
    this.running = false;

    this.generatePlatforms();
  }

  generatePlatforms() {
    let y = this.canvas.height - 60;
    const padding = 40;
    const platforms = [
  new Platform(
    canvas.width / 2 - 40,
    canvas.height - 80,
    80,
    16,
    false,
    true // ← esta é a plataforma fixa
  ),

  new Platform(300, 300),
  new Platform(500, 220),
];
    for (let i = 0; i < this.totalPlatforms; i++) {
      const x =
        padding +
        Math.random() * (this.canvas.width - padding * 2 - 90);

      this.platforms.push(new Platform(x, y));

      if (Math.random() > 0.3) {
        this.hearts.push(new Heart(x + 30, y - 30));
      }

      y -= this.platformGap;
    }

    // Linha de chegada
    this.platforms.push(
      new Platform(
        this.canvas.width / 2 - 120,
        y - 40,
        240,
        20,
        true
      )
    );
  }

  start() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";

    this.canvas.style.display = "block";
    document.getElementById("mobileControls").style.display = "flex";
    document.getElementById("inGameMenu").style.display = "flex";

    this.running = true;
    requestAnimationFrame(() => this.loop());
  }

  loop() {
    if (!this.running) return;
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  update() {
    this.player.onGround = false;

    this.platforms.forEach(p => {
      if (
        this.player.x < p.x + p.width &&
        this.player.x + this.player.width > p.x &&
        this.player.y + this.player.height <= p.y + 10 &&
        this.player.y + this.player.height + this.player.vy >= p.y
      ) {
        this.player.y = p.y - this.player.height;
        this.player.vy = 0;
        this.player.onGround = true;

        if (p.isFinish) this.win();
      }
    });

    this.hearts.forEach(h => {
      if (h.checkCollision(this.player)) {
        this.score++;
        h.collected = true;
      }
    });

    this.hearts = this.hearts.filter(h => !h.collected);

    this.player.update(this.input, this.canvas);

    const targetCameraY = this.player.y - this.canvas.height / 2;
    if (targetCameraY < this.cameraY) {
      this.cameraY = targetCameraY;
    }

    // Game Over por queda
    if (this.player.y - this.cameraY > this.canvas.height + 100) {
      this.gameOver();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.translate(0, -this.cameraY);

    this.platforms.forEach(p => p.draw(this.ctx));
    this.hearts.forEach(h => h.draw(this.ctx));
    this.player.draw(this.ctx);

    this.ctx.restore();

    this.ctx.fillStyle = "#fff";
    this.ctx.font = "18px Arial";
    this.ctx.fillText(`❤️ ${this.score}`, 20, 30);
  }

  gameOver() {
    this.running = false;
    document.getElementById("mobileControls").style.display = "none";
    document.getElementById("inGameMenu").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "flex";
  }

  win() {
    this.running = false;
    alert(`Você venceu! Pontos: ${this.score}`);
    location.reload();
  }
}

window.onload = () => {
  window.game = new Game();

  document.getElementById("startBtn").onclick = () => game.start();
  document.getElementById("restartBtn").onclick = () => location.reload();
  document.getElementById("btnReset").onclick = () => location.reload();

  document.getElementById("btnHome").onclick = () => {
    game.running = false;
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("inGameMenu").style.display = "none";
    document.getElementById("mobileControls").style.display = "none";
    document.getElementById("startScreen").style.display = "flex";
  };
};
