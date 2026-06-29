/**
 * Svelte action: calls `callback` when a click occurs outside `node`.
 * @param {HTMLElement} node
 * @param {() => void} callback
 */
export const clickAway = (node, callback) => {
	/** @param {MouseEvent} event */
	const handleClick = (event) => {
		if (event.target instanceof Node && !node.contains(event.target)) {
			callback();
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
};
