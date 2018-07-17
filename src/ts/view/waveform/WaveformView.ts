import { DeckModel } from "../../model/deck/DeckModel";
import { ViewNode } from "../ViewNode";
import { WaveformModel } from "../../model/waveform/WaveformModel";
import { Observable } from "../../utils/Observable";
import { Debouncer } from "../../utils/Debouncer";
import { newChild } from "../viewutils";

/*
 * Source: https://gist.github.com/bodyflex/e4f6c9ec0fdea9450fd9303dd088b96d
 * Author: https://github.com/bodyflex
 */

export class WaveformView implements ViewNode {
	private element: HTMLElement;
	private svg: SVGSVGElement;
	private svgMask: SVGMaskElement;
	private svgPath: SVGPathElement;
	private svgProgressRect: SVGRectElement;
	private svgRemainingRect: SVGRectElement;
	
	private deckModel: DeckModel;
	private model: Observable<WaveformModel>;
	private debouncer = new Debouncer();
	private currentWidth: number;
	private currentHeight: number;
	
	private progressColor = "#666666";
	private remainingColor = "#FFFFFF"
	private smoothingFactor = 0.02;
	
	public constructor(deckModel: DeckModel, element: HTMLElement, deckIndex: number) {
		this.deckModel = deckModel;
		this.element = element;
		
		const svgNamespace = "http://www.w3.org/2000/svg";
		this.svg = document.createElementNS(svgNamespace, "svg");
		this.svgMask = document.createElementNS(svgNamespace, "mask");
		this.svgPath = document.createElementNS(svgNamespace, "path");
		this.svgProgressRect = document.createElementNS(svgNamespace, "rect");
		this.svgRemainingRect = document.createElementNS(svgNamespace, "rect");
		
		let maskID = "waveform-mask" + deckIndex;
		let maskAttribute = "url(#" + maskID + ")";
		this.svgMask.id = maskID;
		this.svgProgressRect.setAttribute("mask", maskAttribute);
		this.svgRemainingRect.setAttribute("mask", maskAttribute);
		
		this.svgMask.appendChild(this.svgPath);
		this.svg.appendChild(this.svgMask);
		this.svg.appendChild(this.svgProgressRect);
		this.svg.appendChild(this.svgRemainingRect);
		this.element.appendChild(this.svg);
		
		let svgStyle = this.svg.style;
		svgStyle.fill = "white";
		svgStyle.width = "100%";
		svgStyle.height = "100%";
		
		let progressStyle = this.svgProgressRect.style;
		progressStyle.fill = this.progressColor;
		
		let remainingStyle = this.svgRemainingRect.style;
		remainingStyle.fill = this.remainingColor;
		
		this.svg.setAttribute("preserveAspectRatio", "none");
		
		// Input listeners
		
		this.element.addEventListener("click", event => {
			this.deckModel.positionInSec.request(this.toAudioPos(event.offsetX));
		});
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
		deckModel.focused.listen(focused => {
			if (focused) {
				this.element.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
			} else {
				this.element.style.backgroundColor = "";
			}
		});
		deckModel.positionInSec.listen(pos => {
			this.updateProgressAndRemaining();
		});
		this.model.listen(model => {
			model.waveformData.listen(waveformData => {
				this.repaint(waveformData);
			});
		});
	}
	
	private toAudioPos(xPos: number): number {
		return (xPos / this.currentWidth) * this.deckModel.durationInSec.get();
	}
	
	private updateSize(): void {
		this.setSize(this.element.clientWidth, this.element.clientHeight);
	}
	
	private setSize(width: number, height: number): void {
		this.currentWidth = width;
		this.currentHeight = height;
		this.svgProgressRect.style.height = height + "px";
		this.svgRemainingRect.style.height = height + "px";
		this.updateProgressAndRemaining();
		this.svg.setAttribute("viewBox", "0 0 " + width + " " + height);
	}
	
	private updateProgressAndRemaining(): void {
		let percent = this.deckModel.progressInPercent();
		this.svgProgressRect.style.width = (this.currentWidth * percent) + "px";
		this.svgRemainingRect.setAttribute("x", this.currentWidth * percent + "");
		this.svgRemainingRect.style.width = (this.currentWidth * (1 - percent)) + "px";
	}
	
	private repaint(waveformData: Float32Array): void {
		this.svgPath.setAttribute("d", this.createSVGPath(waveformData));
	}
	
	private createSVGPath(data: Float32Array): string {
		let maxValue = data.reduce((a, b) => Math.max(a, b));
		let path = "M 0 " + this.currentHeight + " ";
		let dataPoints = data.length;
		let scaleDenom = 4 * maxValue;
		
		let dx = this.currentWidth / dataPoints;
		
		function appendPathSegment(i: number, height: number): void {
			let x = i * dx;
			let y = (0.5 - (data[i] / scaleDenom)) * height;
			path += "L " + x + " " + y + " ";
		}
		// Iterate positives
		for (let i=0; i<dataPoints; i+=2) {
			appendPathSegment(i, this.currentHeight);
		}
		// Iterate negatives backwards
		for (let i=dataPoints-1; i>=0; i-=2) {
			appendPathSegment(i, this.currentHeight);
		}
		
		path += "V " + this.currentHeight + " H 0 Z";
		return path;
	}
	
	private getDataPoints(): number {
		return this.currentWidth / this.smoothingFactor;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
