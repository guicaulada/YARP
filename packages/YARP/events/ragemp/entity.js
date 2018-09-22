'use strict';
/**
 * Entity events
 * @memberof ragemp.server
 */

/**
 * Entity created.
 * @event entityCreated
 * @memberof ragemp.server
 * @param {Object} entity The entity that called the event.
 */
mp.events.add('entityCreated', (entity) => {
});

/**
 * Entity destroyed.
 * @event entityDestroyed
 * @memberof ragemp.server
 * @param {Object} entity The entity that called the event.
 */
mp.events.add('entityDestroyed', (entity) => {
});

/**
 * Entity model change.
 * @event entityModelChange
 * @memberof ragemp.server
 * @param {Object} entity The entity that called the event.
 * @param {Number} oldModel Hash of the old model.
 */
mp.events.add('entityModelChange', (entity, oldModel) => {
});
