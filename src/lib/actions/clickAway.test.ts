import { afterEach, describe, expect, it, vi } from 'vitest';
import { clickAway } from './clickAway';

function click(target: Element | Document) {
	const event = new MouseEvent('click', { bubbles: true });
	target.dispatchEvent(event);
}

describe('clickAway', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('calls the callback when a click lands outside the node', () => {
		const node = document.createElement('div');
		const outside = document.createElement('button');
		document.body.append(node, outside);

		const callback = vi.fn();
		clickAway(node, callback);

		click(outside);
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('does not call the callback for clicks inside the node', () => {
		const node = document.createElement('div');
		const inner = document.createElement('button');
		node.append(inner);
		document.body.append(node);

		const callback = vi.fn();
		clickAway(node, callback);

		click(node);
		click(inner);
		expect(callback).not.toHaveBeenCalled();
	});

	it('stops listening after destroy', () => {
		const node = document.createElement('div');
		const outside = document.createElement('button');
		document.body.append(node, outside);

		const callback = vi.fn();
		const action = clickAway(node, callback);
		action.destroy();

		click(outside);
		expect(callback).not.toHaveBeenCalled();
	});
});
