<template>
  <div>
    <a-modal
      title="历史映射"
      :visible="visible"
      @cancel="handCancel"
      wrapClassName="history-map-modal"
    >
      <div class="history-map-modal-content">
        <div class="history-map-modal-content-header">
          <span class="label">表名：</span>
          <span class="val">asset_auction</span>
          <span class="label">字段名：</span>
          <span class="val">round</span>
        </div>
        <div class="history-map-modal-content-table">
          <a-table
            :row-key="(record) => record.id"
            :dataSource="dataSource"
            :columns="columns"
            :loading="loading"
            :pagination="false"
          >
            <template #primitive="{ record }">
              {{ record.primitive }}
            </template>
            <template #result="{ record }"> {{ record.result }}</template>
            <template #code="{ record }"> {{ record.code }}</template>
          </a-table>
        </div>
      </div>
      <template #footer>
        <a-button type="primary" @click="handCancel"> 关闭 </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { historyMapColumn } from '@/static/column';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    dataSource: {
      type: Array,
      default: () => [
        {
          primitive: '42342',
          result: '42',
          code: '42342',
          id: 1,
        },
        {
          primitive: '432',
          result: '1',
          code: '2',
          id: 2,
        },
        {
          primitive: '3',
          result: '4',
          code: '5',
          id: 3,
        },
      ],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const handCancel = () => {
      vThis.emit('handleClose');
    };
    const columns = historyMapColumn;
    return {
      handCancel,
      columns,
    };
  },
});
</script>
<style lang="less">
.history-map-modal {
}
</style>
