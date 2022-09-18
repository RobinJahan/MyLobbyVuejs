<template>
  <div class="home">
    <img class="homeTitle" src="@/assets/MyLobby.gif" alt="MyLobby">
    <div class="formHomeInfoContainer">
      <div class="form">
        <div class="label">1 - Write your name</div>
        <input class="inputName input" v-model="name" type="text" maxlength="16">
        <div class="label">2 - Choose an avatar</div>

        <div class="avatarSelectContainer">
          <!-- <img :src="require(`@/assets/avatars/${avatar}`)" alt="avatar" ref="avatar"> -->
          <div class="avatar" ref="avatar" :style="{ backgroundPosition: `0px ${1200 - (200 * avatar)}px`}"></div>
          <button class="roundBtn avatarBtn" @click="changeAvatar">
            <span class="icon">
              <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" />
            </span>
          </button>
        </div>

        <div class="label">3 - Join the lobby and invite friends</div>
        <button v-if="!roomToJoin || error" class="btn" @click="createRoom" :disabled="!this.name.trim()">Create room</button>
        <button v-if="roomToJoin" class="btn" @click="joinRoom" :disabled="!this.name.trim()">Join room</button>

      </div>
      <div class="homeInfoContainer">
        <div class="homeInfo">
          <p>
            MyLobby is a lobby template for my futur web games.
          </p>
          <p>
            In this web app, you can choose a name, an avatar, create a lobby or join a lobby from a link. There are few settings that the lobby master can manage.
          </p>
          <p>
            All that's left is to develop web games 😊
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      avatar: 2,
      avatarList: [1, 2, 3, 4, 5],
      roomToJoin: null,
      error: false
    }
  },
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  created () {
    // this.avatarList = require.context('@/assets/avatars', true, /^.*\.png$/).keys().map(i => i.substring(2))

    this.name = localStorage.getItem('name') ? localStorage.getItem('name') : ''
    this.avatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : 2

    this.roomToJoin = this.$route.query.join ? this.$route.query.join : null
    this.socket.on('error', (e) => {
      this.$emit('toast', { type: 'error', message: e })
    })

    if (this.$route.params.event === 'kicked') {
      this.$emit('toast', { type: 'error', message: 'You were kicked by the room master... sorry :/' })
    }

    if (this.$route.params.event === 'reload') {
      this.$route.params.event = null
      // reload to change socket id
      location.reload()
    }
  },
  methods: {
    createRoom () {
      if (this.isParamsValid()) {
        this.socket.on('createdRoom', (roomId) => {
          this.setUser({ name: this.name, avatar: this.avatar, room: roomId })
          this.storeData(this.name, this.avatar)
          this.$router.push({ name: 'Lobby', params: { room: roomId } })
        })
        if (this.name && this.avatar) {
          this.socket.emit('createRoom')
        }
      }
    },
    async joinRoom () {
      if (this.isParamsValid()) {
        this.socket.on('joinedRoom', (roomId) => {
          this.setUser({ name: this.name, avatar: this.avatar, room: roomId })
          this.storeData(this.name, this.avatar)
          this.$router.push({ name: 'Lobby', params: { room: this.roomToJoin } })
        })
        if (this.name && this.avatar && this.roomToJoin) {
          this.socket.emit('joinRoom', this.roomToJoin)
        }
      }
    },
    setUser (user) {
      this.socket.emit('setUser', user)
    },
    changeAvatar () {
      if (!this.$refs.avatar.classList.contains('switched')) {
        this.$refs.avatar.classList.add('switched')
        setTimeout(() => { this.avatar = this.avatarList[Math.floor(Math.random() * this.avatarList.length)] }, 150)
        setTimeout(() => { this.$refs.avatar.classList.remove('switched') }, 300)
      }
    },
    storeData (name, avatar) {
      localStorage.setItem('name', name)
      localStorage.setItem('avatar', avatar)
    },
    isParamsValid () {
      let error = null
      if (this.name.trim().length < 4) error = 'Name required at least 4 characters'
      if (this.name.trim().length > 16) error = 'Name cannot exceed 16 characters'
      if (!this.avatarList.find(a => a === parseInt(this.avatar))) error = 'Avatar error'
      if (error) this.$emit('toast', { type: 'error', message: error })
      this.error = !!error
      return !error
    },
    computedPosition () {
      console.log(this.avatar)
      return 1200 - (200 * this.avatar)
    }
  }
}

</script>

<style scoped>

.formHomeInfoContainer{
  margin-top: 20px;
  display: flex;
}
.form{
  width: 25%;
  margin-left: 20%;
}

.homeInfoContainer{
  width: 25%;
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.homeInfo{
  padding: 20px;
  background-color: #2121211c;
  height: fit-content;
  text-align:justify;
  border-radius: 5px;
}

.homeTitle{
  margin-top: 50px;
  width: 33%;
  min-width: 200px;
  max-width: 400px;
}
.inputName{
  width: 100%;
}

.label{
  text-align: left;
  margin-top: 20px;
  margin-bottom: 5px;
}

.avatar{
  width: 200px;
  height: 200px;
  background-image: url('../assets/avatars/assetAvatars.png');
}

.switched{
  animation: switch 300ms
}

@keyframes switch {

        0% {
            transform: scaleX(1);
        }

        50% {
            transform: scaleX(0);
        }

        100% {
            transform: scaleX(1);
        }
    }

  .avatarSelectContainer{
    position: relative;
    display: flex;
    justify-content: center;
  }

  .avatarBtn{
    position: absolute;
    bottom: 0;
    left: calc( 50% + 40px );
  }

@media (max-width: 1020px) {
  .formHomeInfoContainer{
  margin-top: 10px;
  display: block;
  }
  .form{
    width: 60%;
    margin-left: 20%;
  }

  .homeInfoContainer{
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .homeTitle{
  margin-top: 30px;
}

}
</style>
