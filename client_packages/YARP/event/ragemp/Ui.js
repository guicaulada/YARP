'use strict';
/**
* @file Ui events
*/
mp.events.add("displayHelpText", (text) => {
  mp.game.ui.setTextComponentFormat("STRING");
  mp.game.ui.addTextComponentSubstringPlayerName(text);
  mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
});

mp.events.add("clearHelpText", () => {
  mp.game.ui.clearHelp(true);
});
