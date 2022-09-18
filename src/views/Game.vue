<template>
    <div class="rooms">
      <p>Sorry, there is no game yet... So.. click on the other players, the last one left wins</p>
      <div class="playerList" v-if="playerList">
        <span class="player" v-for="player in playerList" :key="player.id" @click="click(player.id)">
          <Player :name="player.name" :avatar="player.avatar" :unclicked="player.unclicked" :winner="player.id === (winner && winner.id)"/>
        </span>
      </div>
      <div v-if="winner">
        <p>The Winner is {{winner.name}} !!! return to Lobby in few seconds</p>
      </div>
    </div>
</template>

<script>

import Player from '../components/Player.vue'

export default {
  components: {
    Player
  },
  data () {
    return {
      roomId: '',
      room: { id: null, master: null, game: { players: [] } },
      userId: null,
      winner: null,
      countdonwToLobby: 8
    }
  },
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  watch: {
    winner () {
      setTimeout(() => {
        if (this.userId === this.room.game.players[0].id) {
          this.socket.emit('returnLobby')
        }
      }, 6000)
    }
  },
  computed: {
    playerList () {
      return this.room.game.players
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    }
  },
  async created () {
    this.checkUser()
    this.setEvents()

    this.roomId = this.$route.params.room
    this.userId = this.socket.id

    this.update()
  },
  methods: {
    setEvents () {
      this.socket.on('updatedRoom', (room) => {
        this.room = room
      })

      this.socket.on('winner', (winner) => {
        this.winner = winner
      })

      this.socket.on('returnLobby', () => {
        this.$router.push({ name: 'Lobby', params: { room: this.roomId } })
      })

      this.socket.on('notAllowed', () => {
        this.$router.push({ name: 'Home', params: { event: 'reload' } })
      })

      this.socket.on('error', (e) => {
        this.$emit('toast', { type: 'error', message: e })
      })

      this.socket.on('countdown', (count) => {
        this.$emit('countdown', count)
      })

      this.socket.on('returnLobby', () => {
        this.$router.push({ name: 'Lobby', params: { room: this.roomId } }).catch(() => {})
      })
    },
    update () {
      this.socket.emit('updatedRoom', this.roomId)
    },
    userLeaveRoom () {
      this.socket.emit('userLeaveRoom', this.roomId)
      this.$router.push({ name: 'Home' })
    },
    checkUser () {
      this.socket.emit('checkUser')
    },
    click (id) {
      const player = this.room.game.players.find(player => id === player.id)
      if (player.unclicked) {
        this.socket.emit('clickPlayer', id)
      }
    }
  }
}
</script>

<style>
  .playerList{
    width: 100%;
  }
  .player{
    display: flex;
    justify-content: center;
  }
</style>
