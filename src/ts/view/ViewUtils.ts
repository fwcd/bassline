/**
 * Appends a <br> element to this element's
 * child nodes.
 */
export function appendBreak(element: HTMLElement): void {
	element.appendChild(document.createElement("br"));
}
