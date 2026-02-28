/**
 * Pending "from" rect buffer for the flying-tile animation.
 *
 * Populated by the ACTION event handler (app-service) when a Drop action is
 * received — at that moment the tile is still in the player's hand DOM and its
 * position can be measured. Consumed by DiscardTiles once the tile's landing
 * position is also known, so both rects are passed to the animation store
 * atomically via startFlightImmediate.
 */
const registry = new Map<number, DOMRect>();

export const tilePositionRegistry = {
  capture: (tileId: number, rect: DOMRect) => registry.set(tileId, rect),
  get: (tileId: number): DOMRect | undefined => registry.get(tileId),
  delete: (tileId: number) => registry.delete(tileId),
};
