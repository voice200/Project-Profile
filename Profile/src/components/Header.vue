<template>
  <header class="header" v-bind:class="{ header_inner: type == 'inner' }">
    <router-link to="/" class="logo"></router-link>
    <button class="burger" v-on:click="$store.commit('toggleMenu')">
      <span></span>
    </button>
    <button class="header__login" v-if="!avatar"></button>
    <img v-if="avatar" class="b-avatar_image" :src="getImg(avatar)" />
    <button class="header__theme" v-on:click="setTheme">
      <div class="icon-dark"></div>
      <div class="icon-light"></div>
    </button>
    <button
      class="header__lang"
      v-bind:class="{ header__lang_active: $store.state.is_heb_lang }"
      v-on:click="setLocale"
    >
      <div class="flag flag_ru">RU</div>
      <div class="flag flag_heb">HEB</div>
    </button>
    <div class="block block_big"></div>
    <div class="block block_small"></div>
    <div v-if="type == 'index'">
      <button
        class="header__call icon-call"
        v-on:click="$store.commit('togglePopup')"
      ></button>
    </div>
    <div v-else-if="type == 'inner'">
      <div class="popup header_popup">
        <router-link
          v-if="title === 'changes'"
          :to="backlink"
          class="popup__close"
        ></router-link>
      </div>
      <div
        class="header__title header__title_step header__title_display"
        :class="'header__title_step_' + step"
      >
        <router-link
          v-if="title !== 'changes'"
          :to="backlink"
          class="header__home icon-arrow icon-arrow__position"
          :class="{ header__title_display: avatar }"
        ></router-link>
        <div
          :class="{ header_title__center: title !== 'personal_information' }"
        >
          {{ title | localize }}
        </div>
        <div
          v-if="title === 'personal_information'"
          class="icon-check b-personal-profile_icon_position header__title_display"
          @click="saveChange"
        ></div>
      </div>
    </div>
    <div v-else-if="type == 'text'"></div>
  </header>
</template>

<script>
import { commonMixin } from '@/mixins/commonMixin.js'
import { handlerEvent } from '@/handlerEvent'

export default {
  name: 'Header',
  mixins: [commonMixin],
  props: {
    backlink: { type: String, default: '/' },
    type: { type: String, default: 'inner' },
    title: { type: String, default: 'information' },
    step: { type: Number, default: 1 },
    avatar: { type: String, default: null }
  },
  computed: {
    getImg () {
      return (name) => {
        return require(`@/assets/images/profile/${name}`)
      }
    }
  },
  methods: {
    saveChange () {
      handlerEvent.$emit('save')
    }
  }
}
</script>
<style lang="scss" scoped>
.b-avatar_image {
  display: none;
}

// Media styles
@media screen and (min-width: 1024px) {
  .b-avatar_image {
    display: block;
    width: 40px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    border: 1px solid #fff;
    box-sizing: border-box;
    position: relative;
    float: right;
    margin-top: 40px;
    margin-right: 30px;
    margin-left: 30px;
  }
  .header__title_display {
    display: none;
  }
}
@media screen and (max-width: 1023px) {
  .header_popup {
    top: 67px;
  }
}
</style>
