/**
 * Shared scalar that drives the cursor -> portrait morph.
 * 0 = shards form the cursor, 1 = shards form the photo.
 * Written by the Hero scroll timeline, read every frame by `ShardPortrait`.
 */
export const portraitProgress = { value: 0 };

/** Cursor arrow height inside the shard canvas, as a fraction of the canvas height. */
export const PORTRAIT_CURSOR_HEIGHT = 0.62;

/** Visible arrow height / SVG viewBox height (y: 2 -> 21 of a 24 viewBox). Used to size the DOM cursor to match. */
export const CURSOR_ARROW_RATIO = 19 / 24;
