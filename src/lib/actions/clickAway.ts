/** Calls `callback` when a click lands outside `node`. */
export function clickAway(node: HTMLElement, callback: () => void) {
	function handleClick(event: MouseEvent) {
		if (event.target instanceof Node && !node.contains(event.target)) {
			callback();
		}
	}

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
