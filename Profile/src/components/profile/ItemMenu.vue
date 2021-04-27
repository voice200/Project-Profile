<template>
  <div class="b-menu" @click="goToPage(item.link)">
    <div class="b-menu_item">
      <div class="b-profile_icon">
        <img :src="getImg(item.icon)" alt="icon" v-if="item.icon" />
      </div>
      <div class="b-menu_title">
        {{ item.title | localize }}
      </div>
    </div>
    <div class="b-profile_arrow" v-if="item.arrow">
      <div class="icon-arrow-down arrow__position-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-menu',
  props: ['item'],
  computed: {
    getImg () {
      return (name) => {
        if (name) {
          return require(`@/assets/images/profile/${name}`)
        } else {
        }
      }
    }
  },
  methods: {
    goToPage (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.b-menu {
  padding: 17.5px 21.9px 17.5px 20.23px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  .arrow__position-right {
    transform: rotate(-90deg);
  }

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
  }
  .b-profile_icon {
    margin-right: 10.23px;
  }
}
</style>
