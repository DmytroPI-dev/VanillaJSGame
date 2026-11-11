import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";
import { RenderSystem } from "../systems/RenderSystem.js";
import { Player } from "../entities/Player.js";
import { ImageManager } from "../managers/ImageManager.js";

export class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.renderSystem = new RenderSystem(this.canvas);

    this.imageManager = new ImageManager();
    this.imageManager.loadAll();
    this.renderSystem = new RenderSystem(this.canvas, this.imageManager);

    this.player = new Player();
    this.keys = {};
    this.lastTime = 0;
    this.state = "menu";

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    this.setupInput();
    this.setupUI();

    // start game loop
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }
  gameLoop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;
    this.update(dt);
    this.render();
    requestAnimationFrame((t) => this.gameLoop(t));
  }
  update(dt) {
    if (this.state !== "playing") return;
    this.player.update(dt, this.keys);
  }

  render() {
    if (this.state === "menu") {
      this.ctx.fillStyle = "#0f3460";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.renderSystem.render(this.player);
    }
  }

  setupInput() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === "Escape") {
        if (this.state === "playing") {
          this.pauseGame();
        } else if (this.state === "paused") {
          this.resumeGame();
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Clear all keys when context menu opens
    window.addEventListener("contextmenu", () => {
      this.keys = {};
    });

    // Clear all keys when window loses focus
    window.addEventListener("blur", () => {
      this.keys = {};
    });
  }

  setupUI() {
    document.getElementById("playBtn").onclick = () => this.startGame();
    document.getElementById("quitBtn").onclick = () => this.quitToMenu();
    document.getElementById("resumeBtn").onclick = () => this.resumeGame();
  }
  hideAllPanels() {
    document
      .querySelectorAll(".ui-panel")
      .forEach((p) => p.classList.remove("active"));
  }
  startGame() {
    this.hideAllPanels();
    this.state = "playing";
  }

  pauseGame() {
    this.state = "paused";
    document.getElementById("pauseMenu").classList.add("active");
  }

  resumeGame() {
    this.state = "playing";
    document.getElementById("pauseMenu").classList.remove("active");
  }

  quitToMenu() {
    this.returnToMenu();
  }

  returnToMenu() {
    this.state = "menu";
    this.hideAllPanels();
    document.getElementById("mainMenu").classList.add("active");
  }

  resizeCanvas() {
    const ratio = 16 / 9;
    let w, h;
    const margin = 15;

    const availableWidth = window.innerWidth - margin * 2;
    const availableHeight = window.innerHeight - margin * 2;

    if (availableWidth / availableHeight > ratio) {
      h = availableHeight;
      w = h * ratio;
    } else {
      w = availableWidth;
      h = w / ratio;
    }

    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;

    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.style.margin = `${margin}px`;
  }
}
