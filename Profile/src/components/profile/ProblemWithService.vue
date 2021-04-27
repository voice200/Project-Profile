<template>
  <div class="problem-services-container">
    <div
      class="problem-services-container_title problem-services-container_title__position"
    >
      {{ "dont_came_sms" | localize }}
    </div>
    <div
      class="problem-services-container_message problem-services-container_message__position"
    >
      {{ "problemWithService_message" | localize }}
    </div>
    <div class="problem-services-container_radio">
      <v-radio-group v-model="radioGroup">
        <v-radio
          class="radio-item"
          v-for="item in problems"
          :key="item.value"
          :label="item.title | localize"
          :value="item.value"
          mandatory
          :class="getClassActiveRadio(item.value)"
          @change="changeChannel(item.value)"
        ></v-radio>
      </v-radio-group>
    </div>
    <app-button
      :on-click="sendMessage"
      label-btn="problemWithService_send"
    ></app-button>
  </div>
</template>

<script>
import AppButton from '@/components/profile/AppButton'
export default {
  name: 'ProblemWithService',
  components: { AppButton },
  props: ['onClick'],
  data () {
    return {
      radioGroup: 1,
      problems: [
        {
          title: 'problemWithService_radio_one',
          value: 'check-phone'
        },
        {
          title: 'problemWithService_radio_two',
          value: 'sim-card'
        },
        {
          title: 'problemWithService_radio_three',
          value: 'service-problem'
        }
      ],
      channelCurrent: 'check-phone'
    }
  },
  methods: {
    sendMessage () {
      this.channelCurrent = 'check-phone'
      this.onClick()
    },
    changeChannel (value) {
      this.channelCurrent = value
    }
  },
  computed: {
    getClassActiveRadio () {
      return (value) => {
        if (value === this.channelCurrent) {
          return 'activeRadioClass'
        } else {
          return null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.problem-services-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $dark-theme-gradient-profile;
  &_title {
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.24px;
    color: white;
    &__position {
      margin-bottom: 24px;
    }
  }
  &_message {
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.24px;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    &__position {
      margin-bottom: 26px;
    }
  }
  &_radio {
    margin-bottom: -20px;
  }
}

@media screen and (max-width: 1023px) {
  .problem-services-container {
    padding: 30px 10px;
  }
}
@media screen and (min-width: 1224px) {
  .problem-services-container {
    padding: 30px 10px;
  }
}
</style>
