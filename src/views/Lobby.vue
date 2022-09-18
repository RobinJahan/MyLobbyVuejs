<template>
  <div class="lobby" v-if="room.users">
    <div class="lobbyTitleContainer">
      <img class="lobbyTitle" src="@/assets/MyLobby.gif" alt="MyLobby">
    </div>
    <div class="lobbyContainer">
      <div class="usersListContainer">
        <div class="headerUserList">
          <div class="leaveBtnContainer">
            <button class="roundBtn" @click="userLeaveRoom">
            <span class="icon">
              <font-awesome-icon icon="fa-solid fa-person-walking-arrow-right" flip="horizontal"/>
            </span>
          </button>
          </div>
          <div class="numberUsersContainer"><span>{{room.users.length}}/{{room.maxUsers}}</span></div>
        </div>
        <div class="usersList">
          <UserCard v-for="user in room.users" :key="user.id"
          :user="user"
          :you="user.id === socket.id"
          :master="user.id === room.master"
          :kickable="user.id !== socket.id && userId === room.master"
          @kick="kickUser"
          />
          <UserCard v-for="(emptySlot, index) in room.maxUsers-room.users.length" :key="index"
          :user="{name: 'empty', avatar: 'avatar1.png'}"
          :empty="true"
          />
        </div>
        <div class="inviteBtnContainer">
          <button class="btn" @click="copyLink">Invite friends</button>
        </div>
      </div>
      <div class="rulesContainer">
        <div class="rules">
          <h2>Game rules</h2>
          <div class="settingsContainer">
            <LobbySetting
              settingLabel="Max players"
              :currentValue="maxUsers.toString()"
              leftBtnIcon="fa-minus"
              :disabledLeftButton="maxUsers <= room.users.length || maxUsers === 2 || userId !== room.master"
              rightBtnIcon="fa-plus"
              :disabledRightButton="maxUsers === 8 || userId !== room.master"
              @leftBtnClick="minusMaxUsers"
              @rightBtnClick="plusMaxUsers"
              />
            <LobbySetting
              settingLabel="Game Mode"
              :currentValue="gameModeList[gameMode]"
              :disabledLeftButton="userId !== room.master"
              :disabledRightButton="userId !== room.master"
              @leftBtnClick="prev('gameMode')"
              @rightBtnClick="next('gameMode')"
              />
          </div>
          <div>
            <button class="btn" @click="copyLink">Invite friends</button>
            <button class="btn" :disabled="room.users && userId !== room.master" @click="startGame">StartGame</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UserCard from '../components/UserCard.vue'
import LobbySetting from '../components/LobbySetting.vue'

export default {
  components: {
    UserCard, LobbySetting
  },
  data () {
    return {
      roomId: '',
      room: { id: null, master: null },
      userId: null,
      maxUsers: null,
      gameModeList: ['Normal', 'DeathMatch', 'Capture the flag'],
      gameMode: 0,
      info: ''
    }
  },
  props: {
    socket: {
      type: Object,
      required: true
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
        this.maxUsers = room.maxUsers
        this.gameMode = room.gameMode
      })

      this.socket.on('kicked', () => {
        this.socket.emit('kicked', this.roomId)
        this.$router.push({ name: 'Home', params: { event: 'kicked' } }).catch(() => {})
      })

      this.socket.on('gameStarted', () => {
        this.$router.push({ name: 'Game', params: { room: this.roomId } }).catch(() => {})
      })

      window.onpopstate = () => {
        this.socket.emit('userLeaveRoom', this.roomId)
        location.reload()
      }

      this.socket.on('notAllowed', () => {
        this.$router.push({ name: 'Home', params: { event: 'reload' } }).catch(() => {})
      })

      this.socket.on('error', (e) => {
        this.$emit('toast', { type: 'error', message: e })
      })

      this.socket.on('countdown', (count) => {
        this.$emit('countdown', count)
      })
    },
    update () {
      this.socket.emit('updatedRoom', this.roomId)
    },
    minusMaxUsers () {
      if (this.maxUsers > this.room.users.length && this.maxUsers > 2) {
        this.maxUsers--
        this.socket.emit('setMaxUsers', this.maxUsers)
      }
    },
    plusMaxUsers () {
      if (this.maxUsers < 8) {
        this.maxUsers++
        this.socket.emit('setMaxUsers', this.maxUsers)
      }
    },
    userLeaveRoom () {
      this.socket.emit('userLeaveRoom', this.roomId)
      this.$router.push({ name: 'Home', params: { event: 'reload' } }).catch(() => {})
    },
    kickUser (userId) {
      this.socket.emit('kickUser', userId)
    },
    startGame () {
      this.socket.emit('startGame')
    },
    checkUser () {
      this.socket.emit('checkUser')
    },
    copyLink () {
      navigator.clipboard.writeText(`${location.host}?join=${this.roomId}`)
      this.$emit('toast', { type: 'info', message: 'link was copied to the clipboard' })
    },
    prev (parameterName) {
      this.$data[parameterName] = this.$data[parameterName] <= 0 ? (this.$data[`${parameterName}List`].length - 1) : this.$data[parameterName] - 1
      this.socket.emit(`set-${parameterName}`, this.$data[parameterName])
    },
    next (parameterName) {
      this.$data[parameterName] = this.$data[parameterName] >= (this.$data[`${parameterName}List`].length - 1) ? 0 : this.$data[parameterName] + 1
      this.socket.emit(`set-${parameterName}`, this.$data[parameterName])
    }
  }
}
</script>

<style scoped>
.lobbyTitleContainer{
  width: 100%;
  height: 80px;
  display: flex;
  margin-bottom: 10px;
}
.lobbyTitle{
  height: 100%;
}
.lobbyContainer{
  width: 100%;
  height: 100%;
  display: flex;
}
.usersListContainer{
  min-width: 300px;
  background-color: #45454535;
  margin-top: 10px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.rulesContainer{
  margin-top: 10px;
  width: 100%;
  justify-content: center;
}
.headerUserList{
  display: flex;
  padding: 0px 10px 0px 10px
}
.leaveBtnContainer{
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.numberUsersContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
}
.rules{
  background-color: #45454535;
  width: 80%;
  margin-left: 10%;
  padding: 20px;
  border-radius: 10px;
}

h2{
  margin-top: 0;
}

.settingsContainer{
  width: 60%;
  margin-left: 20%;
}

@media (max-width: 1020px) {
  .lobbyContainer{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  }
  .rulesContainer{
  width: auto;
  }
  .rules{
  width: auto;
  margin-left: 0;
  padding: 20px;
  }

  .settingsContainer{
  width: 100%;
  margin-left: 0;
}
}
</style>
