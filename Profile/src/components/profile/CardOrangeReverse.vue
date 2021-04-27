<template>
  <div class="b-card">
    <div class="b-card_details" v-if="!item.cvv"></div>
    <div class="b-card_cnn" v-if="item.cvv">{{ item.cvv }}</div>
    <div class="b-card_cardHolder">{{ item.cardHolder }}</div>
  </div>
</template>

<script>
export default {
  name: 'card-orange-reverse',
  props: {
    item: { type: Object, default: null }
  }
}
</script>

<style lang="scss" scoped>
.b-card {
  width: 334px;
  height: 212px;
  background: url("../../assets/images/profile/orange-reverse.svg");
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
    font-size: 14px;
    line-height: 24px;
    color: #fff;
  }
}
</style>
