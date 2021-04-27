<template>
  <div class="container-services">
    <item-service
      v-for="(service, i) of services"
      :key="i"
      :service="service"
    />
  </div>
</template>

<script>
import { servicesItems } from '@/fixtures/profile'
import ItemService from '@/components/profile/ItemService'
export default {
  name: 'Services',
  components: { ItemService },
  data () {
    return {
      services: servicesItems
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

@media screen and (max-width: 1023px) {
  .container-services {
    padding: 32px 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}

@media screen and (min-width: 1024px) {
  .container-services {
    padding: 30px 0 40px;
  }
}
</style>
