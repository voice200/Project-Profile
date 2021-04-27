<template>
  <div class="item-document">
    <div
      class="item-document_document-block"
      :class="getClassDocument(document.status)"
    >
      <div class="item-document_message">
        <div class="item-document_icon" @click="showMessage">
          <div class="item-document_icon_notification">
            <div
              class="item-document_icon_general"
              :class="getClassStatusMessage"
            ></div>
          </div>
          <div class="item-document_icon_message"></div>
        </div>
        <div class="item-document_block-message" :class="getClassMessage">
          <div class="item-document_block-message_title">
            {{ "documents_comments_moderator" | localize }}
          </div>
          <div class="item-document_block-message_text">
            {{ newMessage | localize }}
          </div>
        </div>
      </div>
      <div
        class="item-document_image item-document_image__position"
        v-if="document.status !== 'noDocs'"
      >
        <img
          class="item-document_image_document"
          :src="document.imageSrc"
          alt="title-doc"
        />
      </div>
      <div class="item-document_title item-document_title__position">
        {{ document.title | localize }}
      </div>
      <div
        class="item-document_status"
        v-if="getStatus.title && document.status !== 'downloaded'"
      >
        <div
          class="item-document_status-color"
          :class="getClassStatusIcon(document.status)"
        ></div>
        <div class="item-document_status-text">
          {{ getStatus.title | localize }}
        </div>
      </div>
    </div>
    <div
      class="item-document_button"
      v-if="document.status !== 'received'"
      @click="updateDocument(getButton.functionButton)"
    >
      {{ getButton.title | localize }}
      <input
        ref="downloadImg"
        class="item-document_file"
        type="file"
        :name="document.value"
        accept="image/*"
        @change="documentDownload"
      />
    </div>
  </div>
</template>

<script>
import { statusDocument, documentButton } from '@/fixtures/profile'

export default {
  name: 'documentItem',
  props: {
    user: { type: Object, default: null },
    document: { type: Object, default: null },
    check: { type: Function, default: null }
  },
  data () {
    return {
      img: '',
      isMessage: false,
      message: false,
      newMessage: 'documents_comments_moderator'
    }
  },
  computed: {
    getStatus () {
      return statusDocument.find((item) => {
        if (this.document.status && this.document.status !== 'downloaded') {
          return item.value === this.document?.status
        } else {
          return 'noDocs'
        }
      })
    },
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
    },
    getClassDocument () {
      return (name) => {
        if (name) {
          return name
        } else {
          return 'noDocs'
        }
      }
    },
    getClassStatusIcon () {
      return (name) => {
        if (name) {
          return `item-document_status-color__${name}`
        } else {
          return 'noDocs'
        }
      }
    },
    getClassStatusMessage () {
      if (this.isMessage) {
        return 'item-document_icon_has-message'
      } else {
        return 'item-document_icon_question'
      }
    },
    getClassMessage () {
      if (this.message) {
        return 'item-document_block-message_visible'
      } else {
        return 'item-document_block-message_not-visible'
      }
    },
    getButton () {
      return documentButton.find((item) => {
        if (this.document.status === 'noDocs') {
          return item.functionButton === 'documentDownload'
        }
        return item.functionButton === 'documentDelete'
      })
    }
  },
  methods: {
    updateDocument (nameFunction) {
      if (nameFunction === 'documentDownload') {
        this.clickInputImg()
      } else {
        this.documentDelete()
      }
    },
    clickInputImg () {
      this.$refs.downloadImg.click()
    },
    documentDownload () {
      this.img = this.$refs.downloadImg.files[0]
      if (!this.img) {
        this.document.imageSrc = ''
        this.document.status = 'noDocs'
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(this.img)
        reader.onload = () => {
          this.document.imageSrc = reader.result
        }
        this.document.status = 'downloaded'
      }
      this.check()
    },
    documentDelete () {
      this.document.imageSrc = ''
      this.document.status = 'noDocs'
      this.check()
    },
    showMessage () {
      if (this.isMessage) {
        this.message = !this.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-document {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  box-shadow: inset 0 4px 8px rgba(2, 2, 102, 0.5);
  border-radius: 5px;
  .item-document_document-block {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    .item-document_message {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      .item-document_icon {
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
      }
      .item-document_icon_message {
        width: 39px;
        height: 39px;
        background: url("~@/assets/images/profile/message.svg");
      }
      .item-document_icon_notification {
        position: relative;
      }
      .item-document_icon_general {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 8px;
        right: 9px;
        transition-property: background;
        transition-duration: 0.2s;
        color: #020266;
      }
      .item-document_icon_question {
        background: url("~@/assets/images/profile/question.svg");
      }
      .item-document_icon_has-message {
        background: url("~@/assets/images/profile/has-message.svg");
      }
      .item-document_block-message {
        position: relative;
        background: #020266;
        box-shadow: 0 4px 28px #0f3378, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 12px;
        padding: 15px 20px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 8px;
        transition-duration: 0.5s;
        transition-property: width, height;
        z-index: 100;
        &::before {
          content: "";
          width: 12px;
          height: 12px;
          background: #020266;
          transform: rotate(45deg);
          position: absolute;
          right: 29px;
          top: -4px;
          z-index: 0;
          box-shadow: 0 4px 28px #0f3378, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        &_title {
          font-size: 14px;
          line-height: 17px;
        }
        &_text {
          font-size: 11px;
          line-height: 20px;
        }
        &_visible {
          width: 268px;
          height: 134px;
        }
        &_not-visible {
          width: 0;
          height: 0;
          display: none;
        }
      }
    }
  }
  &_file {
    display: none;
  }
  .received {
    border-top: 1px solid green;
    border-left: 1px solid green;
    border-right: 1px solid green;
  }
  .rejected {
    border-top: 1px solid #ff8e8e;
    border-left: 1px solid #ff8e8e;
    border-right: 1px solid #ff8e8e;
  }
  .check {
    border-top: 1px solid #f2c94c;
    border-left: 1px solid #f2c94c;
    border-right: 1px solid #f2c94c;
  }
  .noDocs {
    border: none;
  }
  .item-document_image {
    border-radius: 4px;
    img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
    &_document {
      object-fit: cover;
      object-position: center;
    }
  }
  &_title {
    line-height: 20px;
    &__position {
      margin-bottom: 15px;
    }
  }
  &_status {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &_status-text {
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-left: 5px;
  }
  &_status-color {
    border-radius: 50%;
    &__received {
      background: green;
    }
    &__rejected {
      background: #ff8e8e;
    }
    &__check {
      background: #f2c94c;
    }
    &_noDocs {
      background: none;
    }
  }
  &_status-color {
    width: 10px;
    height: 10px;
  }
  .item-document_button {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
}

//media styles

@media screen and (max-width: 1023px) {
  .item-document {
    width: 335px;
    height: 217px;
    margin-bottom: 20px;
    &_title {
      font-size: 16px;
    }
    &_document {
    }
    .item-document_image {
      border-radius: 4px;
      width: 65px;
      height: 92px;
    }
    .item-document_button {
      width: 100%;
      height: 43px;
      line-height: 43px;
      font-size: 12px;
    }
    .item-document_image {
      width: 92px;
      height: 65px;
      &__position {
        margin-bottom: 20px;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .item-document {
    width: 450px;
    height: 284px;
    margin-bottom: 30px;
    &_button {
      font-size: 18px;
    }
  }
  .item-document_button {
    width: 100%;
    height: 62px;
    line-height: 62px;
  }
  .item-document_title {
    font-size: 22px;
  }
  .item-document_image {
    border-radius: 4px;
    width: 164.14px;
    height: 115.97px;
    margin-bottom: 13px;
  }
}
</style>
