'use strict';
/**
* @file Stream events
* @namespace client.stream
*/

/**
 * Notifies when an entity started being streamed.
 * @event entityStreamIn
 * @memberof client.stream
 * @param {object} entity - Streamed entity.
 * @fires getPlayerCustomSkin
 */
mp.events.add('entityStreamIn', (entity) => {
	if(entity.getType() === 4) {
		let model = entity.getModel();
    if (mp.game.joaat('mp_m_freemode_01') == model || mp.game.joaat('mp_f_freemode_01') == model) {
			mp.events.callRemote('getPlayerCustomSkin', entity);
			let walkingStyle = entity.getVariable('PLAYER_WALKING_STYLE');
			if(walkingStyle !== undefined) {
				entity.setMovementClipset(walkingStyle, 0.1);
			}
		}
	}
});

/**
 * Notifies when an entity stopped being streamed.
 * @event entityStreamIn
 * @memberof client.stream
 * @param {object} entity - Entity that stopped streaming.
 */
mp.events.add('entityStreamOut', (entity) => {
});
