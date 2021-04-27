<template>
  <div class="payment-service-container">
    <Card
      :cardData="cardData"
      :key="keyCard"
      class="payment-service-container_card payment-service-container_card__position"
    />
    <div class="payment-service-container_information">
      <div
        class="payment-service-container_sum payment-service-container_sum__position"
      >
        <div class="payment-service-container_sum_title">
          <div class="title-sum">
            {{ "amount_to_paid" | localize }}
          </div>
          <div class="sub_title">
            {{ "percentage_amount" | localize }}
            <div />
          </div>
        </div>
        <div class="payment-service-container_price">
          {{ amount | filterSum }} <span class="icon-₪"></span>
        </div>
      </div>
      <div class="payment-service-container_confirm">
        <v-radio-group v-model="radioGroup">
          <v-radio
            class="radio-item"
            v-for="item in confirmMessage"
            :key="item.value"
            :label="item.title | localize"
            :value="item.value"
            mandatory
            :class="getClassActiveRadio(item.value)"
            @change="agreeMessage(item.value)"
          ></v-radio>
        </v-radio-group>
      </div>
    </div>
    <app-button
      :on-click="payService"
      class="payment-service-container_button"
      :disabled="!agree"
    />
  </div>
</template>

<script>
import Card from '@/components/profile/Card'
import AppButton from '@/components/profile/AppButton'
export default {
  name: 'PaymentService',
  components: { AppButton, Card },
  data () {
    return {
      cardData: {},
      keyCard: 0,
      radioGroup: 1,
      confirmMessage: [
        {
          title: 'agree_message',
          value: 'agree'
        }
      ],
      amount: 2500,
      agree: ''
    }
  },
  methods: {
    payService () {
      this.$router.push('/profile')
    },
    agreeMessage (value) {
      this.agree = value
    }
  },
  filters: {
    filterSum: (value) => {
      if (!value) return ''
      return value.toLocaleString()
    }
  },
  computed: {
    getClassActiveRadio () {
      return (value) => {
        if (value === this.agree) {
          return 'activeRadioClass'
        } else {
          return null
        }
      }
    }
  },
  created () {
    setTimeout(() => {
      (() => {
        this.cardData = {
          nameCard: 'Universal Bank',
          numberCard: '5489   7452   5726   9827',
          active: '04/24',
          paymentsSystem: 'mastercard',
          cvv: '123',
          cardHolder: 'Mitrakova Maria'
        }
        this.keyCard++
      })()
    }, 400)
  },
  updated () {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

.payment-service-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 30px 20px 40px;
  &_card {
    transform: scale(0.7) rotate(90deg);
    &__position {
      margin-top: -100px;
    }
  }
  &_sum {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    &__position {
      margin-top: -80px;
    }
  }
  .title-sum {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.24px;
  }
  .sub_title {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.24px;
  }
  &_sum_title {
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 30px;
  }
  &_price {
    font-size: 26px;
    line-height: 40px;
    letter-spacing: -0.24px;
    margin-top: -10px;
  }
  &_confirm {
    line-height: 22px;
  }
}

@media screen and (max-width: 1023px) {
  .payment-service-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 30px 20px 40px;
    &_sum {
      &__position {
        margin-top: -80px;
      }
    }
    &_price {
      font-size: 26px;
    }
    &_sum_title {
      margin-right: 10px;
    }
    &_confirm {
      font-size: 14px;
    }
  }
}
@media screen and (min-width: 1024px) {
  .payment-service-container {
    width: 600px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 30px;
    &_information {
      width: 45%;
      margin-left: 30px;
      margin-top: 20px;
    }
    &_sum {
      &__position {
        margin-top: 0;
      }
    }
    &_price {
      font-size: 22px;
    }
    &_sum_title {
      margin-right: 18px;
    }
    .payment-service-container_button {
      margin: -60px auto;
    }
    &_confirm {
      font-size: 12px;
    }
  }
}
</style>
