<template>
    <div class="toast">
        <div class="cardToast" ref="cardToast" :class="{error: toast.type === 'error'}">
            <div class="message">{{toast.message}}</div>
            <div class="closeIcon" @click="() => {this.$emit('remove')}"><font-awesome-icon icon="fa-solid fa-xmark"/></div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    toast: {
      type: Object,
      required: true
    }
  },
  created () {
    setTimeout(() => { if (this.$refs.cardToast) this.$refs.cardToast.classList.add('fadeout') }, 9000)
    setTimeout(() => { this.$emit('remove') }, 10000)
  }
}
</script>

<style scoped>
.toast{
    position: fixed;
    bottom: 5%;
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translateX(-8px);
}

.cardToast{
    position: relative;
    color: #222;
    font-weight: bold;
    min-width: 150px;
    max-width: 50%;
    padding: 10px;
    background-color: rgba(223, 231, 194, 0.814);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    animation: wizz 400ms;
}

.message{
    width: 85%;
}

.closeIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
}

@keyframes wizz {

        0% {
            transform: scale(0);
        }

        100% {
            transform: scaleX(1);
        }
    }

.error{
    background-color: rgba(227, 97, 97, 0.8);
}

.fadeout{
    animation: fadeOut 1s;
}

@keyframes fadeOut {

        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>
