<template>
    <div v-if="showModal" class="modal-container">
        <span class="modal-background" @click="cancel"/>
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" :class="size">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <slot name="modal-title"></slot>
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" @click="cancel">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <slot name="modal-body"></slot>
                            </div>
                            <template v-if=footerShow>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="cancel">
                                        {{ cancelButtonText }}
                                    </button>
                                    <button v-if="saveButtonShow" type="button" class="btn" :class="saveButtonClass"
                                            @click="save">
                                        {{ saveButtonText }}
                                    </button>
                                </div>
                            </template>

                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Modal",
    props: {
        saveButtonShow: {
            type: Boolean,
            default: true
        },
        footerShow: {
            type: Boolean,
            default: true
        },
        saveButtonText: {
            type: String,
            default: "Ok"
        },
        saveButtonClass: {
            type: String,
            default: "btn-success"
        },
        size: {
            type: String,
            default: ""
        },
        cancelButtonText: {
            type: String,
            default: "Abbrechen"
        }
    },
    emits: ["modalSave", "modalCancel"],
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        displayModal() {
            this.showModal = true;
        },
        save() {
            this.$emit("modalSave");
            this.showModal = false;
        },
        cancel() {
            this.$emit("modalCancel");
            this.showModal = false;
        }
    }
});
</script>

<style scoped lang="less">

.modal-container {
  overscroll-behavior: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  z-index: 9000;
  background: var(--modal-background-color);

  .modal-background {
    position: fixed;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    z-index: 9001;
  }

  .modal-mask {
    position: fixed;
    max-height: 50vh;
    left: 50%;
    top: 50%;

    z-index: 9002;

    transform: translate(-50%, -50%);

    .large {
      min-width: 800px;
      max-height: 600px;
      left: -30%;

    }

    .modal-body {
      min-width: 500px;
      overflow-y: auto;
    }
  }
}
</style>