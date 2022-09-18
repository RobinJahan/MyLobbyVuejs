<template>
    <div class="chat">
        <div v-show="openned" class="opennedChat">
            <div class="messages" ref="messages">
              <div v-for="(message, index) in messages" :key="index" class="message">({{String(message.hours).padStart(2, '0')}}:{{String(message.minutes).padStart(2, '0')}}) {{message.userName}} : {{message.text}}</div>
            </div>
            <div class="inputsChat">
                <input v-model="message" class="inputMessage" autocomplete="off" v-on:keyup.enter="sendMessage"/><button class="btn messageBtn" @click="sendMessage">Send</button>
            </div>
        </div>
        <div v-show="!openned" class="closedChat"></div>
    </div>
</template>

<script>
export default {
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      openned: true,
      message: '',
      messages: []
    }
  },
  created () {
    this.socket.on('newMessage', (message) => {
      if (!this.openned) this.newMessage = true
      this.messages.push(message)
      setTimeout(() => this.scrollDown(), 200)
    })
  },
  methods: {
    sendMessage () {
      if (this.message.trim().length > 0) {
        this.socket.emit('messageSend', this.message.trim())
        this.message = ''
      }
    },
    scrollDown () {
      this.$refs.messages.scrollTo({ top: this.$refs.messages.scrollHeight, behavior: 'smooth' })
    }
  }
}
</script>

<style>
.chat{
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 300px;
    background-color: #dce3ea89;
}

.messages{
    height: 200px;
    text-align: left;
    overflow: auto;
    margin-bottom: 22px;
    scrollbar-width: thin;
}

.message{
  padding: 5px;
  color: #1a4c6b;
}

.inputsChat{
    position: absolute;
    bottom: 0;
    width: 100%;
}

.inputMessage{
  color: #1a4c6b;
  font-size: 1rem;
  background-color: #ffffff4d;
  border: 2px #1a4c6b solid;
  border-radius: 4px;
  padding: 2px 10px;
  width: 65%;
  height: 20px;
  transform: translateY(2px);
}

.messageBtn{
    width: 25%;
}
</style>
