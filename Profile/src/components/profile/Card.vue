<template>
  <div class="b-card" @click="onClick">
    <div class="b-card_name">
      <span class="b-card_label" v-if="cardData.nameCard">CB </span>
      <div class="b-card_liner"></div>
      <span class="b-card_name-bank">{{ card.nameCard }}</span>
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
  nameCard: 'Название Карты',
  numberCard: '**** **** **** ****',
  active: '**/**',
  paymentsSystem: 'mastercard'
}

const defaultClick = () => {}
export default {
  props: {
    cardData: { type: Object, default: defaultValue },
    onClick: { type: Function, default: defaultClick }
  },
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
    defaultClick () {}
  }
}
</script>

<style lang="scss" scoped>
.b-card {
  width: 260px;
  height: 410px;
  background: url("../../assets/images/profile/background-blue.svg");
  transform: rotate(90deg);
  position: relative;
  font-style: normal;
  font-weight: normal;
  border-radius: 17px;

  &_liner {
    width: 20px;
    transform: rotate(-90deg);
    border-top: 1px solid #fff;
  }

  &_name {
    position: absolute;
    left: -57px;
    bottom: 120px;
    transform: rotate(-90deg);
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
    left: 80px;
    bottom: 4px;
  }
  &_number {
    position: absolute;
    right: -37px;
    bottom: 139px;
    transform: rotate(-90deg);
    font-family: "SF Pro Text", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 26px;
    color: #fff;
    letter-spacing: 0.01em;
  }
  &_active {
    position: absolute;
    right: 22px;
    bottom: 46px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.6);
    transform: rotate(-90deg);
    font-family: "SF Pro Display", sans-serif;
  }
  &_payment_system {
    background: url("../../assets/images/profile/master-card.svg") no-repeat;
    position: absolute;
    right: -1px;
    top: 39px;
    width: 76px;
    height: 60px;
    background-position: center;
    background-size: contain;
  }
}
</style>
