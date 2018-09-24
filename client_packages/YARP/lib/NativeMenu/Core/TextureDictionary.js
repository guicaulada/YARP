'use strict';
/**
 * Implements a texture dictionary.
 */
class TextureDictionary {
  /**
   *Creates an instance of TextureDictionary.
   * @param {String} textureDict
   * @param {String} textures
   * @memberof TextureDictionary
   */
  constructor(textureDict, textures) {
    this.textureDictionary = textureDict;
    this.textures = textures;
  }

  /**
   * Draws texture.
   * @param {String} textureName
   * @param {Number} screenX
   * @param {Number} screenY
   * @param {Number} scaleX
   * @param {Number} scaleY
   * @param {NativeMenu.Color} [color=new NativeMenu.Color(255, 255, 255)]
   * @param {Number} [heading=0]
   * @memberof TextureDictionary
   */
  draw(textureName, screenX, screenY, scaleX, scaleY, color = new NativeMenu.Color(255, 255, 255), heading = 0) {
    if (this.textures.indexOf(textureName) !== -1) {
      if (mp.game.graphics.hasStreamedTextureDictLoaded(this.textureDictionary) == false) {
        mp.game.graphics.requestStreamedTextureDict(this.textureDictionary, true);
      }
      mp.game.graphics.drawSprite(this.textureDictionary, textureName, screenX, screenY, scaleX, scaleY, heading, color.red, color.green, color.blue, color.alpha);
    }
  }
}

exports = TextureDictionary;
