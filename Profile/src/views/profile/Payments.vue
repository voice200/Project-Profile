<template>
  <Row
    data-left="Menu"
    link="/profile"
    title="titlePayments"
    data-right="Payment"
    imageSrc="avatar.png"
  />
</template>

<script>
import Row from '@/components/Row'
export default {
  name: 'payments',
  components: { Row },
  data () {
    return {}
  },
  methods: {
    goToPage () {
      this.$router.push('/profile/add-card')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
</style>
