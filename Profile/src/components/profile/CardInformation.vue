<template>
  <div class="card-information card-information_additional-information">
    <Operations />
    <div class="card-information_card">
      <div id="card">
        <card
          :cardData="cardData"
          class="card-information_card__size-transform"
          :key="keyCard"
          :on-click="reverseCard"
          v-show="!showBackCard"
        />
        <card-reverse
          :item="cardData"
          class="card-information_card__position"
          :key="keyCard + 1"
          :on-click="reverseCard"
          v-show="showBackCard"
        />
      </div>
      <app-button
        id="button"
        labelBtn="removeCard"
        :on-click="deleteCard"
        styleBtn="delete"
        :class="{ 'card-information_button__position': !showBackCard }"
      />
      <div class="card-information_balance" id="balance">
        <div class="balance_title">
          {{ "balance" | localize }}
        </div>
        <div class="balance_sum">
          {{ balance }}
        </div>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="270"
      class="modal-confirm dialog"
    >
      <v-card>
        <v-card-text>{{ "confirm_delete_card" | localize }}</v-card-text>
        <v-card-actions>
          <v-btn color="#0A84FF" @click="dialog = false" text>
            {{ "answer_cancel_to_delete_card" | localize }}
          </v-btn>
          <div class="btn_border-right"></div>
          <v-btn color="#0A84FF" text @click="dialog = false">
            {{ "answer_delete_card" | localize }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Card from '@/components/profile/Card'
import AppButton from '@/components/profile/AppButton'
import CardReverse from '@/components/profile/CardReverse'
import Operations from '@/components/profile/Operations'

export default {
  name: 'CardInformation',
  data () {
    return {
      showBackCard: false,
      balance: '2 562 845 ₪',
      dialog: false,
      cardData: {},
      keyCard: 0
    }
  },
  components: { Operations, CardReverse, AppButton, Card },
  methods: {
    deleteCard () {
      this.dialog = true
    },
    reverseCard () {
      this.showBackCard = !this.showBackCard
    }
  },
  beforeUpdate () {
    this.keyCard++
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
      })()
    })
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/default/vars.scss";

.card-information_additional-information {
  width: 100%;
  height: 100%;
  overflow-y: scroll !important;
  overflow-x: hidden;
}

.card-information {
  width: 100%;
  height: 100%;
  &_card {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .container-button-left {
    border-top: rgba(84, 84, 88, 0.65);
    border-right: rgba(84, 84, 88, 0.65);
  }

  &_card__size-transform {
    transform: scale(0.815) rotate(90deg);
    border-radius: 20px;
    margin-bottom: -90px;
  }
  &_card__position {
    margin-bottom: 7px;
  }

  &_balance {
    letter-spacing: -0.24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 32px;

    .balance_title {
      font-size: 16px;
      line-height: 26px;
      color: rgba(255, 255, 255, 0.5);
    }
    .balance_sum {
      font-size: 26px;
      line-height: 40px;
    }
  }
}
.btn_border-right {
  width: 1px;
  height: 100%;
  border-right: 1px solid rgba(84, 84, 88, 0.65) !important;
}

// Media styles
@media screen and (min-width: 1024px) and (max-width: 1223px) {
  .card-information {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    overflow-x: hidden;

    &_card {
      margin-top: 110px;
    }

    &_card__size-transform {
      margin-left: 37px;
    }
    &_button__position {
      margin-top: -5px;
    }
    .card-information_card__position {
      margin-top: 18px;
    }
  }
  .card-information_card {
    margin-top: 0px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3px 301px 40px;
    grid-template-areas:
      "balance"
      "card"
      "button";
    grid-gap: 25px;
    #balance {
      grid-area: balance;
      margin-top: 39px;
    }
    #card {
      grid-area: card;
    }
    #button {
      grid-area: button;
      display: flex;
      justify-content: center;
    }
  }
}
@media screen and (max-width: 1023px) {
  .card-information_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    overflow-x: hidden;
  }
  #card {
    width: 100%;
    height: 248px;
    display: flex;
    justify-content: center;
  }
  .card-information_card__position {
    margin-top: 38px;
  }
  .card-information_card__size-transform {
    margin-top: -61px;
  }
}

@media screen and (min-width: 1224px) {
  .card-information {
    display: flex;
    justify-content: space-between;

    .card-information_card__position {
      margin-left: 93px;
      margin-top: 18px;
    }

    &_card__size-transform {
      margin-left: 131px;
      margin-top: -80px;
      margin-bottom: -90px;
    }
    &_button__position {
      margin-top: -89px;
      margin-bottom: -7px;
    }
  }
  .card-information_card {
    margin-top: 35px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 79px 223px 40px;
    grid-template-areas:
      "balance"
      "card"
      "button";
    grid-gap: 25px;
    #balance {
      grid-area: balance;
      margin-top: 31px;
      margin-left: 94px;
    }
    #card {
      grid-area: card;
      width: 100%;
      height: 100%;
    }
    #button {
      grid-area: button;
      display: flex;
      justify-content: center;
      margin-top: auto;
      margin-left: 99px;
      margin-bottom: 30px;
    }
  }
}
</style>
