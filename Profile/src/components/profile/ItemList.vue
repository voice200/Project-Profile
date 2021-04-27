<template>
  <v-card>
    <v-list class="b-menu b-menu_stylisation b-common-style">
      <v-list-item-group class="b-menu_list">
        <v-list-item
          class="b-menu-item"
          v-for="(item, i) in items"
          :key="i"
          @click="goToPage(item.link)"
        >
          <v-list-item-icon class="b-menu_icon">
            <img :src="getImg(item.icon)" alt="icon" v-if="item.icon" />
          </v-list-item-icon>
          <div
            class="b_menu_border"
            :class="{ b_menu_border__border: item.divider }"
          >
            <v-list-item-content>
              <v-list-item-title class="b-menu_title b-menu_title__color">
                {{ item.title | localize }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <div class="icon-arrow-down arrow__position-right"></div>
            </v-list-item-icon>
          </div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: null }
  },
  name: 'item-list',
  data () {
    return {
      model: 1
    }
  },
  methods: {
    goToPage (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    }
  },
  computed: {
    getImg () {
      return (name) => {
        return require(`@/assets/images/profile/${name}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

.theme--dark {
  &.b-menu_stylisation.b-common-style {
    background: $dark-theme-gradient-profile !important;
  }
}
.b-menu {
  .arrow__position-right {
    transform: rotate(-90deg);
  }
  &.b-menu_stylisation.b-common-style {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
  }
  & .b-menu_list {
    font-size: 14px;
    line-height: 22px;

    .b-menu_icon {
      margin-right: 10px;
      min-width: 30px;
    }
  }
  .b_menu_border {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    padding: 0 20px 0 0;

    &__border {
      border-top: $dark-theme-border-profile-menu;
    }
  }
  .b-menu-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    padding: 0 0 0 20px;
    background: none;

    .b-menu_title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      margin-top: 7px;
    }

    .b-profile_icon {
      margin-right: 10px;
    }
  }
}
#app .v-list-item:nth-child(even) {
  background: none;
}
.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  border-radius: 0 !important;
}
</style>
