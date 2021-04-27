<template>
  <div class="item-container" :class="getClassStatusItem(service.status)">
    <div class="item-container_header">
      <div class="item-container_status">
        <div
          class="item-container_status-icon"
          :class="getClassStatusIcon(service.status)"
        ></div>
        <div class="item-container_status_text">
          {{ getStatus.title | localize }}
        </div>
      </div>
      <div class="item-container_name-services">
        {{ service.name | localize }}
      </div>
    </div>
    <div class="item-container_main-service">
      <div
        v-for="(item, i) in service.additionalInformation"
        :key="i"
        class="item-container_additional-information"
      >
        <div class="additional-information_title">
          {{ item.title | localize }}
        </div>
        <div class="additional-information_sum">
          {{ item.sum | filterSum }} <span class="icon-₪"></span>
        </div>
      </div>
    </div>
    <div class="item-container_button-container">
      <app-button
        :on-click="goToPage"
        class="item-container_button"
        label-btn="services_documents_download"
      />
      <div
        class="item-container_payment-schedule"
        @click="downloadPaymentSchedule"
      >
        <div class="item-container_payment-schedule_arrow"></div>
        <span class="item-container_payment-schedule_text">{{
          "download_payment_schedule" | localize
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { statusService } from '@/fixtures/profile'

import AppButton from '@/components/profile/AppButton'
export default {
  name: 'ItemService',
  components: { AppButton },
  props: ['service'],
  data () {
    return {}
  },
  filters: {
    filterSum: (value) => {
      if (!value) return ''
      return value.toLocaleString()
    }
  },
  computed: {
    getClassStatusIcon () {
      return (name) => {
        if (name) {
          return `item-container_status-icon__${name}`
        } else {
          return 'item-container_status-icon__waiting'
        }
      }
    },
    getStatus () {
      return statusService.find((item) => {
        if (this.service.status) {
          return item.value === this.service?.status
        } else {
          return 'noDocs'
        }
      })
    },
    getClassStatusItem () {
      return (name) => {
        if (name) {
          return `item-container__${name}`
        } else {
          return 'item-container__waiting'
        }
      }
    }
  },
  methods: {
    goToPage () {
      this.$router.push('profile/documents')
    },
    downloadPaymentSchedule () {}
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-bottom: 20px;
  &__waiting {
    border: 1px solid #ffb800;
  }
  .item-container_status_text {
    font-size: 12px;
  }
  &_status-icon {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    &__received {
      background: green;
    }
    &__rejected {
      background: #ff8e8e;
    }
    &__waiting {
      background: #f2c94c;
    }
  }
  &_additional-information {
    display: flex;
  }
  .item-container_status {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  .additional-information_sum {
    font-size: 16px;
    line-height: 20px;
  }
  .item-container_payment-schedule {
    display: flex;
    font-size: 16px;
    line-height: 26px;
    padding-top: 20px;
    cursor: pointer;
  }
  .item-container_payment-schedule_arrow {
    width: 18px;
    height: 18px;
    background: url("~@/assets/images/profile/down-arrow.svg");
    margin-right: 20px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1100px) {
  .item-container {
    width: 517px;
  }
}
@media screen and (min-width: 1100px) {
  .item-container {
    width: 689px;
  }
}
@media screen and (max-width: 1023px) {
  .item-container {
    padding: 20px;
    width: 335px;
    &_main-service {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      margin-right: -20px;
      padding-right: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      padding-top: 30px;
      padding-bottom: 10px;
    }
    &_additional-information {
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .item-container_additional-information {
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 17px;
    }
    .item-container_name-services {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 5px;
    }
    &_button-container {
      padding-top: 30px;
      padding-bottom: 20px;
    }
  }
  .item-container_payment-schedule {
    justify-content: center;
  }
  .item-container_button {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
}

@media screen and (min-width: 1024px) {
  .item-container {
    padding: 30px 30px 40px;
    .item-container_button {
      width: 295px;
    }
    .item-container_name-services {
      font-size: 22px;
      line-height: 28px;
    }
    &_main-service {
      display: flex;
      padding: 38px 0 50px;
      justify-content: space-between;
    }
    .item-container_additional-information {
      display: flex;
      flex-direction: column;
      .additional-information_title {
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 21px;
      }
      .additional-information_sum {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
  .item-container_button {
    height: 50px;
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
