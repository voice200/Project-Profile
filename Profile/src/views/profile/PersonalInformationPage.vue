<template>
  <Row
    link="/profile"
    title="personal_information"
    data-right="PersonalInformation"
    imageSrc="avatar.png"
  />
</template>

<script>
import Row from '@/components/Row'
export default {
  name: 'PersonalInformationPage',
  components: { Row }
}
</script>

<style scoped></style>
