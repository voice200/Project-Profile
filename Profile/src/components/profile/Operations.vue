<template>
  <div
    class="container-operations"
    :class="{
      'container-operations_preview': position === 1,
      'container-operations_full': position === 2,
      'container-operations_hidden': position === 0,
    }"
  >
    <div class="container-operations_button" @click="changePosition"></div>
    <div class="container-operations_items__overflow">
      <div
        class="container-operations_for-day"
        :class="{
          'container-operations_for-day_overflow': position === 2,
        }"
      >
        <div class="container-operations_title">
          {{ date | localize }}
        </div>
        <div
          class="container-operations_items"
          v-for="(operation, i) in operations"
          :key="i"
        >
          <div class="b-menu">
            <div class="b-menu_item">
              <div class="b-profile_icon">
                <div :class="operation.image"></div>
              </div>
              <div class="b-menu_title">
                {{ operation.name | localize }}
                <div class="b-menu_sub_title">
                  {{ operation.type | localize }}
                </div>
              </div>
            </div>
            <div class="b-menu_sum">
              - {{ operation.sum }}
              <span class="icon-₪"></span>
            </div>
          </div>
          <div class="container-operation_border"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { payments } from '@/fixtures/profile'

export default {
  name: 'operations',
  data () {
    return {
      date: 'date_operation_today',
      operations: payments,
      position: 0
    }
  },
  methods: {
    changePosition () {
      this.position++
      if (this.position === 3) {
        this.position = 0
      }
    },
    showHeight () {
      if (window.innerHeight >= 800) this.position = 1
      else this.position = 0
    }
  },
  created () {
    window.addEventListener('resize', this.showHeight)
  },
  destroyed () {
    window.removeEventListener('resize', this.showHeight)
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/default/vars.scss";
.container-operations {
  width: 100%;
  overflow: hidden;
  z-index: 140;
  display: flex;
  flex-direction: column;
  background: $dark-theme-gradient-profile;
  padding: 0 0 20px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition-property: height;
  transition-duration: 0.5s;

  .container-operation_border {
    width: 100%;
    border-top: 1px solid #001742;
    margin-left: 51px;
  }
  &_preview {
    height: 250px;
  }
  &_full {
    height: calc(100% - 85px);
  }
  &_hidden {
    height: 32px;
  }
  &_for-day_overflow {
    height: 100%;
    overflow-x: hidden;
  }
  .container-operations_items__overflow {
    height: 100%;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }
  .b-menu_sub_title {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.24px;
    color: rgba(255, 255, 255, 0.5);
  }

  &_title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.24px;
    margin-bottom: 20px;
  }

  .b-menu {
    padding: 17.5px 0 17.5px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;

    .b-menu_item {
      width: 100%;
      align-items: center;
      display: flex;
      cursor: pointer;
    }

    .b-menu_title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.15px;
      padding-left: 18px;
    }

    .b-menu_sum {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.24px;
      width: 105px;
      text-align: end;
      margin-right: 20px;
    }

    .circle-blue {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(180deg, #4b98fb 0%, #1e60f5 100%);
      box-shadow: 0px 0px 14px rgba(32, 98, 247, 0.5),
        inset 0px 2px 2px rgba(27, 76, 169, 0.5);
    }
  }
}

// Media styles
@media screen and (max-width: 1023px) {
  .container-operations {
    width: 100%;
    position: absolute;
    z-index: 1400;
    bottom: 0;
    right: 0;
    left: 0;

    &_button {
      width: 55px;
      border-bottom: 4px solid #001351;
      border-radius: 9px;
      align-self: center;
      position: relative;
      z-index: 1400;
      margin-top: 15px;
      margin-bottom: 11px;
      cursor: pointer;
      margin-right: 14px;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1223px) {
  .container-operations {
    position: relative;
    height: 100%;
    border: 1px solid #0041c2;
    box-sizing: border-box;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25),
      inset 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-top: 20px;
    overflow: hidden;
    padding-bottom: 20px;
    width: 100%;
    margin-top: 20px;

    &_for-day {
      overflow: hidden;
    }

    &_button {
      display: none;
    }
    &_title {
      margin-bottom: 0px !important;
    }
  }
}

@media screen and (min-width: 1224px) {
  .container-operations {
    width: 100% !important;
    position: relative;
    margin-top: 70px;
    border: 1px solid #0041c2;
    box-sizing: border-box;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25),
      inset 0 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-top: 20px;
    overflow: hidden;
    padding-bottom: 58px;
    height: 100%;

    &_for-day {
      overflow: hidden;
    }

    &_button {
      display: none;
    }
  }
}
@media screen and (min-width: 1400px) {
  .container-operations {
    width: 100% !important;
  }
}
</style>
