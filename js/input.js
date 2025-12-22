class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.jump = false;

    // ⌨️ Teclado
    window.addEventListener("keydown", e => this.key(e, true));
    window.addEventListener("keyup", e => this.key(e, false));

    // 📱 Touch
    this.bindTouch("btnLeft", "left");
    this.bindTouch("btnRight", "right");
    this.bindTouch("btnJump", "jump");
  }

  key(e, pressed) {
    if (e.code === "ArrowLeft" || e.code === "KeyA") this.left = pressed;
    if (e.code === "ArrowRight" || e.code === "KeyD") this.right = pressed;
    if (e.code === "Space") this.jump = pressed;
  }

  bindTouch(id, action) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("touchstart", e => {
      e.preventDefault();
      this[action] = true;
    });

    btn.addEventListener("touchend", e => {
      e.preventDefault();
      this[action] = false;
    });
  }
}
