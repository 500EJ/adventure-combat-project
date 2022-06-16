class Character {
  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) this.die();
  }

  die() {
    for (let i = 0; i < this.items.length; i++) {
      this.currentRoom.items.push(this.items[i]);
      this.items.splice(i, 1);
    }
    this.currentRoom = null;
  }
}

module.exports = {
  Character
};
