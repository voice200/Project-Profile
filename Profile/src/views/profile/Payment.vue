<template>
  <Row
    data-left="Menu"
    link="/profile/payments"
    title="titlePayments"
    data-right="CardInformation"
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
  }
}
</script>

<style lang="scss" scoped></style>
