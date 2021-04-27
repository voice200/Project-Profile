<template>
  <div class="b-card">
    <div class="b-card_name">
      <span class="b-card_label" v-if="cardData.nameCard">CB</span>
      <div class="b-card_liner" v-if="cardData.nameCard"></div>
      <span class="b-card_name-bank" :class="{ hasName: cardData.nameCard }">{{
        card.nameCard
      }}</span>
    </div>
    <div class="b-card_name-system"></div>
    <div class="b-card_payment_system"></div>
    <div class="b-card_payment_union"></div>
    <div class="b-card_chip"></div>
    <div class="b-card_number">
      {{ card.numberCard }}
    </div>
    <div class="b-card_active">
      {{ card.active }}
    </div>
  </div>
</template>

<script>
const defaultValue = {
  nameCard: 'Название карты',
  numberCard: '',
  active: 'MM/YY',
  paymentsSystem: 'mastercard'
}
export default {
  props: ['color', 'cardData'],
  name: 'card',
  data () {
    return {
      background: this.color,
      card: {
        nameCard: this.cardData.nameCard
          ? this.cardData.nameCard
          : defaultValue.nameCard,
        numberCard: this.cardData.numberCard
          ? this.cardData.numberCard
          : defaultValue.numberCard,
        active: this.cardData.active
          ? this.cardData.active
          : defaultValue.active,
        paymentsSystem: 'mastercard'
      }
    }
  },
  methods: {
    formatDataForNumber (number) {}
  }
}
</script>

<style lang="scss" scoped>
.b-card {
  width: 334px;
  height: 212px;
  background: url("../../assets/images/profile/background-orange.svg");
  position: relative;
  font-style: normal;
  font-weight: normal;
  border-radius: 17px;

  &_liner {
    width: 20px;
    transform: rotate(-90deg);
    border-top: 1px solid #fff;
  }

  &_name-system {
    position: absolute;
    color: #ffffff;
    font-size: 6px;
    right: 14px;
    top: 58px;
  }

  &_name {
    position: absolute;
    left: 21px;
    bottom: 155px;
    font-family: "SF Pro Display", sans-serif;
    display: flex;
    width: 200px;
  }
  &_label {
    font-style: normal;
    font-weight: 800;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: 2.37px;
    color: #fff;
    margin-right: 30px;
  }
  &_name-bank {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.6);
    position: absolute;
    left: 2px;
    bottom: 4px;
  }
  .hasName {
    left: 80px;
  }
  &_number {
    position: absolute;
    left: 18px;
    top: 129px;
    font-family: "SF Pro Text", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 26px;
    color: #ffffff;
  }
  &_active {
    position: absolute;
    left: 20px;
    bottom: 30px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.6);
  }

  &_payment_system {
    background: url("../../assets/images/profile/mc_vrt_rev 1.svg") no-repeat;
    position: absolute;
    right: 26px;
    bottom: 10px;
    width: 55px;
    height: 45px;
    background-position: center;
    background-size: contain;
  }
}
</style>
