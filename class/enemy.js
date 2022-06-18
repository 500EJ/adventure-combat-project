const { Character } = require("./character");

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
    this.act();
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    debugger;
    const roomIndex = Math.floor(
      Math.random() * this.currentRoom.getExits().length
    );
    const direction = this.currentRoom.getExits()[roomIndex];
    this.currentRoom = this.currentRoom.getRoomInDirection(direction);
    this.cooldown += 3000;
    this.act();
  }

  takeSandwich() {
    const sandwichIndex = this.currentRoom.items.findIndex(
      item => item.name === "sandwich"
    );
    this.items.push(this.currentRoom.items[sandwichIndex]);
    this.currentRoom.items.splice(sandwichIndex, 1);
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(() => {
      resetCooldown();
    }, this.cooldown);
  }

  attack() {
    this.applyDamage(this.strength);
    if (this.attackTarget.health === 0) {
      this.attackTarget.die();
      this.attackTarget = null;
    }
    this.cooldown += 3000;
    this.act();
  }

  applyDamage(amount) {
    this.attackTarget.health -= amount;
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else if (
      this.attackTarget &&
      this.attackTarget.currentRoom === this.currentRoom
    ) {
      this.attack();
    } else if (this.attackTarget) {
      this.randomMove();
    } else if (this.currentRoom.getItemByName("sandwich")) {
      this.takeSandwich();
    } else {
      this.scratchNose();
      this.rest();
    }
  }

  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} scratches its nose`);
    this.act();
  }
}

module.exports = {
  Enemy
};
