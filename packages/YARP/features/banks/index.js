'use strict';

yarp.server.buildBankMenu = (player) => {
  let menu = new yarp.Menu({id: 'Bank', offset: [0.1, 0.15]});
  menu.add({
    type: 'input',
    displayText: 'Available balance',
    inputText: player.character.bank,
    disabled: true,
  });
  menu.add({
    type: 'input',
    displayText: 'Withdraw',
    caption: 'Withdraw money.',
  });
  menu.add({
    type: 'input',
    displayText: 'Deposit',
    caption: 'Deposit money.',
  });
  menu.add({
    type: 'submenu',
    id: 'Transfer',
    displayText: 'Transfer',
    caption: 'Transfer money.',
    items: [
      {
        type: 'input',
        displayText: 'Target',
      },
      {
        type: 'input',
        displayText: 'Amount',
      },
      {
        displayText: 'Confirm',
      },
    ],
  });
  let balance = {
    type: 'submenu',
    id: 'Balance',
    displayText: 'Balance',
    caption: 'See your transactions.',
    items: [{
      displayText: 'Back',
    }],
  };
  for (let transfer of player.character.balance) {
    if (transfer) {
      switch (transfer.type) {
        case 'Payment':
          balance.items.push({
            type: 'input',
            displayText: 'Payment',
            inputText: transfer.value,
            caption: `You paid $${transfer.value}\nOn ${transfer.date.replace(' ', ' at ')}`,
            disabled: true,
          });
          break;
        case 'Withdraw':
          balance.items.push({
            type: 'input',
            displayText: 'Withdraw',
            inputText: transfer.value,
            caption: `You withdrew $${transfer.value}\nOn ${transfer.date.replace(' ', ' at ')}`,
            disabled: true,
          });
          break;
        case 'Deposit':
          balance.items.push({
            type: 'input',
            displayText: 'Deposit',
            inputText: transfer.value,
            caption: `You deposited $${transfer.value}\nOn ${transfer.date.replace(' ', ' at ')}`,
            disabled: true,
          });
          break;
        case 'Transfer':
          let caption = `You received $${transfer.value}\nSource: ${transfer.source}\nOn ${transfer.date.replace(' ', ' at ')}`;
          if (transfer.source == player.character.id) {
            caption = `You transferred $${transfer.value}\nTarget: ${transfer.target}\nOn ${transfer.date.replace(' ', ' at ')}`;
          }
          balance.items.push({
            type: 'input',
            displayText: 'Transfer',
            inputText: transfer.value,
            caption: caption,
            disabled: true,
          });
          break;
      }
    }
  }
  menu.add(balance);
  menu.add({
    type: 'close',
    displayText: 'Close',
  });
  return menu;
};

yarp.server.bindBankMenu = (player) => {
  let menu = yarp.server.buildBankMenu(player);
  menu.create(player);
  yarp.hotkeys['Open Menu'].bind(player, [menu]);
};

yarp.server.openBankMenu = (player) => {
  let menu = yarp.server.buildBankMenu(player);
  menu.create(player);
  menu.open(player);
};

yarp.server.closeBankMenu = (player) => {
  yarp.hotkeys['Open Menu'].unbind(player);
  yarp.menus['Bank'].close(player);
};

yarp.server.warnBankMenu = (player, i, caption) => {
  let menu = yarp.server.buildBankMenu(player);
  menu.items[i].caption += caption;
  menu.items[i].backgroundColor = [255, 35, 35, 50];
  menu.create(player);
  menu.open(player);
};

yarp.server.add.menuItemClicked = async (player, data) => {
  if (data._menuId == 'Bank') {
    let inputs = [];
    let passed = false;
    switch (data._index) {
      case 1:
        inputs = await yarp.menus['Bank'].getItemsByIndex(player, [1]);
        passed = yarp.server.verifyBankInputs(player, inputs);
        if (passed) {
          if (player.character.tryWithdraw(Number(inputs[1].inputText))) {
            yarp.server.openBankMenu(player);
          } else {
            yarp.server.warnBankMenu(player, 1, '\nNot enough money!');
          }
        } else {
          yarp.server.warnBankMenu(player, 1, '\nOnly numbers allowed!');
        }
        break;
      case 2:
        inputs = await yarp.menus['Bank'].getItemsByIndex(player, [2]);
        passed = yarp.server.verifyBankInputs(player, inputs);
        if (passed) {
          if (player.character.tryDeposit(Number(inputs[2].inputText))) {
            yarp.server.openBankMenu(player);
          } else {
            yarp.server.warnBankMenu(player, 2, '\nNot enough money!');
          }
        } else {
          yarp.server.warnBankMenu(player, 2, '\nOnly numbers allowed!');
        }
        break;
    }
  } else if (data._menuId == 'Transfer') {
    if (data._index == 2) {
      let inputs = await yarp.client.getMenuItemsByIndex(player, 'Transfer', [0, 1]);
      let passed = yarp.server.verifyBankInputs(player, [inputs[1]]);
      if (passed) {
        if (yarp.characters[inputs[0].inputText]) {
          if (player.character.tryTransfer(yarp.characters[inputs[0].inputText], Number(inputs[1].inputText))) {
            yarp.server.openBankMenu(player);
          } else {
            yarp.server.warnBankMenu(player, 3, '\nNot enough money!');
          }
        } else {
          yarp.server.warnBankMenu(player, 3, '\nTarget account not found!');
        }
      } else {
        yarp.server.warnBankMenu(player, 3, '\nOnly numbers allowed for amount!');
      }
    }
  }
};

yarp.server.verifyBankInputs = (player, inputs) => {
  let regx = /[^0-9]/i;
  let passed = true;
  for (let input of inputs) {
    if (input) {
      if (regx.test(input.inputText)) {
        passed = false;
      }
    }
  }
  return passed;
};
