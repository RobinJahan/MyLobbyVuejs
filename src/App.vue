<template>
  <div id="app">
    <router-view :socket="socket" @toast="onToast" @countdown="onCountdown"/>
    <div class="background"></div>
    <Toast v-if="displayToast" :toast="toast" @remove="removeToast"/>
    <Countdown v-if="displayCountdown" :label="label" @remove="removeCountdown"/>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import Toast from '@/components/Toast.vue'
import Countdown from '@/components/Countdown.vue'

export default {
  data () {
    return {
      socket: null,
      displayToast: false,
      displayCountdown: false,
      toast: null,
      label: ''
    }
  },
  components: {
    Toast,
    Countdown
  },
  created () {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT)
  },
  methods: {
    onToast (toast) {
      this.displayToast = false
      this.toast = toast
      this.displayToast = true
    },
    removeToast () {
      this.displayToast = false
    },
    onCountdown (count) {
      this.displayCountdown = false
      this.label = count
      this.displayCountdown = true
    },
    removeCountdown () {
      this.displayCountdown = false
    }
  }
}
</script>

<style>
html {
    border: none;
    height: fit-content;
    min-height: 100%;
    background: linear-gradient(150deg,#074f93 0%,#4fe4bc 100%);
    -webkit-transition-property: background-image;
    transition-property: background-image;
    margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0f0f0;
}

.background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url(./assets/textures/cream-pixels.png);
  opacity: 0.8;
}

.input{
  color: #ffffffb3;
  font-size: 1rem;
  background-color: #ffffff4d;
  border: 2px #ffffffb3 solid;
  border-radius: 4px;
  padding: 2px 10px;
  max-width: max-content;
}

.input:focus{
  outline-style: none;
}

.btn{
    font-size: 1rem;
    font-weight: bold;
    color: #1a4c6b;
    background-color: #FFF;
    height: 35px;
    min-width: 150px;
    border-radius: 60px;
    border-style: none;
    box-shadow: 0px 4px 0px 0px #1a4c6bd1;
    margin: 10px;
    padding: 5px;
}

.btn:active{
  transform: translateY(2px);
  box-shadow: 0px 2px 0px 0px #1a4c6bd1;
}

.btn:disabled{
  opacity: 0.5;
}

.roundBtn {
  display:block;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border-style: none;
  box-shadow: 0px 4px 0px 0px #1a4c6bd1;
  font-weight: bolder;
}

.roundBtn:active{
  transform: translateY(2px);
  box-shadow: 0px 2px 0px 0px #1a4c6bd1;
}

.icon {
  color: #134665;
}

.flex{
  display: flex;
}

</style>
