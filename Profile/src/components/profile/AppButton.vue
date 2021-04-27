<template>
  <button
    class="button router-link-active button__form"
    :class="{
      button__form_disabled: disabled,
      style_white: styleBtn === 'white',
      style_dark: styleBtn === 'dark',
      style_delete: styleBtn === 'delete',
    }"
    :disabled="disabled"
    @click="onClick"
  >
    {{ this.labelBtn | localize }}
  </button>
</template>

<script>
export default {
  props: {
    labelBtn: { type: String, default: 'continue' },
    disabled: { type: Boolean, default: false },
    onClick: { type: Function, default: null },
    styleBtn: { type: String, default: 'white' }
  }
}
</script>

<style lang="scss" scoped>
.btn_disable {
  color: rgba(2, 2, 102, 0.5);
  background: rgba(255, 255, 255, 0.7);
}
.style_white {
  background: #fff;
  color: #020266;
}
.style_dark {
  background: none;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  margin-top: 20px;
  color: white !important;
}
.style_delete {
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  margin-top: 20px;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 18px;
  padding-bottom: 10px;
}
</style>
