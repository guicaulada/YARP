'use strict';
/**
 * @file Entity events
 * @namespace entity
 */

/**
 * Entity created.
 * @event entityCreated
 * @memberof entity
 * @param {object} entity - The entity that called the event.
 */
mp.events.add('entityCreated', (entity) => {
});

/**
 * Entity destroyed.
 * @event entityDestroyed
 * @memberof entity
 * @param {object} entity - The entity that called the event.
 */
mp.events.add('entityDestroyed', (entity) => {
});

/**
 * Entity model change.
 * @event entityModelChange
 * @memberof entity
 * @param {object} entity - The entity that called the event.
 * @param {number} oldModel - Hash of the old model.
 */
mp.events.add('entityModelChange', (entity, oldModel) => {
});
