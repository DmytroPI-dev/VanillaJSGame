import { GAME_WIDTH, GAME_HEIGHT, GRID_SIZE } from "../constants.js";
export class RenderSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
  }
  render(player) {
    this.ctx.fillStyle = "#0f3460";
    this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.renderGrid();
    this.renderPlayer(player);
  }
  renderGrid() {
    this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= GAME_WIDTH; i += GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, GAME_HEIGHT);
      this.ctx.stroke();
    }
    for (let j = 0; j <= GAME_HEIGHT; j += GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, j);
      this.ctx.lineTo(GAME_WIDTH, j);
      this.ctx.stroke();
    }
  }
  renderPlayer(player) {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(player.x, player.y, player.width, player.height);
  }
}
