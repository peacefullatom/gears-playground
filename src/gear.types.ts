export const gearShapeSquare = "square";
export const gearShapeCircle = "circle";
export const gearShapeTriangle = "triangle";
export const gearShapeDefault = gearShapeSquare;

export type GearShape =
  | typeof gearShapeSquare
  | typeof gearShapeCircle
  | typeof gearShapeTriangle;

export interface IGear {
  parent: HTMLDivElement;
  container: HTMLDivElement;
  left: number;
  top: number;
  radius: number;
  teeth: number;
  height: number;
  shape: GearShape;
  thickness: number;
  angle: number;
  label: string;
}
