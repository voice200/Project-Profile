<template>
  <div class="profile-container_menu" id="menu-app">
    <v-card class="b-avatar_container b-avatar">
      <div class="b-avatar_cross popup" @click="goToHome">
        <div class="popup__close"></div>
      </div>
      <div class="b-avatar_img-container">
        <img
          class="b-avatar_image"
          :src="getImg(user.imageSrc)"
          v-if="user.imageSrc"
        />
        <img
          :src="getImg('user.svg')"
          alt="avatar"
          class="b-avatar_user"
          v-if="!user.imageSrc"
        />
      </div>
      <div class="b-avatar_information">
        <v-card-title class="b-avatar_title b-avatar_title__position">
          {{ user.name }} {{ user.lastName }}
        </v-card-title>
        <v-card-title class="b-avatar_title b-avatar_title__position-number">
          {{ user.phone }}
        </v-card-title>
      </div>
      <div class="b-profile_border"></div>
      <Item-menu :item="profile" />
    </v-card>
    <Item-list :items="items" />
    <div class="b-profile_exit">
      <Item-menu :item="exitButton" />
    </div>
  </div>
</template>

<script>
import ItemList from '@/components/profile/ItemList'
import { menuItems, profileItems, exit } from '@/fixtures/profile'
import ItemMenu from '@/components/profile/ItemMenu'

export default {
  name: 'app-menu',
  components: { ItemMenu, ItemList },
  props: {
    user: { type: Object, default: null }
  },
  data () {
    return {
      items: menuItems,
      profile: profileItems,
      exitButton: exit
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
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
  background: $dark-theme-gradient-profile !important;
  color: white !important;
}
#menu-app {
  border-radius: 10px;
}

.b-avatar {
  margin-bottom: 20px;
  &_container.v-sheet.v-card {
    border-radius: 0 !important;
  }
  .b-avatar_information {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .b-avatar_title {
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.24px;
    &__position {
      margin-top: 20px;
      padding: 0;
    }
    &__position-number {
      margin-top: 5px;
      padding: 0;
      margin-bottom: 30.5px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.24px;
    }
  }
  .b-avatar_image {
    width: 100px;
    object-fit: cover;
    object-position: center;
    margin-top: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-sizing: border-box;
  }
  .b-avatar_img-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .b-avatar_cross {
    top: -20px;
    cursor: pointer;
    margin-top: 70px;
    position: relative;
    z-index: 104;
  }
  .b-profile {
    padding: 13.73px 21.9px 13.73px 20.23px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    &_exit {
      margin-top: 40px;
    }
    .b-profile_menu-item {
      width: 100%;
      align-items: center;
      display: flex;
    }
    .b-profile_title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.15px;
    }
    .b-profile_icon {
      margin-right: 30px;
    }
  }
}
.profile-container_menu {
  border-radius: 10px;
}
.b-profile_exit {
  margin-top: 40px;
  margin-bottom: 50px;
}
.b-profile_header {
  min-height: 197px;
  background: $dark-theme-gradient-profile;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.15px;
  padding-left: 5px;
}

.b-profile_border {
  position: relative;
  z-index: 10;
  border-top: $dark-theme-border-profile;
  margin-left: 20px;
  margin-right: 20px;
}
.b-avatar_user {
  width: 100px;
  height: 100px;
  margin-top: 40px;
  background: #ffffff;
  border-radius: 50%;
}

.b-avatar.b-avatar_container {
  width: 100%;
  padding-top: 27px;
  position: relative;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.15px;
}
@media screen and (max-width: 1023px) {
  .profile-container_menu {
    margin-left: 0 !important;
  }
}

//media style

@media screen and (min-width: 1024px) {
  .b-profile_exit {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .b-avatar_cross {
    display: none;
  }
}
.profile-container_menu {
  border-radius: 10px !important;
  min-width: 360px;
  font-size: 12px;
  margin-left: 30px;
  .b-avatar_container {
    width: 100%;
  }
}
</style>
