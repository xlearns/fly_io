const newPlayer = (socket, Airplanes, self) => {
  let { player } = Airplanes
  socket.on('connect', () => {
    socket.emit('new-player', {
      x: player.body.x,
      y: player.body.y,
      angle: self.Angle,
      speed: self.speed,
      name: self.name,
      hp: 5,
    })
  })
}
const updatePlayers = (socket, otherPlayers, game) => {
  socket.on('announcement', (data) => {
    let { status } = data
    if (status == 'die') {
      let { winner, loser } = data
      $('.killer_public').html(`${winner} 击杀了 ${loser} ！`)
      setTimeout(function () {
        $('.killer_public').html('')
      }, 5000)
    }
  })
  socket.on('update-bullter', (playersData) => {
    let playersFound = {}
    for (let index in playersData) {
      const datao = playersData[index]
      if (otherPlayers[index]) {
        if (datao['dan']) {
          otherPlayers[index]['dan'] = datao['dan']
        }
      }
    }
  })
  socket.on('update-players', (playersData) => {
    let playersFound = {}
    for (let index in playersData) {
      const data = playersData[index]

      if (otherPlayers[index] === undefined && index !== socket.id) {
        const newPlayer = player(data.x, data.y, game)
        tools.updatePlayerJoind(data.name)
        otherPlayers[index] = newPlayer
      }
      playersFound[index] = true
      if (otherPlayers[index]) {
        otherPlayers[index].target_x =
          data.target_x || data.target_x == 0 ? data.target_x : data.x
        otherPlayers[index].target_y =
          data.target_y || data.target_y == 0 ? data.target_y : data.y
        otherPlayers[index].angle = data.angle ? data.angle : ''
        otherPlayers[index].speed = data.speed ? data.speed : ''
        otherPlayers[index].attack = data.attack ? data.attack : false
        otherPlayers[index].name = data.name ? data.name : ''
        if (data['dan']) {
          otherPlayers[index]['dan'] = data['dan']
        } else {
          otherPlayers[index]['dan'] = undefined
        }
      }
    }
    for (let id in otherPlayers) {
      if (!playersFound[id]) {
        otherPlayers[id].player.destroy()
        delete otherPlayers[id]
      }
    }
  })
}
