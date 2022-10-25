<template>
  <div v-show="show" class="modal fade" :class="[
    { 'show d-block': show },
    { 'd-none': !show },
    { 'modal-mini': type === 'mini' },
    { 'modal-dark': $store.darkMode },
  ]" tabindex="-1" role="dialog" :aria-hidden="!show" @mousedown.self="closeHandler(true)">
    <div class="modal-dialog modal-dialog-centered p-0" :class="[
      { 'modal-notice': type === 'notice', [`modal-${size}`]: size },
      modalClasses,
    ]">
      <div class="modal-content" :class="[
        gradient ? `bg-gradient-${gradient}` : '',
        modalContentClasses,
      ]">
        <div v-if="$slots.header" class="modal-header align-items-center" :class="[headerClasses]">
          <slot name="header"></slot>
          <slot name="close-button">
            <button v-if="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click="closeHandler()">
              <span :aria-hidden="!show">×</span>
            </button>
          </slot>
        </div>

        <div class="modal-body" :class="bodyClasses">
          <slot name="body"></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer" :class="footerClasses">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalComp',
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        const acceptedValues = ['', 'notice', 'mini'];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: 'Modal type (notice|mini|"") ',
    },
    modalClasses: {
      type: [Object, String],
      description: 'Modal dialog css classes',
      default: '',
    },
    size: {
      type: String,
      description: 'Modal size',
      validator(value) {
        const acceptedValues = ['', 'sm', 'lg', 'xl'];
        return acceptedValues.indexOf(value) !== -1;
      },
      default: '',
    },
    modalContentClasses: {
      type: [Object, String],
      description: 'Modal dialog content css classes',
      default: '',
    },
    gradient: {
      type: String,
      description: 'Modal gradient type (danger, primary etc)',
      default: '',
    },
    headerClasses: {
      type: [Object, String],
      description: 'Modal Header css classes',
      default: '',
    },
    bodyClasses: {
      type: [Object, String],
      description: 'Modal Body css classes',
      default: '',
    },
    footerClasses: {
      type: [Object, String],
      description: 'Modal Footer css classes',
      default: '',
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: 'Modal transition duration',
    },
    preventClose: {
      type: Boolean,
      default: false,
      description: 'Prevent close modal when clicked outside the box',
    },
  },
  emits: ['update:show', 'close'],
  watch: {
    show(val) {
      const documentClasses = document.body.classList;
      if (val) {
        documentClasses.add('modal-open');
      } else {
        documentClasses.remove('modal-open');
      }
    },
  },
  methods: {
    closeHandler(outside = false) {
      if (this.preventClose && outside) {
        return false;
      }
      this.$emit('update:show', false);
      this.$emit('close');
      return true;
    },
  },
};
</script>
<style lang="scss">
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(.25rem);
}

.modal-dark .modal-content {
  background-color: #1a1a1a !important;

  .modal-body,
  .modal-footer {
    border-top: 1px solid #3a3a3a !important;

  }

  h3,
  strong {
    color: white !important;
  }

  p {
    color: white !important;
  }

  // .close {
  //   color: red;
  // }

  // .close > span:not(.sr-only) {
  //   color: white!important;
  // }

  label {
    color: white !important;
  }
}
</style>