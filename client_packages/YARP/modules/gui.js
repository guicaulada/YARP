//Credits to https://github.com/MrDaGree/guimanagement
GUI = {};
Menu = {};
Menus = {};

GUI.maxVisOptions = 10;
GUI.titleText = [255, 255, 255, 255, 7];
GUI.titleRect = [52, 73, 94, 255];
GUI.optionText = [255, 255, 255, 255, 6];
GUI.optionRect = [40, 40, 40, 190];
GUI.scroller = [127, 140, 140, 240];

var menuOpen = false;
var prevMenu = null;
var curMenu = null;
var titleTextSize = [0.85, 0.85];
var titleRectSize = [0.23, 0.085];
var optionTextSize = [0.5, 0.5];
var optionRectSize = [0.23, 0.035];
var menuX = 0.7;
var menuYModify = 0.3174; //Default: 0.1174
var menuYOptionDiv = 9.1; //Default: 3.56
var menuYOptionAdd = 0.342; //Default: 0.142
var buttonPressed = false;
var selectPressed = false;
var leftPressed = false;
var rightPressed = false;
var currentOption = 1;
var optionCount = 0;

Menu.IsOpen = function(){
	return menuOpen == true;
}

Menu.SetupMenu = function(menu, title){
  Menus[menu] = {};
  Menus[menu].title = title;
  Menus[menu].optionCount = 0;
  Menus[menu].options = {};
  currentOption = 1;
}

Menu.addOption = function(menu, option){
	if (!(Menus[menu].title == null)){
		Menus[menu].optionCount = Menus[menu].optionCount + 1;
		Menus[menu].options[Menus[menu].optionCount] = option;
	}
}

Menu.Switch = function(prevmenu, menu){
	curMenu = menu;
	prevMenu = prevmenu;
}

Menu.DisplayCurMenu = function(){
	if (!(curMenu == "")) {
		menuOpen = true;
		Menu.Title(Menus[curMenu].title);
		for (v of Menus[curMenu].options){
			v();
		}
		Menu.updateSelection()
	}
}

GUI.Text = function(text, color, position, size, center){
  mp.game.graphics.drawText(text, [position[0], position[1]], {
    font: color[4],
    color: [color[0], color[1], color[2], color[3]],
    scale: [size[0], size[1]],
    outline: true
  });
}

GUI.Rect = function(color, position, size){
	mp.game.graphics.drawRect(position[0], position[1], size[0], size[1], color[0], color[1], color[2], color[3]);
}

Menu.Title = function(title){
	GUI.Text(title, GUI.titleText, [menuX, menuYModify - 0.02241], titleTextSize, true);
	GUI.Rect(GUI.titleRect, [menuX, menuYModify], titleRectSize);
}

Menu.Option = function(option){
	optionCount = optionCount + 1;

	var thisOption = null
	if(currentOption == optionCount) {
		thisOption = true;
	} else {
		thisOption = false;
	}

	if(currentOption <= GUI.maxVisOptions && optionCount <= GUI.maxVisOptions) {
		GUI.Text(option, GUI.optionText, [menuX - 0.1, ((menuYOptionAdd - 0.018) + (optionCount / menuYOptionDiv) * menuYModify)],  optionTextSize, false);
		GUI.Rect(GUI.optionRect, [ menuX, (menuYOptionAdd + (optionCount / menuYOptionDiv) * menuYModify) ], optionRectSize);
		if(thisOption) {
			GUI.Rect(GUI.scroller, [ menuX, (menuYOptionAdd + (optionCount / menuYOptionDiv) * menuYModify) ], optionRectSize);
		}
	} else if (optionCount > currentOption - GUI.maxVisOptions && optionCount <= currentOption) {
		GUI.Text(option, GUI.optionText, [menuX - 0.1, ((menuYOptionAdd - 0.018) + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify)],  optionTextSize, false);
		GUI.Rect(GUI.optionRect, [ menuX, (menuYOptionAdd + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify) ], optionRectSize);
		if(thisOption) {
			GUI.Rect(GUI.scroller, [ menuX, (menuYOptionAdd + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify) ], optionRectSize);
		}
	}

	if (optionCount == currentOption && selectPressed) {
		return true;
	}

	return false;
}

Menu.changeMenu = function(option, menu){
	if (Menu.Option(option)){
		Menu.Switch(curMenu, menu);
	}

	if(currentOption <= GUI.maxVisOptions && optionCount <= GUI.maxVisOptions) {
		GUI.Text(">>", GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + (optionCount / menuYOptionDiv) * menuYModify)], optionTextSize, true);
	} else if(optionCount > currentOption - GUI.maxVisOptions && optionCount <= currentOption) {
		GUI.Text(">>", GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify)], optionTextSize, true);
	}

	if (optionCount == currentOption && selectPressed) {
		return true;
	}

	return false;
}

Menu.Bool = function(option, bool, cb){
	Menu.Option(option)

	if(currentOption <= GUI.maxVisOptions && optionCount <= GUI.maxVisOptions) {
		if(bool) {
			GUI.Text("~g~ON", GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + (optionCount / menuYOptionDiv) * menuYModify)], optionTextSize, true);
		} else {
			GUI.Text("~r~OFF", GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + (optionCount / menuYOptionDiv) * menuYModify)], optionTextSize, true);
		}
	} else if(optionCount > currentOption - GUI.maxVisOptions && optionCount <= currentOption) {
		if(bool) {
			GUI.Text("~g~ON", GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify)], optionTextSize, true);
		} else {
			GUI.Text("~r~OFF", GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify)], optionTextSize, true);
		}
	}

	if (optionCount == currentOption && selectPressed) {
		cb(!bool);
		return true;
	}

	return false;
}

Menu.Int = function(option, int, min, max, cb){
	Menu.Option(option);

	if (optionCount == currentOption) {
		if (leftPressed) {
			if(int > min) {
        int = int - 1;
      } else {
        int = max;
      }// : _int = max;
		}
		if (rightPressed) {
			if(int < max){
        int = int + 1;
      } else {
        int = min;
      }
		}
	}

	if (currentOption <= GUI.maxVisOptions && optionCount <= GUI.maxVisOptions) {
		GUI.Text(`${int}`, GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + (optionCount / menuYOptionDiv) * menuYModify)], optionTextSize, true);
	} else if (optionCount > currentOption - GUI.maxVisOptions && optionCount <= currentOption) {
		GUI.Text(`${int}`, GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify)], optionTextSize, true);
	}

	if (optionCount == currentOption && selectPressed) {
    cb(int);
    return true;
  } else if (optionCount == currentOption && leftPressed) {
    cb(int);
  } else if (optionCount == currentOption && rightPressed) {
    cb(int);
  }
	return false;
}

Menu.StringArray = function(option, array, position, cb){

	Menu.Option(option);

	if (optionCount == currentOption) {
		var max = array.length-1;
		var min = 0;
		if (leftPressed) {
			if(position > min) {
        position = position - 1;
      } else {
        position = max;
      }
		}
		if (rightPressed) {
			if(position < max) {
        position = position + 1;
      } else {
        position = min;
      }
		}
	}

	if (currentOption <= GUI.maxVisOptions && optionCount <= GUI.maxVisOptions) {
		GUI.Text(array[position], GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + (optionCount / menuYOptionDiv) * menuYModify)], optionTextSize, true);
	} else if (optionCount > currentOption - GUI.maxVisOptions && optionCount <= currentOption) {
		GUI.Text(array[position], GUI.optionText, [ menuX + 0.068, ((menuYOptionAdd - 0.018) + ((optionCount - (currentOption - GUI.maxVisOptions)) / menuYOptionDiv) * menuYModify)], optionTextSize, true);
	}

	if (optionCount == currentOption && selectPressed) {
    cb(position);
    return true;
  } else if (optionCount == currentOption && leftPressed) {
    cb(position);
  } else if (optionCount == currentOption && rightPressed) {
    cb(position);
  }

	return false;
}

Menu.updateSelection = function(){
	selectPressed = false;
	leftPressed = false;
	rightPressed = false;
	if (mp.keys.isDown(40) === true && !buttonPressed) {
    buttonPressed = true;
		if(currentOption < optionCount) {
			currentOption = currentOption + 1;
		} else {
			currentOption = 1;
		}
	} else if (mp.keys.isDown(38) === true && !buttonPressed) {
    buttonPressed = true;
		if(currentOption > 1) {
			currentOption = currentOption - 1;
		} else {
			currentOption = optionCount;
		}
	} else if (mp.keys.isDown(37) === true && !buttonPressed) {
    buttonPressed = true;
		leftPressed = true;
	} else if (mp.keys.isDown(39) === true && !buttonPressed) {
    buttonPressed = true;
		rightPressed = true;
	} else if (mp.keys.isDown(13) === true && !buttonPressed) {
    buttonPressed = true;
		selectPressed = true;
	} else if (mp.keys.isDown(8) === true && !buttonPressed) {
    buttonPressed = true;
		if (prevMenu == null) {
			Menu.Switch(null, "");
			menuOpen = false;
		}
		if (prevMenu != null) {
			Menu.Switch(null, prevMenu);
		}
	} else if (mp.keys.isDown(192) === true && !buttonPressed) {
    buttonPressed = true;
    mp.events.call('GUI:Destroy');
  }
	optionCount = 0;
}

mp.events.add('GUI:Title', (title) => {
	Menu.Title(title);
})

mp.events.add('GUI:Option', (option, cb) => {
	cb(Menu.Option(option));
})

mp.events.add('GUI:Bool', (option, bool, cb) => {
	Menu.Bool(option, bool, function(data){
		cb(data);
	})
})

mp.events.add('GUI:Int', (option, int, min, max, cb) => {
	Menu.Int(option, int, min, max, function(data){
		cb(data);
	})
})

mp.events.add('GUI:StringArray', (option, array, position, cb) => {
	Menu.StringArray(option, array, position, function(data){
		cb(data);
	})
})

mp.events.add('GUI:Update', () => {
	Menu.updateSelection();
})

mp.events.add('GUI:Create', (newmenu) => {
	menu = JSON.parse(newmenu);
  buttonPressed = true;
})

mp.events.add('GUI:Destroy', (newmenu) => {
	menu = null;
})

var menu = null;
var bools = {};
var ints = {};
var positions = {};
var arrays = {};
mp.events.add('render', () => {
	if(menu != null) {
    mp.events.call("GUI:Title", `${menu.title}`);
    for (option in menu.options){
      if (menu.options[option].type == null || menu.options[option].type == "default") {
        mp.events.call("GUI:Option", option, function(cb){
          if (cb && menu.options[option].event != null) {
            let args = menu.options[option].event.slice(1,menu.options[option].event.length);
		        mp.events.callRemote(menu.options[option].event[0], option, args);
          }
        });
      } else if (menu.options[option].type == "bool") {
        if (bools[option] == null) {
          bools[option] = false;
        }
        mp.events.call("GUI:Bool", option, bools[option], function(cb){
          if (menu.options[option].event != null && cb != bools[option]){
            let args = menu.options[option].event.slice(1,menu.options[option].event.length);
		        mp.events.callRemote(menu.options[option].event[0], cb, args);
          }
          bools[option] = cb;
        });
      } else if (menu.options[option].type == "int") {
        if (ints[option] == null) {
          if (menu.options[option].min == null){
            menu.options[option].min = 0;
          }
          if (menu.options[option].max == null){
            menu.options[option].max = 100
          }
          ints[option] = menu.options[option].min;
        }
        mp.events.call("GUI:Int", option, ints[option], menu.options[option].min, menu.options[option].max, function(cb){
          if (menu.options[option].event != null && cb != ints[option]){
            let args = menu.options[option].event.slice(1,menu.options[option].event.length);
		        mp.events.callRemote(menu.options[option].event[0], cb, args);
          }
          ints[option] = cb;
        });
      } else if (menu.options[option].type == "array") {
        if (arrays[option] == null) {
          if (menu.options[option].array == null){
            menu.options[option].array = [];
          }
          arrays[option] = menu.options[option].array;
          positions[option] = 0;
        }
        mp.events.call("GUI:StringArray", option, arrays[option], positions[option], function(cb){
          if (menu.options[option].event != null && cb != positions[option]){
            let args = menu.options[option].event.slice(1,menu.options[option].event.length);
		        mp.events.callRemote(menu.options[option].event[0], cb, args);
          }
          positions[option] = cb;
        });
      }
    }
    mp.events.call("GUI:Update");
	}
})

setInterval(() => {
  buttonPressed = false;
}, 500)
