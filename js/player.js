function createPlayer(x, y, game) {
  const sprite = game.physics.add.image(x, y, 'player')
  return sprite
}
function player(x, y, game, socket, name) {
  cursors = game.input.keyboard.createCursorKeys()
  const player = {
    player: createPlayer(x, y, game),
    speed: 200,
    Angle: 0,
    hp: 10,
    name: name,
    attack: true,
    drive(game) {
      this.emitPlayerData()
      this.player.setVelocity(0)
      if (cursors.space.isDown) {
        this.attack = false
        this.speed = 200
        bullet(this.player.body.x, this.player.body.y, this.Angle, game, this)
      }
      if (cursors.left.isDown) {
        this.Angle = -90
        this.speed = 200
        this.player.setVelocityX(-this.speed)
      } else if (cursors.right.isDown) {
        this.Angle = 90
        this.speed = 200
        this.player.setVelocityX(this.speed)
      } else if (cursors.up.isDown) {
        this.Angle = 0
        this.speed = 200
        this.player.setVelocityY(-this.speed)
      } else if (cursors.down.isDown) {
        this.Angle = -180
        this.speed = 200
        this.player.setVelocityY(this.speed)
      } else {
        this.speed = 0
      }
      this.player.setAngle(this.Angle)
    },
    emitPlayerData() {
      socket.emit('move-player', {
        x: this.player.body.x,
        y: this.player.body.y,
        angle: this.Angle,
        speed: this.speed,
        attack: this.attack,
        name: name,
      })
    },
  }
  return player
}
