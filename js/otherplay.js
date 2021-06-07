function playerMovementInterpolation(otherPlayers, game) {
  for (let id in otherPlayers) {
    let Airplanes = otherPlayers[id]
    let { player } = Airplanes
    if (Airplanes.target_x !== undefined) {
      player.body.x += (Airplanes.target_x - player.body.x) * 0.3
      player.body.y += (Airplanes.target_y - player.body.y) * 0.3
      player.setAngle(Airplanes.angle)
      if (Airplanes['dan']) {
        if (Airplanes['attack']) {
          let { x, y, angle } = Airplanes['dan']
          let sprite
          const w = 40
          const h = 40
          if (angle == 0) {
            sprite = game.physics.add.image(x, y, 'bullet')
          } else if (angle == -180) {
            sprite = game.physics.add.image(x, y, 'bullet')
          } else if (angle == 90) {
            sprite = game.physics.add.image(x, y, 'bullet')
          } else if (angle == -90) {
            sprite = game.physics.add.image(x, y, 'bullet')
          }
          btGo(sprite, angle, game, Airplanes)
          sprite.setAngle(angle)
        }
      }
    }
  }
}

function allCollder(game, sprite, player) {
  let own = player
  tools.createCollide(game, game.player.player, sprite, function () {
    sprite.destroy()
    if (game.player.hp <= 0) {
      console.log(game)
      socket.emit('announcement', {
        status: 'die',
        winner: player.name,
        loser: game.player.name,
      })
      socket.emit('die-player')
      game.scene.switch('End')
    } else {
      game.player.hp -= 1
      $('#health_filler').css('width', game.player.hp * 10 + '%')
    }
  })
  for (let id in otherPlayers) {
    let Airplanes = otherPlayers[id]
    let { player } = Airplanes
    if (Airplanes.name != own.name) {
      tools.createCollide(game, player, sprite, function () {
        sprite.destroy()
      })
    }
  }
}
function btGo(sprite, angle, game, player) {
  var timer = setInterval(() => {
    if (
      sprite.x >= map.w ||
      sprite.x <= 0 ||
      sprite.y >= map.h ||
      sprite.y <= 0
    ) {
      clearInterval(timer)
      sprite.destroy()
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
      allCollder(game, sprite, player)
    }
  }, 30)
}
