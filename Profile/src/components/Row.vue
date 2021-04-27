<template>
  <div class="container-component">
    <Header :backlink="link" :title="title" :avatar="imageSrc" />
    <div class="profile-container">
      <div class="dataLeft">
        <AppMenu :user="user" />
      </div>
      <div class="profile-container_information">
        <div class="profile-container_title">
          <div
            class="icon-arrow-down arrow__position-left icon-arrow__position-left"
            @click="goToPage"
          ></div>
          {{ title | localize }}
        </div>
        <component :is="renderComponent"></component>
      </div>
    </div>
    <Loader />
  </div>
</template>

<script>
import AppMenu from '@/components/profile/AppMenu.vue'
import Header from '@/components/Header'
import Loader from '@/components/Loader'

export default {
  props: ['dataRight', 'imageSrc', 'title', 'link'],
  name: 'Row',
  components: { Loader, Header, AppMenu },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    renderComponent () {
      return () => import('@/components/profile/' + this.dataRight)
    }
  },
  methods: {
    goToPage () {
      this.$router.push(this.link)
    }
  },
  created () {
    setTimeout(() => {
      (() => {
        this.user = {
          name: 'Мария',
          lastName: 'Митракова',
          phone: '+7 (911) 715-58-67',
          imageSrc: 'avatar.png',
          email: 'eitanmortgage@gmail.com',
          passportData: {
            seriesNumber: '',
            whoIssued: '',
            dateOfIssue: '',
            cityOfBirth: ''
          },
          address: {
            city: '',
            street: '',
            houseAndFloat: ''
          }
        }
      })()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";

.theme--dark {
  .container-component {
    background: $dark-theme-gradient-profile !important;
    color: white !important;
  }
}
.theme--light {
  .container-component {
    background: #f8f8f8 !important;
  }
}
.container-component {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .dataLeft {
    display: none;
  }
  .profile-container {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 100;
    height: 100%;
    overflow: hidden;
  }
  .profile-container_information {
    width: 100%;
    overflow-y: auto;
    height: 100%;
  }
}
.profile-container_title {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  display: none;
  .icon-arrow__position-left {
    transform: rotate(90deg);
    margin-left: 0;
    margin-right: 15px;
  }
}
@media screen and (max-width: 1023px) {
  .profile-container {
    margin-top: 100px !important;
  }
  .profile-container_information {
    padding: 0 !important;
    margin-right: 0 !important;
    margin-top: 30px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1223px) {
  .profile-container {
    margin-top: 29px !important;
  }
  .container-component {
    margin-bottom: 30px;
  }
  .profile-container_information {
    padding-bottom: 10px !important;
  }
}
@media screen and (min-width: 1224px) {
  .profile-container_information {
    height: 775px !important;
  }
}

@media screen and (min-width: 1024px) {
  .profile-container {
    margin-top: 100px;
  }
  .dataLeft {
    display: block !important;
  }
  .profile-container_title {
    display: flex !important;
  }
  .container-component {
    overflow: hidden;

    .profile-container {
      display: flex;
      justify-content: center;
      overflow-y: auto;
      position: relative;
      z-index: 100;

      .profile-container_information {
        display: block !important;
        width: 1050px;
        background: $dark-theme-gradient-profile !important;
        min-height: 775px;
        overflow: auto;
        border-radius: 10px;
        margin-left: 30px;
        padding: 30px 90px 89px 30px;
      }
      .profile-container_information {
        margin-right: 30px;
      }
    }
  }
}
</style>
