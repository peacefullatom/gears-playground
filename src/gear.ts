import {
  GearShape,
  gearShapeDefault,
  gearShapeTriangle,
  IGear
} from "./gear.types";

export default class Gear implements IGear {
  readonly parent: HTMLDivElement;
  readonly container: HTMLDivElement;
  left: number;
  top: number;
  radius: number;
  teeth: number;
  height: number;
  shape: GearShape;
  thickness: number;
  angle: number;
  label: string;

  constructor(settings?: Partial<IGear>) {
    settings = settings || {};
    this.parent = settings.parent || document.createElement("div");
    this.container = settings.container || document.createElement("div");
    this.container.id = "container";
    this.left = settings.left || 0;
    this.top = settings.top || 0;
    this.radius = settings.radius || 10;
    this.teeth = settings.teeth || 3;
    this.height = settings.height || 10;
    this.shape = settings.shape || gearShapeDefault;
    this.thickness = settings.thickness || 1;
    this.angle = settings.angle || 0;
    this.label = settings.label || "";

    this.parent.appendChild(this.container);

    this.update();
  }

  setLeft(value: number): void {
    this.left = value;
    this.update();
  }

  setTop(value: number): void {
    this.top = value;
    this.update();
  }

  setRadius(value: number): void {
    this.radius = value;
    this.update();
  }

  setTeeth(value: number): void {
    this.teeth = value;
    this.update();
  }

  setHeight(value: number): void {
    this.height = value;
    this.update();
  }

  setShape(value: GearShape): void {
    this.shape = value;
    this.update();
  }

  setThickness(value: number): void {
    this.thickness = value;
    document.documentElement.style.setProperty(
      "--thickness",
      `${this.thickness / 10}vmin`
    );
  }

  setAngle(value: number): void {
    this.angle = value;
    this.update();
  }

  setLabel(value: string): void {
    this.label = value;
    this.update();
  }

  update(): void {
    const size = `${this.radius * 3}vmin`;
    const step = 360 / this.teeth;
    const side = (2 * Math.PI * this.radius) / (this.teeth * (Math.PI / 2));
    const displacement = this.radius * 1.5;
    const multiplier = (this.height - 1) / 10;

    this.container.style.width = size;
    this.container.style.height = size;
    this.container.style.margin = `${this.radius * 2}vmin`;
    this.container.style.transform = `rotate(${this.angle}deg)`;
    this.container.style.left = `${this.left}px`;
    this.container.style.top = `${this.top}px`;
    this.container.innerHTML = null;
    for (let i = 0; i < this.teeth; i++) {
      const tooth = document.createElement("div");
      tooth.className = `tooth ${this.shape}`;
      if (this.shape === gearShapeTriangle) {
        const length = `${(side / 2) * multiplier}vmin`;
        tooth.style.height = length;
        tooth.style.width = length;
      } else {
        tooth.style.height = `${side}vmin`;
        tooth.style.width = `${side * multiplier}vmin`;
      }
      tooth.style.transform = `rotateZ(${i *
        step}deg) translateX(${displacement}vmin)`;
      this.container.appendChild(tooth);
    }
    const cover = document.createElement("div");
    cover.className = "cover";

    const label = document.createElement("div");
    label.className = "label";
    label.innerText = this.label;

    cover.appendChild(label);

    this.container.appendChild(cover);
  }
}
