<template>
  <Row
    data-left="Menu"
    link="/profile"
    title="settings"
    data-right="Settings"
    imageSrc="avatar.png"
  />
</template>

<script>
import Row from '@/components/Row'
export default {
  name: 'SettingsPage',
  components: { Row }
}
</script>

<style scoped></style>
