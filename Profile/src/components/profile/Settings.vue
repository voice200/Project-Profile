<template>
  <div class="container-settings">
    <div class="container-settings_title">
      {{ "change_password" | localize }}
    </div>
    <v-text-field
      class="container-settings_input input"
      :append-icon="showOldPassword ? 'icon-eye' : 'icon-eye-off'"
      :label="'old_password' | localize"
      outlined
      v-model="oldPassword"
      dark
      @click:append="showOldPassword = !showOldPassword"
      :type="showOldPassword ? 'text' : 'password'"
      @input="checkForm($v.oldPassword)"
      :hint="
        ($v.oldPassword.$dirty && !$v.oldPassword.required
          ? 'form_reqiered'
          : 'empty') | localize
      "
      :class="{
        invalid: $v.oldPassword.$dirty && !$v.oldPassword.required,
      }"
    />
    <v-text-field
      class="container-settings_input input container-settings_input_position"
      :append-icon="showNewPassword ? 'icon-eye' : 'icon-eye-off'"
      :label="'new_password' | localize"
      outlined
      v-model="newPassword"
      dark
      @click:append="showNewPassword = !showNewPassword"
      :type="showNewPassword ? 'text' : 'password'"
      @input="checkForm($v.newPassword)"
      :hint="getHintNewPassword($v.newPassword) | localize"
      :class="{
        invalid:
          $v.newPassword.$dirty &&
          (!$v.newPassword.required ||
            !$v.newPassword.minLength ||
            !$v.newPassword.maxLength),
      }"
    />
    <v-text-field
      class="container-settings_input input"
      :label="'new_password_again' | localize"
      outlined
      v-model="asPassword"
      dark
      :append-icon="showAsPassword ? 'icon-eye' : 'icon-eye-off'"
      @click:append="showAsPassword = !showAsPassword"
      :type="showAsPassword ? 'text' : 'password'"
      @input="checkForm($v.asPassword)"
      :hint="
        ($v.asPassword.$dirty && !$v.asPassword.sameAs
          ? 'passwords_must_match'
          : 'empty') | localize
      "
      :class="{
        invalid: $v.asPassword.$dirty && !$v.asPassword.sameAs,
      }"
    />
    <app-button
      :on-click="sendData"
      :disabled="!this.success"
      class="container-settings_button"
      label-btn="cardSave"
    />
    <div class="container-settings_notifications">
      <div class="container-settings_header">
        <div class="container-settings_notifications-title">
          {{ "setting_notification" | localize }}
        </div>
        <div
          class="container-settings_notifications-control"
          :class="getClassNotActiveChannel"
        >
          <v-switch v-model="switchNotification" inset></v-switch>
        </div>
      </div>
      <div
        class="container-settings_notifications-channels"
        :class="getClassNotActiveChannel"
      >
        <v-radio-group v-model="radioGroup">
          <v-radio
            class="radio-item"
            v-for="item in channels"
            :key="item.value"
            :label="item.title | localize"
            :value="item.value"
            mandatory
            :class="getClassActiveRadio(item.value)"
            @change="changeChannel(item.value)"
            :disabled="!switchNotification"
          ></v-radio>
        </v-radio-group>
      </div>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="270"
        height="100"
        class="text-center dialog"
      >
        <v-card class="password-changed">
          <v-card-text>{{ "password_changed" | localize }}</v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { formMixin } from '@/mixins/formMixin.js'
import AppButton from '@/components/profile/AppButton'
const {
  required,
  minLength,
  maxLength,
  sameAs
} = require('vuelidate/lib/validators')

export default {
  name: 'Settings',
  components: { AppButton },
  mixins: [formMixin],
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      asPassword: '',
      radioGroup: 1,
      switchNotification: true,
      showOldPassword: false,
      showNewPassword: false,
      showAsPassword: false,
      channels: [
        {
          title: 'setting_notification_on_phone',
          value: 'phone'
        },
        {
          title: 'setting_notification_on_email',
          value: 'email'
        }
      ],
      channelCurrent: 'phone',
      dialog: false
    }
  },
  methods: {
    sendData () {
      this.dialog = true
      setTimeout(() => {
        this.dialog = false
        this.$router.push('/profile')
      }, 3000)
    },
    changeChannel (value) {
      this.channelCurrent = value
    }
  },
  computed: {
    getHintNewPassword () {
      return (field) => {
        if (field.$dirty) {
          if (!field.required) {
            return 'form_reqiered'
          }
          if (!field.minLength || !field.maxLength) {
            return 'passwords_length'
          }
          return 'empty'
        } else {
          return 'empty'
        }
      }
    },
    getClassActiveRadio () {
      return (value) => {
        if (value === this.channelCurrent) {
          return 'activeRadioClass'
        } else {
          return null
        }
      }
    },
    getClassNotActiveChannel () {
      if (!this.switchNotification) {
        return 'notActiveChannel'
      }
      return null
    }
  },
  updated () {
    console.log('this.changeNotification', this.switchNotification)
  },
  validations: {
    oldPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(40)
    },
    asPassword: {
      sameAs: sameAs('newPassword')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-settings {
  .container-settings_title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  &_container-inputs {
  }
  .container-settings_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media screen and (max-width: 1023px) {
  .container-settings {
    padding: 50px 20px 40px;
    .container-settings_input {
      margin-bottom: 30px;
    }
    .container-settings_title {
      margin-bottom: 35px;
    }
    .container-settings_button {
      margin-top: 30px;
    }
    .container-settings_notifications-control {
      margin-top: 10px;
    }
    .container-settings_notifications-channels {
      margin-top: 20px;
    }
    .container-settings_notifications {
      margin-top: 30px;
    }
    .container-settings_notifications-title {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.24px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .container-settings {
    padding: 50px 0 20px;
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .container-settings_header {
      margin-bottom: 30px;
    }
    .container-settings_title {
      margin-bottom: 30px;
    }
    .container-settings_button {
      width: 450px;
      height: 56px;
      line-height: 56px;
    }
    .container-settings_notifications {
      margin-top: 30px;
      width: 450px;
    }
    .container-settings_notifications-title {
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.24px;
    }
    .container-settings_title {
      display: none;
    }
  }
}
</style>
