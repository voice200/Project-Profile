<template>
  <div class="my-documents">
    <div class="my-documents_block-name">
      <div class="my-documents_name">{{ user.name }} {{ user.lastName }}</div>
      <div class="my-documents_sort">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <div class="my-documents_sort_title" v-on="on">
              {{ "documents_sort" | localize }}
              <span class="icon-arrow-down my-documents_sort_icon"></span>
            </div>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              class="my-documents_sort_item"
            >
              <v-list-item-title
                @click="sortDocuments(item.value)"
                class="my-documents_sort_item"
                >{{ item.title | localize }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="my-documents_no-documents" v-show="!filterDocuments.length">
      {{ "documents_other_filter" | localize }}
    </div>
    <div class="my-documents_block-documents" v-show="filterDocuments.length">
      <ItemDocument
        :user="user"
        v-for="(item, index) in filterDocuments"
        :document="item"
        :key="index"
        :check="checkDocuments"
      />
      <div class="container-button">
        <app-button
          labelBtn="send_documents"
          :onClick="sendDocuments"
          class="my-documents_button"
          :disabled="!check"
          v-show="filterDocuments.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemDocument from '@/components/profile/ItemDocument.vue'
import AppButton from '@/components/profile/AppButton'

export default {
  props: {
    user: { type: Object, default: null },
    documents: { type: Array, default: null },
    sortKey: { type: String, default: 'all' },
    filterChanged: { type: Function, default: null },
    filterChange: { type: Boolean, default: null }
  },
  components: { AppButton, ItemDocument },
  name: 'MyDocuments',
  data: () => ({
    items: [
      {
        title: 'documents_filter_all',
        value: 'all'
      },
      {
        title: 'documents_filter_done',
        value: 'done'
      },
      {
        title: 'documents_filter_not_done',
        value: 'notDone'
      }
    ],
    check: false,
    filter: 'all'
  }),
  methods: {
    sendDocuments () {
      this.documents.forEach((item) => {
        if (item.status !== 'received') {
          item.status = 'check'
        }
      })
      this.check = false
    },
    sortDocuments (value) {
      this.filter = value
    },
    checkDocuments () {
      this.check = this.documents.every((item) => item.status !== 'noDocs')
    }
  },
  computed: {
    filterDocuments () {
      if (this.filter === 'done') {
        return this.documents.filter((item) => item.status !== 'noDocs')
      } else if (this.filter === 'notDone') {
        return this.documents.filter((item) => item.status === 'noDocs')
      }
      return this.documents
    }
  },
  beforeUpdate () {
    if (this.filterChange) {
      this.filter = 'all'
      this.filterChanged()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default/vars.scss";
.my-documents {
  .my-documents_sort_item {
    cursor: default;
  }
  .container-button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  &_no-documents {
    font-size: 14px;
    line-height: 22px;
  }
  &_button {
    margin: 30px 0 40px;
  }
  &_block-name {
    display: flex;
    justify-content: space-between;
    cursor: default;
  }
  &_sort {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    .my-documents_sort_title {
      display: flex;
      line-height: 26px;
      align-items: center;
      cursor: pointer;
    }
    .icon-arrow-down::before {
      font-size: 10px;
      margin-left: 10px;
    }
  }
  &_name {
    font-size: 16px;
    line-height: 26px;
    display: flex;
    text-align: center;
    font-style: normal;
    font-weight: normal;
  }
  .my-documents_block-documents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

//media styles

@media screen and (max-width: 1023px) {
  .my-documents {
    .my-documents_block-documents {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-top: 16px;
    }
    &_no-documents {
      margin-top: 20px;
    }
  }
}
@media screen and (min-width: 1024px) {
  .my-documents {
    &__block-documents {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 100%;
    }
    &_name {
      margin-bottom: 30px;
    }
  }
}
</style>
