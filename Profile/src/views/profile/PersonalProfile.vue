<template>
  <div class="b-personal-profile">
    <Header type="null" :avatar="user.imageSrc" />
    <div class="profile-container">
      <Menu :user="user" />
      <div class="profile-container_information">
        <div class="profile-container_personal-data">
          <div class="profile-container_title">
            {{ "personalData" | localize }}
          </div>
          <v-text-field
            class="input profile-container_personal-data__field"
            :label="'name' | localize"
            outlined
            dark
            :placeholder="'name' | localize"
            v-model="user.name"
            :messages="'message_for_personal-data' | localize"
          >
          </v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field"
            :label="'lastname' | localize"
            :placeholder="'lastname' | localize"
            outlined
            v-model="user.lastName"
            dark
            :messages="'message_for_personal-data' | localize"
          >
          </v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field"
            :label="'numberPhone' | localize"
            :placeholder="'numberPhone' | localize"
            outlined
            v-model="user.phone"
            dark
          >
          </v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field"
            :label="'email_address' | localize"
            :placeholder="'email_address' | localize"
            outlined
            dark
            v-model="user.email"
          >
          </v-text-field>
        </div>
        <div class="profile-container_passport-data">
          <div class="profile-container_passport">
            <div class="profile-container_title">
              {{ "passportData" | localize }}
            </div>
            <div class="profile-container_data">
              <div class="profile-container_icon-camera"></div>
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'passport_seriesNumber' | localize"
                dark
                v-model="user.passportData.seriesNumber"
              ></v-text-field>
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'passport_who-issued' | localize"
                dark
                v-model="user.passportData.whoIssued"
              ></v-text-field>
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'passport_date-of-issue' | localize"
                dark
                v-model="user.passportData.dateOfIssue"
              ></v-text-field>
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'passport_city-of-birth' | localize"
                dark
                v-model="user.passportData.cityOfBirth"
              ></v-text-field>
            </div>
          </div>
          <div class="profile-container_address">
            <div class="profile-container_title">
              {{ "residenceAddress" | localize }}
            </div>
            <div class="profile-container_data">
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'address_city' | localize"
                dark
                v-model="user.address.city"
              >
              </v-text-field>
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'address_street' | localize"
                dark
                v-model="user.address.street"
              >
              </v-text-field>
              <v-text-field
                class="input profile-container_personal-data__field"
                :placeholder="'address_house-float' | localize"
                dark
                v-model="user.address.houseAndFloat"
              >
              </v-text-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Loader from '@/components/Loader.vue'
import Menu from '@/components/profile/AppMenu'

export default {
  name: 'personal-profile',
  components: { Menu, Header, Loader },
  data () {
    return {
      user: {
        passportData: {
          seriesNumber: ''
        },
        address: {
          city: ''
        }
      }
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
        if (name) {
          return require(`@/assets/images/profile/${name}`)
        } else {
          console.error(
            "This image this was not found or image's name is empty"
          )
        }
      }
    }
  },
  created () {
    setTimeout(() => {
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
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.theme--dark {
  .b-personal-profile {
    background: $dark-theme-gradient-profile !important;
    color: white !important;
  }
}
.theme--dark {
  background: $dark-theme-gradient-profile !important;
  color: white !important;
}
.theme--light {
  .b-personal-profile {
    background: #f8f8f8 !important;
  }
}
.b-personal-profile {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto !important;
  .profile-container_information {
    display: none;
  }
}

// Media styles
@media screen and (min-width: 1224px) {
  .profile-container_personal-data {
    grid-template-rows: 24px 1fr 1fr !important;
    grid-template-columns: 1fr 1fr !important;
    justify-items: stretch !important;
    grid-row-gap: 39px !important;
    grid-column-gap: 30px !important;
  }
  .profile-container_title {
    grid-column: 1/3 !important;
  }
  .profile-container_passport-data {
    margin-top: 50px;
    display: flex;
    .profile-container_title {
      margin-top: 0 !important;
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1223px) {
  .profile-container_data {
    margin-bottom: 40px;
  }
}
@media screen and (min-width: 1024px) {
  .b-personal-profile {
    overflow: hidden;
    .profile-container {
      margin-top: 100px;
      display: flex;
      justify-content: center;
      overflow-y: auto;
      position: relative;
      z-index: 100;

      .profile-container_information {
        display: block !important;
        width: 1050px;
        background: $dark-theme-gradient-profile !important;
        height: 775px;
        border-radius: 10px;
        margin-left: 30px;
        padding: 30px 90px 89px 30px;
        overflow-y: auto;
      }
      .profile-container_information {
        margin-right: 30px;
      }
      &_icon-camera {
        background: url("~@/assets/images/profile/camera.svg");
        position: absolute;
        top: 32.77px;
        right: 20px;
        width: 26px;
        height: 26px;
        background-position: center;
        background-size: cover;
      }
      &_title {
        grid-column: 1/3;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
      }
      &_passport {
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        width: 100%;

        .profile-container_title {
          margin-top: 30px;
        }

        .profile-container_data {
          height: 334px;
          justify-content: space-between;
        }
      }
      &_address {
        display: flex;
        flex-direction: column;
        width: 100%;
        .profile-container_data {
          height: 268px;
        }
      }
      &_data {
        display: flex;
        flex-direction: column;
        box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
        filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25));
        border-radius: 10px;
        height: 100%;
        width: 100%;
        border: solid 2px #5fcdbc;
        margin-top: 30px;
        padding: 50px 20px;
        position: relative;
        box-sizing: border-box;
      }
      &_personal-data {
        display: grid;
        grid-template-rows: 24px 1fr 1fr 1fr;
        grid-template-columns: 1fr;
        justify-items: stretch;
        background: none !important;
        grid-gap: 30px;

        .profile-container_title {
          grid-column: 1/2;
        }

        &__field {
          width: 100% !important;
          background: none !important;
          box-shadow: none;

          .v-messages__message {
            font-size: 14px;
            line-height: 17px;
            color: rgba(255, 255, 255, 0.4);
          }
          &::placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }
          input::placeholder {
            color: rgba(255, 255, 255) !important;
          }
          .v-text-field__slot {
            align-items: flex-end;
          }
        }
        .v-input {
          margin: 0 !important;
        }
      }
    }
  }
}
</style>
