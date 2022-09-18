<template>
    <div class="player" :class="{clicked: !unclicked}">
        <div class="userName" :class="{winner: winner}">{{name}}</div>
        <div class="avatarDiv">
          <div class="avatar" ref="avatar" :style="{ backgroundPosition: `0px ${360 - (60 * avatar)}px`}"></div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    unclicked: {
      type: Boolean,
      default: true
    },
    winner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.player{
  width: 100px;
  display: flex;
  flex-direction: column;
}
.avatarDiv{
  display: flex;
  justify-content: center;
}
.avatar{
  width: 60px;
  height: 60px;
  background-size: 60px 360px;
  background-image: url('../assets/avatars/assetAvatars.png');
}
.userName{
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
.winner{
  color: #ffd700;
  text-shadow: 1px 1px 2px rgb(192, 47, 11), 0 0 1em #fff, 0 0 0.2em #fff;
}
.clicked{
  opacity: 0.5;
}
</style>
