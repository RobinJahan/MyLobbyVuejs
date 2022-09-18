<template>
    <div class="setting">
        <div class="labelSetting">{{settingLabel}} : </div>
        <div class="inputSetting">
            <button class="roundBtn" @click="leftBtnClick" :disabled="disabledLeftButton">
                <span class="icon">
                    <font-awesome-icon :icon="`fa-solid ${leftBtnIcon}`"/>
                </span>
            </button>
            <span class="value">{{currentValue}}</span>
            <button class="roundBtn" @click="rightBtnClick" :disabled="disabledRightButton">
                <span class="icon">
                    <font-awesome-icon :icon="`fa-solid ${rightBtnIcon}`"/>
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    settingLabel: {
      type: String,
      required: true
    },
    currentValue: {
      type: String,
      required: true
    },
    leftBtnIcon: {
      type: String,
      default: 'fa-arrow-left'
    },
    rightBtnIcon: {
      type: String,
      default: 'fa-arrow-right'
    },
    disabledLeftButton: {
      type: Boolean,
      default: true
    },
    disabledRightButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    leftBtnClick () {
      this.$emit('leftBtnClick')
    },
    rightBtnClick () {
      this.$emit('rightBtnClick')
    }
  }
}
</script>

<style scoped>
.setting{
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}
.labelSetting{
  width: 40%;
  text-align: left;
}
.inputSetting{
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
}
.value{
    width: auto;
    text-align: center;
}

@media (max-width: 1020px) {
    .setting{
  font-size: 1rem;
}
.labelSetting{
  width: 40%;
  text-align: left;
}
.inputSetting{
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
}
.value{
    width: auto;
    text-align: center;
}
}
</style>
