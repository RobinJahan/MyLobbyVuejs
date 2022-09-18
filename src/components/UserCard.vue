<template>
    <div class="userCard" :class="{you: you, empty: empty}">
        <!-- <img :src="require(`@/assets/avatars/${user.avatar}`)" alt="avatar" class="userAvatar"> -->
        <div class="avatar" ref="avatar" :style="{ backgroundPosition: `0px ${360 - (60 * user.avatar)}px`}"></div>
        <div class="userName">{{user.name}}<span v-if="master"> - <font-awesome-icon class="masterIcon" icon="fa-solid fa-crown"/></span></div>
        <div class="kickBtn" v-if="kickable" @click="kick"><font-awesome-icon icon="fa-solid fa-xmark"/></div>
    </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    master: {
      type: Boolean,
      default: false
    },
    you: {
      type: Boolean,
      default: false
    },
    kickable: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    kick () {
      this.$emit('kick', this.user.id)
    }
  }
}
</script>

<style scoped>
.userCard{
  position: relative;
  margin: 10px;
  padding: 5px 15px 5px 15px;
  width: auto;
  height: 60px;
  background-color: #e4e4e489;
  border-radius: 10px;
  display: flex;
}
.userAvatar{
  height: 60px;
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
  text-align: left;
}
.you{
  background-color: #c2ffc989;
}
.empty{
  opacity: 0.5;
}
.masterIcon{
  color: #ffd700;
}
.kickBtn{
  position: absolute;
  right: 20px;
  font-size: 1.4rem;
  opacity: 0.5;
}
.kickBtn:hover{
  opacity: 1;
  color: rgb(197, 36, 36)
}
</style>
