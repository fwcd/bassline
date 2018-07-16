/**
 * Appends a <br> element to this element's
 * child nodes.
 */
export function appendBreak(element: HTMLElement): void {
	element.appendChild(document.createElement("br"));
}

/**
 * Creates a branch of new nested child elements
 * in the DOM tree underneath the parent element
 * from the corresponding element names.
 */
export function newNestedChilds(parent: HTMLElement, ...childElementNames: string[]): HTMLElement {
	let childElements = childElementNames.map(it => document.createElement(it));
	return addNestedChilds(parent, ...childElements);
}

/**
 * Creates a branch of nested child elements
 * in the DOM tree underneath the parent element.
 */
export function addNestedChilds(parent: HTMLElement, ...childElements: HTMLElement[]): HTMLElement {
	let element = parent;
	childElements.forEach(child => {
		element.appendChild(child);
		element = child;
	});
	return element;
}

/**
 * Creates a new DOM element with the provided inner text.
 */
export function newElementWithText(elementName: string, text: string): HTMLElement {
	let element = document.createElement(elementName);
	element.innerText = text;
	return element;
}

/**
 * Creates a new HTML table row from the provided entries.
 */
export function newTableRow(...entries: string[]): HTMLTableRowElement {
	let tr = document.createElement("tr");
	entries.map(it => newElementWithText("td", it))
		.forEach(it => tr.appendChild(it));
	return tr;
}

/**
 * Removes all child nodes from this DOM node.
 */
export function removeChilds(element: HTMLElement): void {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}
