import "./style.css";
import getCanvasRelativeCoordinates from "./ts/helpers/getCanvasRelativeCoordinates";
import Scene from "./ts/Scene";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const button = document.querySelector("#button") as HTMLButtonElement;
  const ctx = canvas.getContext("2d")!;
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;

  const scene = new Scene(canvas.width, canvas.height);

  canvas.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    const { x, y } = getCanvasRelativeCoordinates(
      event.clientX,
      event.clientY,
      canvas
    );
    scene.startLine(x, y);
    scene.draw(ctx);
  });

  document.addEventListener("mousemove", (event) => {
    event.stopPropagation();
    const { x, y } = getCanvasRelativeCoordinates(
      event.clientX,
      event.clientY,
      canvas
    );
    scene.moveLineEndPoint(x, y);
    scene.draw(ctx);
  });

  document.addEventListener("mousedown", (event) => {
    if (event.button !== 2) return;
    scene.cancelLine();
    scene.draw(ctx);
  });

  window.addEventListener("resize", () => {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    scene.width = ctx.canvas.width;
    scene.height = ctx.canvas.height;
    scene.draw(ctx);
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  document.addEventListener("mouseup", () => {
    scene.finishLine();
  });

  button.addEventListener("click", () => {
    scene.collapseLines(1000, ctx);
  });
});
