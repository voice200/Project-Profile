<template>
  <div class="b-personal-profile">
    <div class="b-personal-profile_avatar b-personal-profile_avatar__position">
      <img
        :src="getImg(user.imageSrc)"
        alt="avatar"
        class="b-avatar_image"
        v-if="user.imageSrc"
      />
      <img
        :src="getImg('user.svg')"
        alt="avatar"
        class="b-avatar_user"
        v-if="!user.imageSrc"
      />
      <div
        class="profile-container_icon-camera profile-container_icon-camera__position-avatar"
      ></div>
      <div class="b-profile_border b-profile_border__position"></div>
      <div class="b-personal-profile_inputs">
        <v-text-field
          class="input profile-container_personal-data__field"
          outlined
          dark
          :placeholder="'initials' | localize"
          v-model="user.name"
          :messages="'message_for_personal-data' | localize"
        >
        </v-text-field>
      </div>
    </div>
    <div
      class="profile-container_personal-data profile-container_personal-data_position"
    >
      <div class="profile-container_title profile-container_title_visible">
        {{ "personalData" | localize }}
      </div>
      <v-text-field
        class="input profile-container_personal-data__field profile-container_personal-data__display"
        :label="'initials' | localize"
        outlined
        dark
        :placeholder="'initials' | localize"
        v-model="user.name"
        :messages="'message_for_personal-data' | localize"
        @click="classActive"
      >
      </v-text-field>
      <div class="profile-container_for-inputs visible">
        <v-text-field
          class="input profile-container_personal-data__field"
          :class="getClassInput('phone')"
          :label="(!phone ? 'numberPhone' : 'empty') | localize"
          :placeholder="'numberPhone' | localize"
          outlined
          v-model="user.phone"
          dark
          @focusin="classActive('phone')"
          @focusout="classActive('phone')"
        >
        </v-text-field>
        <div class="b_menu_border b_menu_border__border"></div>
        <v-text-field
          class="input profile-container_personal-data__field"
          :class="getClassInput('email')"
          :label="'email_address' | localize"
          :placeholder="'email_address' | localize"
          outlined
          dark
          v-model="user.email"
          @focusin="classActive('email')"
          @focusout="classActive('email')"
        >
        </v-text-field>
      </div>
      <v-text-field
        class="input profile-container_personal-data__field profile-container_personal-data__display"
        :label="'numberPhone' | localize"
        :placeholder="'numberPhone' | localize"
        outlined
        v-model="user.phone"
        dark
      >
      </v-text-field>
      <v-text-field
        class="input profile-container_personal-data__field profile-container_personal-data__display"
        :label="'email_address' | localize"
        :placeholder="'email_address' | localize"
        outlined
        dark
        v-model="user.email"
      >
      </v-text-field>
      <div
        class="profile-container_title profile-container_title_position visible"
      >
        {{ "residenceAddress" | localize }}
      </div>
      <div class="profile-container_for-inputs visible">
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'address_city' | localize"
          :placeholder="'address_city' | localize"
          outlined
          v-model="user.address.city"
          dark
          @focusin="classActive('city')"
          :class="getClassInput('city')"
          v-if="!city"
        >
        </v-text-field>
        <v-autocomplete
          class="input profile-container_personal-data__field"
          :label="'address_city' | localize"
          :placeholder="'address_city' | localize"
          outlined
          v-model="user.address.city"
          dark
          :class="getClassInput('city')"
          append-icon="icon-arrow-down"
          ref="city"
          cache-items
          item-text="name"
          item-value="value"
          @focusout="classActive('city')"
          v-if="city"
        >
        </v-autocomplete>
        <div class="b_menu_border b_menu_border__border"></div>
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'address_street' | localize"
          :placeholder="'address_street' | localize"
          outlined
          dark
          v-model="user.address.street"
          @focusin="classActive('street')"
          @focusout="classActive('street')"
          :class="getClassInput('street')"
        >
        </v-text-field>
        <div class="b_menu_border b_menu_border__border"></div>
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'address_house-float' | localize"
          :placeholder="'address_house-float' | localize"
          outlined
          dark
          v-model="user.address.houseAndFloat"
          @focusin="classActive('houseAndFloat')"
          @focusout="classActive('houseAndFloat')"
          :class="getClassInput('houseAndFloat')"
        >
        </v-text-field>
      </div>
      <div
        class="profile-container_title profile-container_title_position visible"
      >
        {{ "passportData" | localize }}
      </div>
      <div class="profile-container_for-inputs visible">
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'passport_seriesNumber' | localize"
          :placeholder="'passport_seriesNumber' | localize"
          outlined
          v-model="user.passportData.seriesNumber"
          dark
          @focusin="classActive('seriesNumber')"
          @focusout="classActive('seriesNumber')"
          :class="getClassInput('seriesNumber')"
        >
        </v-text-field>
        <div class="b_menu_border b_menu_border__border"></div>
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'passport_who-issued' | localize"
          :placeholder="'passport_who-issued' | localize"
          outlined
          dark
          v-model="user.passportData.whoIssued"
          @focusin="classActive('whoIssued')"
          @focusout="classActive('whoIssued')"
          :class="getClassInput('whoIssued')"
        >
        </v-text-field>
        <div class="b-profile_border b_menu_border__border"></div>
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'passport_date-of-issue' | localize"
          :placeholder="'passport_date-of-issue' | localize"
          outlined
          dark
          v-model="user.passportData.dateOfIssue"
          @focusin="classActive('dateOfIssue')"
          @focusout="classActive('dateOfIssue')"
          :class="getClassInput('dateOfIssue')"
        >
        </v-text-field>
        <div class="b_menu_border b_menu_border__border"></div>
        <v-text-field
          class="input profile-container_personal-data__field"
          :label="'passport_city-of-birth' | localize"
          :placeholder="'passport_city-of-birth' | localize"
          outlined
          dark
          v-model="user.passportData.cityOfBirth"
          @focusin="classActive('cityOfBirth')"
          @focusout="classActive('cityOfBirth')"
          :class="getClassInput('cityOfBirth')"
        >
        </v-text-field>
      </div>
    </div>
    <div class="profile-container_passport-data">
      <div class="profile-container_passport">
        <div
          class="profile-container_title profile-container_title_position profile-container_title_visible"
        >
          {{ "passportData" | localize }}
        </div>
        <div class="profile-container_data">
          <div
            class="profile-container_icon-camera profile-container_icon-camera__position"
          ></div>
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'passport_seriesNumber' | localize"
            dark
            v-model="user.passportData.seriesNumber"
          ></v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'passport_who-issued' | localize"
            dark
            v-model="user.passportData.whoIssued"
          ></v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'passport_date-of-issue' | localize"
            dark
            v-model="user.passportData.dateOfIssue"
          ></v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'passport_city-of-birth' | localize"
            dark
            v-model="user.passportData.cityOfBirth"
          ></v-text-field>
        </div>
      </div>
      <div class="profile-container_address">
        <div
          class="profile-container_title profile-container_title_position profile-container_title_visible"
        >
          {{ "residenceAddress" | localize }}
        </div>
        <div class="profile-container_data">
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'address_city' | localize"
            dark
            v-model="user.address.city"
          >
          </v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'address_street' | localize"
            dark
            v-model="user.address.street"
          >
          </v-text-field>
          <v-text-field
            class="input profile-container_personal-data__field profile-container_personal-data__display"
            :placeholder="'address_house-float' | localize"
            dark
            v-model="user.address.houseAndFloat"
          >
          </v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handlerEvent } from '@/handlerEvent'
export default {
  name: 'personal-profile',
  components: {},
  data () {
    return {
      user: {
        passportData: {
          seriesNumber: ''
        },
        address: {
          city: ''
        }
      },
      phone: false,
      email: false,
      city: false,
      street: false,
      houseAndFloat: false,
      seriesNumber: false,
      whoIssued: false,
      dateOfIssue: false,
      cityOfBirth: false,
      initialPhone: false,
      initialEmail: false,
      cities: []
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    classActive (field) {
      this[field] = !this[field]
    },
    saveChange () {
      if (
        this.initialPhone !== this.user.phone ||
        this.initialEmail !== this.user.email
      ) {
        this.$router.push('/profile/information/changes')
      } else {
        this.$router.push('/profile')
      }
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
          return null
        }
      }
    },
    getClassInput () {
      return (field) => {
        if (this[field]) {
          return 'activeInput'
        }
        return null
      }
    }
  },
  created () {
    setTimeout(() => {
      const user = {
        name: 'Мария Митракова',
        phone: '+7 (911) 715-58-67',
        imageSrc: '',
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
      this.user = user
      this.initialEmail = user.email
      this.initialPhone = user.phone
    }, 0)
  },
  mounted () {
    handlerEvent.$on('save', this.saveChange)
    const localeName = this.$store.state.is_heb_lang ? 'name_he' : 'name_ru'
    this.axios
      .get('cities?sort=population&projection=id,' + localeName)
      .then((response) => {
        this.cities = response.data.map((e) => ({
          name: e[localeName],
          value: e.id
        }))
      })
      .catch((e) => {
        this.error = 'server_error'
        this.$scrollTo('.error__container', 300, { offset: -400 })
      })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.b-personal-profile {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto !important;
  overflow-x: hidden;
}

// Media styles
@media screen and (max-width: 1023px) {
  .b-personal-profile {
    padding: 40px 0 100px;
    position: relative;
    .b-personal-profile_icon_position {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000000;
      cursor: pointer;
    }
    .profile-container_title_visible {
      display: none;
    }
    .profile-container_title {
      font-size: 16px;
      line-height: 26px;
    }
    .visible {
      display: block;
    }
    .profile-container_title_position {
      margin-top: 30px;
      margin-bottom: 5px;
      padding-left: 20px;
    }
  }
  .profile-container_for-inputs {
    background: $dark-theme-gradient-profile;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  .b-profile_border {
    display: block;
    position: relative;
    z-index: 10;
    border-top: $dark-theme-border-profile;
    width: 90%;
    &__position {
      margin-bottom: 14.5px;
    }
  }
  .b-personal-profile_icon_position {
    left: 10px;
  }
  .b-personal-profile_avatar {
    display: flex;
    width: 100%;
    margin-top: -49px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $dark-theme-gradient-profile;
    &__position {
      margin-bottom: 20px;
    }
    .b-avatar_image {
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: border-box;
      margin-top: 40px;
    }
    .b-avatar_user {
      width: 100px;
      height: 100px;
      margin-top: 40px;
      background: #ffffff;
      border-radius: 50%;
    }
    .profile-container_icon-camera {
      background: url("~@/assets/images/profile/camera.svg");
      width: 26px;
      height: 26px;
      background-position: center;
      background-size: cover;
      &__position-avatar {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  }
  .b-personal-profile_inputs {
    width: 100%;
    padding: 0 20px;
    margin-bottom: -27px;
    display: flex;
  }
  .profile-container_personal-data__display {
    display: none !important;
  }
  .profile-container_personal-data_position {
    margin-top: 20px;
  }
  .b_menu_border {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    padding: 0 20px 0 0;
    margin-left: 20px;

    &__border {
      border-top: $dark-theme-border-profile-menu;
    }
  }
  .icon-₪.b-personal-profile_icon_position {
    position: fixed;
    top: 91px;
    z-index: 1000004 !important;
    cursor: pointer;
    font-size: 20px;
    color: aqua;
    right: 10px;
  }
}
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
  .b-profile_border {
    display: none;
  }
  .b-personal-profile {
    padding: 40px 0 40px;
    overflow: hidden;
    .b-personal-profile_avatar {
      display: none;
    }
    .visible {
      display: none;
    }
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
        width: 26px;
        height: 26px;
        background-position: center;
        background-size: cover;
        &__position {
          position: absolute;
          top: 32.77px;
          right: 20px;
        }
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
