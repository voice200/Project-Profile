<template>
  <div class="code-item-container" contenteditable @keyup="checkNumber"></div>
</template>

<script>
export default {
  props: ['index', 'addInCode'],
  name: 'CodeItem',
  methods: {
    checkNumber (e) {
      if (e.code === 'Backspace') {
        e.target.innerText = ''
        this.addInCode(e.target.innerText, this.index)
      } else {
        if (e.target.innerText.length <= 1) {
          this.addInCode(e.target.innerText, this.index)
        } else {
          e.target.innerText = ''
          this.addInCode(e.target.innerText, this.index)
          if (e.target.innerText !== e.key) {
            e.target.innerText = e.key
            this.addInCode(e.target.innerText, this.index)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.code-item-container {
  background: #f3f3f3;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 37px;
  text-align: center;
  letter-spacing: -0.24px;
  color: #000000;
  border: 4px solid #5fcdbc;
  width: 45px;
  height: 45px;
}
</style>
