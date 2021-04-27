<template>
  <div>
    <div class="container_notifications">
      <ItemsListNotifications />
    </div>
  </div>
</template>

<script>
import ItemsListNotifications from '@/components/profile/ItemsListNotifications'
export default {
  name: 'Notifications',
  components: { ItemsListNotifications }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

@media screen and (max-width: 1023px) {
  .container_notifications {
    padding: 50px 20px 20px;
  }
}

@media screen and (min-width: 1024px) {
  .container_notifications {
    padding: 50px 20px 20px;
  }
}
</style>
