export const clickAway = (node, callback) => {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			console.log('Clicked outside of modal');
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
