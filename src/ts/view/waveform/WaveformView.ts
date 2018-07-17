import { DeckModel } from "../../model/deck/DeckModel";
import { ViewNode } from "../ViewNode";
import { WaveformModel } from "../../model/waveform/WaveformModel";
import { Observable } from "../../utils/Observable";
import { Debouncer } from "../../utils/Debouncer";
import { newChild } from "../viewutils";

export class WaveformView implements ViewNode {
	private element: HTMLElement;
	private svg: SVGSVGElement;
	private svgPath: SVGPathElement;
	
	private model: Observable<WaveformModel>;
	private debouncer = new Debouncer();
	private smoothingFactor = 0.05;
	private currentWidth: number;
	private currentHeight: number;
	
	public constructor(deckModel: DeckModel, element: HTMLElement) {
		this.element = element;
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
		
		this.svg.appendChild(this.svgPath);
		this.element.appendChild(this.svg);
		
		let svgStyle = this.svg.style;
		svgStyle.fill = "none";
		svgStyle.stroke = "white";
		svgStyle.strokeWidth = "1px";
		svgStyle.width = "100%";
		svgStyle.height = "100%";
		this.svg.setAttribute("preserveAspectRatio", "none");
		
		// Resize listeners
		
		window.addEventListener("resize", () => {
			this.debouncer.executeMaybe(() => {
				this.updateSize();
				if (this.model.isPresent()) {
					let waveformData = this.model.get().waveformData;
					if (waveformData.isPresent()) {
						this.repaint(waveformData.get());
					}
				}
			});
		});
		this.updateSize();
		
		// Model listeners
		
		this.model = deckModel.loadedAudioFile.derive(file => new WaveformModel(
			file,
			this.getDataPoints(),
			deckModel.audioContext
		));
		this.model.listen(model => {
			model.waveformData.listen(waveformData => {
				this.repaint(waveformData);
			});
		});
	}
	
	private updateSize(): void {
		this.currentWidth = this.element.clientWidth;
		this.currentHeight = this.element.clientHeight;
		this.svg.setAttribute("viewBox", "0 0 " + this.currentWidth + " " + this.currentHeight);
	}
	
	private repaint(waveformData: Float32Array): void {
		this.svgPath.setAttribute("d", this.createSVGPath(waveformData));
	}
	
	private createSVGPath(data: Float32Array): string {
		let maxValue = data.reduce((a, b) => Math.max(a, b));
		let path = "M 0 " + this.currentHeight + " ";
		let dataPoints = data.length;
		
		let dx = this.currentWidth / dataPoints;
		for (let i=0; i<dataPoints; i++) {
			let x = i * dx;
			let y = (0.5 - data[i] / (4 * maxValue)) * this.currentHeight;
			path += "L " + x + " " + y + " ";
		}
		
		//path += "V " + this.currentHeight + " H 0 Z";
		return path;
	}
	
	private getDataPoints(): number {
		return this.currentWidth / this.smoothingFactor;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
