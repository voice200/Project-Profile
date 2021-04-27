<template>
  <div class="documents-container">
    <div
      class="documents-container_sub_title documents-container_sub_title__position"
    >
      {{ getSubTitle | localize }}
    </div>
    <v-select
      :items="services.map((item) => item.title)"
      :label="'documents_service' | localize"
      outlined
      v-model="currentService"
      @change="
        changedService(services.find((item) => item.title === currentService))
      "
    ></v-select>
    <div class="documents-container_hint" v-show="!currentServiceValue">
      {{ "documents_choose_services" | localize }}
    </div>
    <div
      class="documents-container_menu documents-container_menu__position"
      v-if="currentServiceValue"
    >
      <div
        v-for="item in menuItems"
        :key="item.component"
        :class="[
          'documents-container_menu-item',
          { 'menu-item_active': currentMenu === item.component },
        ]"
        @click="changeComponent(item.component)"
      >
        {{ item.title | localize }}
      </div>
    </div>
    <component
      :is="renderComponent"
      :user="user"
      :documents="getDocuments"
      v-if="currentServiceValue"
      sortKey="all"
      :filterChange="filterChange"
      :filterChanged="filterChanged"
    ></component>
  </div>
</template>

<script>
import { exampleDocuments } from '@/fixtures/profile'
export default {
  name: 'Documents',
  data: () => ({
    exampleDocuments: exampleDocuments,
    filterChange: false,
    services: [
      {
        title: 'Ипотека',
        value: 'mortgage'
      },
      {
        title: 'test',
        value: 'test'
      }
    ],
    menuItems: [
      {
        title: 'my_documents',
        component: 'MyDocuments'
      },
      {
        title: 'example_documents',
        component: 'ExampleDocuments'
      }
    ],
    currentService: null,
    currentServiceValue: null,
    currentMenu: 'MyDocuments',
    user: {}
  }),
  computed: {
    renderComponent () {
      if (this.currentMenu) {
        return () => import('@/components/profile/' + this.currentMenu)
      }
      return null
    },
    getDocuments () {
      if (this.currentServiceValue) {
        return exampleDocuments[this.currentServiceValue]
      }
      return []
    },
    getSubTitle () {
      return this.currentServiceValue
        ? 'documentation_hint_doc_show'
        : 'documents_choose_services'
    }
  },
  methods: {
    changeComponent (nameComponent) {
      this.currentMenu = nameComponent
    },
    changedService (service) {
      this.currentServiceValue = service.value
      this.currentMenu = 'MyDocuments'
      this.filterChange = true
    },
    filterChanged () {
      this.filterChange = false
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
.documents-container {
  overflow-x: hidden;
  cursor: default;
  &_menu {
    display: flex;
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
  }
  &_sub_title {
    font-size: 14px;
    line-height: 22px;
  }
  &_hint {
    font-size: 14px;
    line-height: 22px;
  }
}

//media styles

@media screen and (max-width: 1023px) {
  .documents-container {
    padding: 40px 20px 40px;
    &_sub_title {
      display: none;
    }
    &_hint {
      display: block;
    }
    &_menu {
      padding: 0 6px;
      width: 100%;
      justify-content: space-between;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      .menu-item_active {
        border-bottom: 1px solid #fff;
      }
      &__position {
        margin-top: 59px;
        margin-bottom: 54px;
      }
    }
    &_menu-item {
      padding: 2px 10px;
      text-align: center;
    }
  }
}
@media screen and (min-width: 1024px) {
  .documents-container_menu-item:nth-child(1) {
    margin-right: 50px;
  }
  .documents-container {
    padding: 20px 0 0;
    &_hint {
      display: none;
    }
    &_menu {
      justify-content: flex-start;
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 54px;

      .menu-item_active {
        transform: scale(1.1);
        border-bottom: 1px solid #fff;
        padding-left: 10px;
      }
    }
    &_sub_title {
      display: block;
      &__position {
        margin-bottom: 54px;
      }
    }
  }
}
</style>
