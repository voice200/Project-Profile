<template>
  <div class="changes-container">
    <div class="changes-container_message changes-container_message__position">
      {{ "on_your" | localize }}
      <span class="changes-container_email">Eitan....@gmail.com</span>
      {{ "was_send_sms" | localize }}
    </div>
    <div
      class="changes-container_change-phone changes-container_change-phone__position"
      @click="goToPageInformation"
    >
      {{ "change_action" | localize }}
    </div>
    <div class="changes-container_title changes-container_title__position">
      {{ "press_code" | localize }}
    </div>
    <div class="changes-container_code changes-container_code__position">
      <CodeItem
        :index="index"
        :addInCode="addInCode"
        v-for="(n, index) of 6"
        :key="n + index"
        :ref="'code' + index"
      />
    </div>
    <div class="changes-container_message-error">
      <span v-show="!codeCorrectly && canContinue"> Код неверный </span>
    </div>
    <div
      class="changes-container_timing changes-container_timing__position"
      :key="key"
    >
      0 : {{ getTimer }}
    </div>
    <div
      class="changes-container_send-again changes-container_send-again__position"
      :class="getClassSendAgain"
      @click="sendCodeAgain"
    >
      {{ "send_again" | localize }}
    </div>
    <app-button
      :onClick="checkCode"
      :disabled="!canContinue"
      label-btn="change_confirm"
    ></app-button>
    <div
      class="changes-container_problems changes-container_problems__position"
      @click="dontSendSms"
    >
      {{ "dont_came_sms" | localize }}
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card class="changes-container_dialog">
        <ProblemWithService :onClick="sendInformationAboutService" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppButton from '@/components/profile/AppButton'
import CodeItem from '@/components/profile/CodeItem'
import ProblemWithService from '@/components/profile/ProblemWithService'
export default {
  name: 'changes',
  components: { ProblemWithService, CodeItem, AppButton },
  data () {
    return {
      code: 123456,
      timer: 45,
      sendAgain: false,
      key: 0,
      codeClient: [],
      timeInterval: null,
      canContinue: false,
      codeCorrectly: true,
      dialog: false
    }
  },
  computed: {
    getTimer () {
      return this.timer
    },
    getClassSendAgain () {
      return this.sendAgain
        ? 'changes-container_active-send-again'
        : 'notActive'
    }
  },
  methods: {
    getTime () {
      this.timeInterval = setInterval(() => {
        let counter = 0
        if (counter < this.timer) {
          this.timer--
          counter++
          this.key++
        } else {
          this.sendAgain = true
          clearInterval(this.timeInterval)
          this.timer = 45
        }
      }, 1000)
    },
    checkCode () {
      if (+this.codeClient.join('') === this.numbers) {
        this.codeCorrectly = true
        this.$router.push('/profile/information')
      } else {
        this.codeCorrectly = false
      }
    },
    addFocus (el) {
      el.focus()
    },
    goToPageInformation () {
      clearInterval(this.timeInterval)
      this.$router.push('/profile/information')
    },
    addInCode (value, index) {
      this.codeClient[index] = value
      if (value === '') {
        this.codeCorrectly = true
      }
      if (this.codeClient.length < 6 && value !== '') {
        this.addFocus(this.$refs[`code${index + 1}`][0].$el)
      }
      if (this.codeClient.filter((item) => item !== '').length === 6) {
        this.canContinue = true
      } else {
        this.canContinue = false
      }
    },
    sendCodeAgain () {
      this.generateCode()
      this.getTime()
      this.sendAgain = false
    },
    sendInformationAboutService () {
      this.dialog = false
    },
    dontSendSms () {
      this.dialog = true
    },
    generateCode () {
      const code = []
      for (let i = 0; i <= 5; i++) {
        code.push(Math.floor(Math.random() * Math.floor(10)))
      }
      this.code = +code.join('')
    }
  },
  mounted () {
    this.addFocus(this.$refs.code0[0].$el)
    this.$store.dispatch('sendCode', this.phone)
  },
  created () {
    this.generateCode()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.changes-container {
  &_message {
    letter-spacing: -0.24px;
    color: rgba(255, 255, 255, 0.56);
    font-size: 14px;
    text-align: center;
    &__position {
      margin-bottom: 3px;
    }
  }
  &_email {
    color: white;
  }
  &_change-phone {
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.24px;
    color: #58ffff;
    cursor: pointer;
    &__position {
      margin-bottom: 20px;
    }
  }
  &_title {
    font-size: 14px;
    line-height: 22px;
    &__position {
      margin-bottom: 20px;
    }
  }
  &_message-error {
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.24px;
    color: #ff8e8e;
    height: 18px;
  }
  &_timing {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.24px;
    &__position {
      margin-bottom: 15px;
      margin-top: 7px;
    }
  }
  &_code {
    width: 320px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__position {
      margin-bottom: 5px;
    }
  }
  &_send-again {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.24px;
    color: rgba(255, 255, 255, 0.3);
    &__position {
      margin-bottom: 20px;
    }
  }
  .notActive {
    pointer-events: none;
  }
  &_active-send-again {
    color: white !important;
    cursor: pointer;
  }
  &_problems {
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.24px;
    color: #95ebfb;
    &__position {
      margin-top: 5px;
    }
  }
}
@media screen and (max-width: 1023px) {
  .changes-container {
    padding: 57px 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &_message {
      letter-spacing: -0.24px;
      color: rgba(255, 255, 255, 0.56);
      font-size: 14px;
    }
    &_email {
      color: white;
    }
  }
}
@media screen and (min-width: 1224px) {
  .changes-container {
    padding: 57px 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
