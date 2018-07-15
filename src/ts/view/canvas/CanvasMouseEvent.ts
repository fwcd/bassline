import { Vec2 } from "../../utils/Vec2";

export enum MouseButton {
	Left = 0, Middle = 1, Right = 2
}

export interface CanvasMouseEvent {
	pos: Vec2;
	button?: MouseButton;
}
