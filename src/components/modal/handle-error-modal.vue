<template>
  <div>
    <a-modal
      title="报错内容"
      :visible="visible"
      @cancel="handCancel"
      :footer="null"
    >
      <div class="error-content-modal-wrapper">
        <div class="error-content-modal-wrapper-nav">
          <li class="error-content-modal-wrapper-nav-item">
            <span class="error-content-modal-wrapper-nav-item-label">
              source_id：
            </span>
            <span class="error-content-modal-wrapper-nav-item-val">10768</span>
          </li>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const handCancel = () => {
      vThis.emit('handleClose');
    };

    return {
      handCancel,
    };
  },
});
</script>
