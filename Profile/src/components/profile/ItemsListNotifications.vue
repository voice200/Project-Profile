<template>
  <div class="items-container-notifications">
    <div class="item" v-for="(item, i) in items" :key="i">
      <div class="item_label"></div>
      <div class="item_header">
        <span class="item_name-company">Eitan Mortgage</span>
        <span class="item_date-time">
          <span class="item_date-time_date">{{ item.date }}</span>
          <span class="item_date-time_time">{{ item.time }}</span></span
        >
      </div>
      <div class="item_message">{{ item.message | localize }}</div>
    </div>
  </div>
</template>

<script>
import { notificationsFill } from '@/fixtures/profile'
export default {
  name: 'ItemsListNotifications',
  data () {
    return {
      items: notificationsFill
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

.items-container-notifications {
  .item {
    display: grid;
    border-radius: 10px;
    margin-bottom: 20px;

    .item_header {
      display: flex;
      justify-content: space-between;
    }

    .item_label {
      background: url("~@/assets/images/profile/label-icon.svg") no-repeat;
      background-size: contain;
      background-position: left;
    }
    .item_name-company {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.24px;
      color: rgba(255, 255, 255, 0.5);
    }
    .item_date-time {
      font-size: 10px;
      line-height: 18px;
      align-items: center;
      color: rgba(255, 255, 255, 0.5);
      .item_date-time_date {
        margin-right: 7px;
      }
    }
    .item_message {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      display: flex;
      align-items: center;
    }
  }
}
// media style
@media screen and (max-width: 1023px) {
  .items-container-notifications {
  }
  .item_label {
    grid-row: 1/3;
    width: 32.08px;
    height: 27.96px;
  }
  .item {
    background: rgba(0, 0, 0, 0.3);
    grid-template-columns: 32px 1fr;
    grid-template-rows: 30px 1fr;
    grid-column-gap: 20px;
    padding: 10px 10px 12px;
  }
}
@media screen and (min-width: 1024px) {
  .items-container-notifications {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item_label {
      grid-row: 1/2;
      width: 60px;
      height: 52px;
    }
    .item_message {
      grid-column: 1/3;
    }

    .item {
      width: 420px;
      background: #020266;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      grid-template-columns: 60px 1fr;
      grid-column-gap: 30px;
      grid-row-gap: 5px;
      padding: 30px 30px 30px;
    }
  }
}
</style>
