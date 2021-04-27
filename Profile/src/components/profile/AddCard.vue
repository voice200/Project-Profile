<template>
  <div class="b-newCard-overflow">
    <div class="b-newCard">
      <div class="b-newCard_title" v-show="showTitle">
        {{ "addCard" | localize }}
      </div>
      <div class="b-newCard_card b-newCard_card__position b-newCard_card__size">
        <card-orange
          :card-data="cardData"
          :key="componentKey"
          v-if="step <= 3"
        />
        <card-orange-reverse
          :item="cardData"
          :key="componentKeyOrangeCard"
          v-if="step > 3"
        />
      </div>
      <div class="b-newCard_inputs">
        <v-text-field
          class="b-newCard_input input"
          :label="'cardName' | localize"
          :placeholder="'cardNamePlaceholder' | localize"
          outlined
          v-model="cardData.nameCard"
          dark
          @input="submitHandler($v.cardData.nameCard)"
          v-if="step === 1"
          :hint="
            ($v.cardData.nameCard.$dirty && !$v.cardData.nameCard.required
              ? 'form_reqiered'
              : 'empty') | localize
          "
          :class="{
            invalid:
              $v.cardData.nameCard.$dirty && !$v.cardData.nameCard.required,
          }"
        />
        <v-text-field
          class="b-newCard_input input"
          v-if="step === 2"
          :label="'cardNumber' | localize"
          placeholder="0000 0000 0000 0000"
          v-mask.hide-on-empty="cardMask"
          outlined
          v-model="cardData.numberCard"
          dark
          @input="submitHandler($v.cardData.numberCard)"
          :hint="
            ($v.cardData.numberCard.$dirty &&
            !$v.cardData.numberCard.required &&
            (!$v.cardData.numberCard.maxLength ||
              !$v.cardData.numberCard.minLength)
              ? 'form_reqiered'
              : 'empty') | localize
          "
          :class="{
            invalid:
              ($v.cardData.numberCard.$dirty &&
                !$v.cardData.numberCard.required) ||
              !$v.cardData.numberCard.maxLength ||
              !$v.cardData.numberCard.minLength,
          }"
        ></v-text-field>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          v-if="step === 3"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="b-newCard_input"
              v-model="computedDateFormatted"
              placeholder="MM/YY"
              label="MM/YY"
              outlined
              persistent-hint
              append-icon="icon-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              @change="submitHandler($v.cardData.active)"
              :class="{ invalid: $v.date.$dirty && !$v.date.required }"
              :hint="
                ($v.date.$dirty && !$v.date ? 'form_reqiered' : 'empty')
                  | localize
              "
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            full-width
            :min="dateFrom"
            @input="submitHandler($v.date)"
            :class="{ invalid: $v.date.$dirty && !$v.date.required }"
            :hint="
              ($v.date.$dirty && !$v.date ? 'form_reqiered' : 'empty')
                | localize
            "
          ></v-date-picker>
        </v-menu>
        <v-text-field
          v-if="step === 4"
          class="b-newCard_input"
          label="CVV"
          :placeholder="'cardCvv' | localize"
          outlined
          type="number"
          v-model="cardData.cvv"
          dark
          @input="submitHandler($v.cardData.cvv)"
          :hint="
            ($v.cardData.cvv.$dirty && !$v.cardData.cvv.required
              ? 'form_reqiered'
              : 'empty') | localize
          "
          :class="{
            invalid: $v.cardData.cvv.$dirty && !$v.cardData.cvv.required,
          }"
        ></v-text-field>
        <v-text-field
          v-if="step === 5"
          class="b-newCard_input"
          :label="'cardHolderName' | localize"
          :placeholder="'cardHolderName' | localize"
          outlined
          type="text"
          v-model="cardData.cardHolder"
          dark
          @input="submitHandler($v.cardData.cardHolder)"
          :hint="
            ($v.cardData.cardHolder.$dirty && !$v.cardData.cardHolder.required
              ? 'form_reqiered'
              : 'empty') | localize
          "
          :class="{
            invalid:
              $v.cardData.cardHolder.$dirty && !$v.cardData.cardHolder.required,
          }"
        ></v-text-field>
      </div>
      <div class="b-newCard_button">
        <app-button
          :onClick="nextStep"
          :disabled="disable"
          :labelBtn="step < 5 ? 'continue' : 'save'"
          class="button-width"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardOrange from '@/components/profile/CardOrange'
import AppButton from '@/components/profile/AppButton'
import CardOrangeReverse from '@/components/profile/CardOrangeReverse'
import { formMixin } from '@/mixins/formMixin.js'

const { required, minLength, maxLength } = require('vuelidate/lib/validators')
export default {
  props: {
    showTitle: { type: String, default: null }
  },
  name: 'add-new-card',
  components: { CardOrangeReverse, AppButton, CardOrange },
  mixins: [formMixin],
  data () {
    return {
      dateFrom: new Date().toISOString().substr(0, 10),
      menu: false,
      step: 1,
      date: '',
      cardData: {
        nameCard: '',
        numberCard: '',
        active: this.computedDateFormatted,
        cvv: '',
        cardHolder: ''
      },
      disable: true,
      componentKey: 0,
      componentKeyOrangeCard: 0,
      cardMask: 'NNNN NNNN NNNN NNNN'
    }
  },
  methods: {
    nextStep () {
      this.disable = true
      this.step++

      if (this.step === 6) {
        this.$router.push('/profile/payments')
      }
    },
    submitHandler (field) {
      this.checkForm(field)
      this.componentKey++
      this.componentKeyOrangeCard++

      if (this.step === 1 && field.required) {
        this.disable = false
      } else if (this.step === 2 && field.required) {
        this.disable = false
      } else if (this.step === 3 && field.required) {
        this.menu = false
        this.cardData.active = this.formatDateForCard(this.date)
        this.disable = false
      } else if (this.step === 4 && field.required) {
        this.disable = false
      } else if (this.step === 5 && field.required && field.$dirty) {
        this.disable = false
      } else this.disable = true
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDateForCard(this.date)
    }
  },
  validations: {
    cardData: {
      nameCard: {
        required
      },
      numberCard: {
        required,
        minLength: minLength(19),
        maxLength: maxLength(19)
      },
      active: {
        required
      },
      cvv: {
        required
      },
      cardHolder: {
        required
      }
    },
    date: {
      required
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.b-newCard-overflow {
  overflow: hidden;
}
.b-newCard {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: SF Pro Display, sans-serif;
  overflow-x: hidden;
  overflow-y: scroll;

  .b-newCard_title {
    margin-top: 89px;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 39px;
    text-align: left;
    letter-spacing: -0.24px;
    color: #ffffff;
    margin-bottom: 50px;
  }

  .light-theme.v-input input {
    color: #020266 !important;
  }
  .button-width {
    width: 100%;
  }

  &_card {
    display: flex;
    justify-content: center;
    //margin-top: 30px;
  }
  &_button {
    display: flex;
    justify-content: center;
    width: 100% !important;
  }
  &_inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 43px;
    margin-bottom: 15px;
    .b-newCard_input {
      width: 100% !important;
      label {
        color: #0b00e1;
      }
      outline: none !important;
      box-shadow: 0px 2px 8px rgba(88, 255, 255, 0.4) !important;
    }
  }
}

// Media style
@media screen and (max-width: 1023px) {
  .b-newCard_button {
    margin-bottom: 40px;
  }
  .b-newCard {
    padding: 43px 20px 40px 20px;
  }
}

@media screen and (min-width: 1024px) {
  .b-newCard_card__size {
    transform: scale(1.1);
    margin-bottom: 12px;
  }
  .b-newCard {
    margin-top: -109px;
    padding: 30px 20px 0;
    overflow: hidden;
  }
}
</style>
