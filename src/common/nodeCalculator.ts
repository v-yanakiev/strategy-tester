import type { Cell } from '@maxgraph/core';

export function isCondition(node: Cell) {
    return (
        (node.value as string).startsWith('If') ||
        (node.value as string).startsWith('While')
    );
}
