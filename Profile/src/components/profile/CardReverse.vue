<template>
  <div class="b-card" @click="onClick">
    <div class="b-card_details" v-if="!item.cvv"></div>
    <div class="b-card_cnn" v-if="item.cvv">{{ item.cvv }}</div>
    <div class="b-card_cardHolder">{{ item.cardHolder }}</div>
  </div>
</template>

<script>
const defaultClick = () => {}

export default {
  name: 'card-reverse',
  props: {
    item: { type: Object, default: null },
    onClick: { type: Function, default: defaultClick }
  }
}
</script>

<style lang="scss" scoped>
.b-card {
  width: 334px;
  height: 212px;
  background: url("../../assets/images/profile/card-back.svg");
  position: relative;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: normal;
  border-radius: 17px;
  &_details {
    background: url("../../assets/images/profile/orange-detailes-reverse.svg");
    width: 46px;
    height: 21px;
    position: absolute;
    right: 32.31px;
    bottom: 77px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #fff;
    font-family: "SF Pro Text", sans-serif;
  }
  &_cnn {
    right: 32.31px;
    bottom: 77px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #fff;
    position: absolute;
  }
  &_cardHolder {
    position: absolute;
    left: 17px;
    bottom: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
