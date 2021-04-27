<template>
  <Row
    data-left="Menu"
    link="/profile/payments"
    title="addCard"
    data-right="AddCard"
    imageSrc="avatar.png"
  />
</template>

<script>
import Row from '@/components/Row'

export default {
  name: 'add-new-card',
  components: { Row },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
