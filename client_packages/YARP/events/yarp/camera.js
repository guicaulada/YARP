'use strict';
/**
 * Camera events
 */

/**
 * Creates a camera.
 * @function createCamera
 * @memberof yarp.client
 * @param {String} id The camera id.
 * @param {Object} camera Camra parameters.
 */
yarp.client.createCamera = (id, camera) => {
  yarp.cameras[id] = mp.cameras.new(id, camera.position, new mp.Vector3(0, 0, 0), 45);
  yarp.cameras[id].pointAtCoord(camera.look);
  yarp.cameras[id].setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
};

/**
 * Executes a camera function.
 * @function cameraExecute
 * @memberof yarp.client
 * @param {String} id The camera id.
 * @param {String} func The function name.
 * @param {String} args The function argumetns.
 */
yarp.client.cameraExecute = (id, func, args) => {
  yarp.cameras[id][func](...args);
};

/**
 * Destroys a camera.
 * @function createCamera
 * @memberof yarp.client
 * @param {String} id The camera id.
 */
yarp.client.destroyCamera = (id) => {
  yarp.cameras[id].destroy();
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
};
