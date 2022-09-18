<template>
    <div class="countdown">
        <div class="label" ref="label">
            <b>{{label}}</b>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    }
  },
  created () {
    if (this.$refs.label) this.$refs.label.classList.add('fadeout')
    setTimeout(() => { this.$emit('remove') }, 900)
  }
}
</script>

<style scoped>
.countdown{
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.label{
    z-index: 200;
    animation: wizz 900ms;
    text-shadow: #134665 1px 1px;
}
@keyframes wizz {
    0% {
        transform: scale(6);
    }
    100% {
        transform: scale(2);
    }
}
.fadeout{
    animation: fadeOut 800ms;
}
@keyframes fadeOut {
  0% {
      opacity: 1;
  }
  100% {
      opacity: 0.5;
  }
}
</style>
