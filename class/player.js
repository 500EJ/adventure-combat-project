const { Character } = require("./character");
const { Enemy } = require("./enemy");
const { Food } = require("./food");

class Player extends Character {
  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    const itemIndex = this.currentRoom.items.findIndex(
      item => item.name === itemName
    );
    this.items.push(this.currentRoom.items[itemIndex]);
    this.currentRoom.items.splice(itemIndex, 1);
  }

  dropItem(itemName) {
    const itemIndex = this.items.findIndex(item => item.name === itemName);
    this.currentRoom.items.push(this.items[itemIndex]);
    this.items.splice(itemIndex, 1);
  }

  eatItem(itemName) {
    if (this.items.find(item => item.name === itemName) instanceof Food) {
      this.items.splice(
        this.items.findIndex(item => item.name === itemName),
        1
      );
    }
  }

  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  hit(name) {
    const enemy = this.currentRoom.getEnemyByName(name);
    enemy.health -= this.strength;
    enemy.attackTarget = this;
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}

module.exports = {
  Player
};
