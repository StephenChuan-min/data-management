<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      @cancel="handCancel"
      @ok="handleOk"
    >
      <div class="handle-error-modal-wrapper">
        <div class="handle-error-modal-wrapper-status">
          <div class="handle-error-modal-wrapper-status-label">处理状态：</div>
          <div class="handle-error-modal-wrapper-status-content">
            <a-radio-group
              v-model:value="state.handleStatus"
              button-style="solid"
            >
              <a-radio-button value="1">处理中 </a-radio-button>
              <a-radio-button value="2">已处理</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="handle-error-modal-wrapper-remark">
          <div class="handle-error-modal-wrapper-remark-label">备注：</div>
          <div class="handle-error-modal-wrapper-remark-content">
            <a-textarea
              v-model:value="state.remarks"
              :rows="4"
              autoSize
              style="min-height: 160px; width: 365px"
              placeholder="请输入备注"
              allow-clear
            />
            <div class="handle-error-modal-wrapper-remark-content-btn-group">
              <span
                v-for="(item, index) in REMARKTIPS"
                :key="index"
                class="handle-error-modal-wrapper-remark-content-btn-group-item"
                @click="handleFill(item)"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
        <div class="handle-error-modal-wrapper-record">
          <div class="handle-error-modal-wrapper-record-label">处理记录：</div>
          <div class="handle-error-modal-wrapper-record-content">
            <a-timeline>
              <a-timeline-item
                v-for="(item, index) in state.handleLog"
                :key="`handleLog${index}`"
              >
                <div>
                  <span>处理时间：</span>
                  <span>{{ item.handleTime }}</span>
                </div>
                <div>
                  <span>备注内容：</span>
                  <span>{{ item.remarks }}</span>
                </div>
              </a-timeline-item>
            </a-timeline>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRaw } from 'vue';
import { REMARKTIPS } from '@/static';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '处理',
    },
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const state = reactive({
      handleStatus: '1',
      remarks: '',
      handleLog: [
        {
          handleTime: '2020-10-01',
          handler: '张三',
          remarks: '这是一个备注',
        },
        {
          handleTime: '2020-10-01',
          handler: '张三',
          remarks: '这是一个备注',
        },
        {
          handleTime: '2020-10-01',
          handler: '张三',
          remarks: '这是一个备注',
        },
        {
          handleTime: '2020-10-01',
          handler: '张三',
          remarks: '这是一个备注',
        },
      ],
    });
    const handCancel = () => {
      state.remarks = '';
      state.handleStatus = '1';
      vThis.emit('handleClose');
    };
    const handleFill = (str: string) => {
      const { remarks } = state;
      state.remarks = `${remarks}${remarks ? ` \n` : ''}${str}`;
    };
    const handleOk = () => {
      console.log(toRaw(state));
      handCancel();
    };
    return {
      handCancel,
      state,
      REMARKTIPS,
      handleFill,
      handleOk,
    };
  },
});
</script>
<style lang="less">
.handle-error-modal-wrapper {
  &-status {
    display: flex;
    &-label {
      min-width: 80px;
      text-align: right;
    }
  }
  &-remark {
    display: flex;
    margin-top: 24px;
    &-label {
      min-width: 80px;
      text-align: right;
    }
    &-content {
      &-btn-group {
        margin-top: 12px;
        &-item {
          display: inline-block;
          border-radius: 15px;
          border: 1px solid #ccd2e1;
          line-height: 22px;
          padding: 0 8px;
          margin-right: 8px;
          font-size: 12px;
          margin-bottom: 8px;
        }
      }
    }
  }
  &-record {
    display: flex;
  }
}
</style>
