<template>
  <div class="b-payment">
    <div class="b-payment_choose-card" v-show="!additionalInformation">
      <div class="b-payment_cards">
        <div class="b-payment_item">
          <card
            :cardData="cardData"
            :key="keyCard"
            :onClick="showInformation"
          />
        </div>
      </div>
      <div class="b-payment_button">
        <app-button
          label-btn="addNewCard"
          :onClick="goToPage"
          :styleBtn="styleAdd"
          class="b-payment-button-goToPage"
        />
        <app-button
          label-btn="addNewCard"
          :onClick="addCard"
          :styleBtn="styleAdd"
          class="b-payment-button-addCardModal"
        />
      </div>
    </div>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" width="550" height="600">
          <template v-slot:activator="{}"> </template>
          <v-card>
            <AddCard class="add-card_style-modal" show-title="true" />
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import Card from '@/components/profile/Card'
import AppButton from '@/components/profile/AppButton'
import AddCard from '@/components/profile/AddCard'

export default {
  name: 'payment',
  components: { AddCard, AppButton, Card },
  data () {
    return {
      additionalInformation: false,
      cardData: {},
      styleAdd: 'white',
      styleDel: 'dark',
      dialog: false,
      keyCard: 0
    }
  },
  methods: {
    goToPage () {
      this.$router.push('/profile/add-card')
    },
    showInformation () {
      this.$router.push('/profile/payments/1')
    },
    addCard () {
      this.dialog = !this.dialog
    }
  },
  beforeUpdate () {
    this.keyCard++
  },
  created () {
    this.additionalInformation = false
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

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

.add-card_style-modal {
  background: $dark-theme-gradient-profile;
  height: 100%;
  padding: 30px 50px 67px 50px;
  border-radius: 20px !important;
  margin-top: -22px;
  width: 100%;
}

.b-payment {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &_choose-card {
    margin-top: -110px;
  }

  &_cards {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    margin-top: 128px;
    cursor: pointer;
  }
  &_button {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
}

// Media styles
@media screen and (max-width: 1023px) {
  .b-payment {
    padding: 0 20px 50px;
    margin-top: 30px;
    margin-bottom: 50px;
    .b-payment-button-addCardModal {
      display: none;
    }

    &_cards {
      max-height: 400px;
    }
    &_item {
      transform: rotate(-90deg);
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-payment {
    panding: 0;
    align-items: flex-start;

    .b-payment-button-addCardModal {
      display: block;
    }

    .b-payment-button-goToPage {
      display: none;
    }

    &_cards {
      max-height: 280px;
      margin-top: 70px;
    }
    &_item {
      transform: scale(0.8) rotate(0deg);
    }
  }
}
</style>
