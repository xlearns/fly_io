function bullet(x, y, angle, game, player) {
  if (lock) {
    createBullet(x, y, angle, game, player)
  }
}
function createBullet(x, y, angle, game, player) {
  lock = false
  $('#bullter').html('弹药冷却中')
  let sprite
  const w = 40
  const h = 40
  if (angle === 0) {
    sprite = game.physics.add.image(x + w / 2 - 2, y, 'bullet')
  } else if (angle === -180) {
    sprite = game.physics.add.image(x + w / 2 - 2, y + h, 'bullet')
  } else if (angle === 90) {
    sprite = game.physics.add.image(x + w - 2, y + h / 2 - 2, 'bullet')
  } else if (angle === -90) {
    sprite = game.physics.add.image(x - 2, y + h / 2 - 2, 'bullet')
  }
  socket.emit('new-bullter', {
    x: sprite.x,
    y: sprite.y,
    angle: angle,
  })
  btRun(sprite, angle, player, game)
  sprite.setAngle(angle)
  return sprite
}
function btRun(sprite, angle, player, game) {
  var timer = setInterval(() => {
    if (
      sprite.x >= map.w ||
      sprite.x <= 0 ||
      sprite.y >= map.h ||
      sprite.y <= 0
    ) {
      clearInterval(timer)
      sprite.destroy()
      player.attack = true
      socket.emit('die-bullter')
      $('#bullter').html('弹药准备完毕')
      lock = true
    } else {
      if (angle == 0) {
        sprite.y -= 10
      } else if (angle === -180) {
        sprite.y += 10
      } else if (angle === 90) {
        sprite.x += 10
      } else if (angle === -90) {
        sprite.x -= 10
      }
      playerAddCollder(game, sprite, player)
    }
  }, 30)
}
function playerAddCollder(game, sprite, own) {
  for (let id in otherPlayers) {
    let Airplanes = otherPlayers[id]
    let { player } = Airplanes
    tools.createCollide(game, player, sprite, function () {
      sprite.destroy()
      own.attack = true
      lock = true
      socket.emit('die-bullter')
      $('#bullter').html('弹药准备完毕')
    })
  }
}
