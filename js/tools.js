var tools = {
  updateHealthBar: function (width) {
    $('#health_filler').width(width + '%')
  },
  updateKill: function (killed, killer) {
    $('#info_pannel').prepend(
      '<div class="info_kill"><span class="killer">' +
        killer +
        '</span> killed <span class="killed">' +
        killed +
        '</span></div>'
    )
  },
  updatePlayerJoind: function (name) {
    $('#info_pannel').prepend(
      '<div class="info_kill">' + name + ' joined</div>'
    )
  },
  updatePlayerLeft: function (name) {
    $('#info_pannel').prepend('<div class="info_kill">' + name + ' left</div>')
  },
  showGunPointer: function () {
    $('#gunsight').show()
  },
  hideGunPointer: function () {
    $('#gunsight').hide()
  },
  hideUserInput: function () {
    $('#enter_user_name').fadeOut()
  },
  hideDeadPannel: function () {
    $('#you_are_dead').hide()
  },
  showDeadPannel: function () {
    $('#you_are_dead').fadeIn()
  },
  createCollide: function (game, a, b, fn) {
    game.physics.world.collide(a, b, fn)
  },
}
