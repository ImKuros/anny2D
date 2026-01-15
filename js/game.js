const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const platforms = [
    new Platform(200, 300, 128, 32),
    new Platform(100, 200, 128, 32),
    new Platform(350, 120, 128, 32)
];

const player = new Player(220, 0);

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    platforms.forEach(platform => {
        platform.draw(ctx);
    });

    player.update(platforms);
    player.draw(ctx);

    requestAnimationFrame(loop);
}

loop();
