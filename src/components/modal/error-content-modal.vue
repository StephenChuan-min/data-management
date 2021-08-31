<template>
  <div>
    <a-modal
      title="报错内容"
      :visible="visible"
      @cancel="handCancel"
      :footer="null"
      :destroyOnClose="true"
    >
      <div class="error-content-modal-wrapper">
        <ul class="error-content-modal-wrapper-main">
          <li
            v-for="item in list"
            :class="`error-content-modal-wrapper-main-item ${item.key}`"
            :key="item.key"
          >
            <div class="error-content-modal-wrapper-main-item-label">
              {{ item.label }}：
            </div>
            <div class="error-content-modal-wrapper-main-item-val">
              {{ item.val }}
            </div>
          </li>
        </ul>
        <ul class="error-content-modal-wrapper-failed-history">
          <li class="error-content-modal-wrapper-failed-history-item">
            <div class="error-content-modal-wrapper-failed-history-item-label">
              报错历史：
            </div>
            <div class="error-content-modal-wrapper-failed-history-item-val">
              <a-timeline>
                <a-timeline-item
                  v-for="(item, index) in vFailedHistoryList"
                  :key="`history${index}`"
                >
                  <span>报错日期</span>
                  <span>{{ item }}</span>
                  <span
                    v-if="
                      vFailedHistoryList.length > 2 &&
                      index === vFailedHistoryList.length - 1
                    "
                  >
                    <a-button
                      type="text"
                      @click="handleToggle"
                      v-if="state.toggle"
                    >
                      展开+
                    </a-button>
                    <a-button type="text" @click="handleToggle" v-else>
                      收起 -
                    </a-button>
                  </span>
                </a-timeline-item>
              </a-timeline>
            </div>
          </li>
        </ul>
        <ul class="error-content-modal-wrapper-record">
          <li class="error-content-modal-wrapper-record-item">
            <div class="error-content-modal-wrapper-record-item-label">
              处理记录：
            </div>
            <div class="error-content-modal-wrapper-record-item-val">
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
                    <span>开发</span>
                    <span>{{ item.handler }}</span>
                    <span>备注内容：</span>
                    <span>{{ item.remarks }}</span>
                  </div>
                </a-timeline-item>
              </a-timeline>
            </div>
          </li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const state = reactive({
      toggle: false,
      failedHistoryList: [
        '2021-07-01',
        '2021-07-01',
        '2021-07-01',
        '2021-07-02',
        '2021-07-01',
        '2021-07-01',
        '2021-07-01',
      ],
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
      state.toggle = true;
      vThis.emit('handleClose');
    };
    const list = [
      {
        label: 'source_id',
        val: '10768',
        key: 'sourceId',
      },
      {
        label: '网站名称',
        val: '10768',
        key: 'sourceName',
      },
      {
        label: '子目录',
        val: '10768',
        key: 'childCatalog',
      },
      {
        label: '爬虫名称',
        val: '10768',
        key: 'crawlerName',
      },
      {
        label: '报错内容',
        val: '10768',
        key: 'failedContent',
      },
    ];

    const vFailedHistoryList = computed(() => {
      const { failedHistoryList, toggle } = state;
      const sliceNumber = toggle ? 3 : failedHistoryList.length;
      return failedHistoryList.slice(0, sliceNumber);
    });

    const handleToggle = () => {
      state.toggle = !state.toggle;
    };
    return {
      handCancel,
      handleToggle,
      list,
      state,
      vFailedHistoryList,
    };
  },
});
</script>
<style lang="less">
.error-content-modal-wrapper {
  &-main {
    display: flex;
    flex-wrap: wrap;
    &-item {
      display: flex;
    }
    .crawlerName {
      width: 100%;
    }
  }
  &-failed-history {
    display: flex;
    &-item {
      display: flex;
    }
  }
  &-record {
    display: flex;
    &-item {
      display: flex;
    }
  }
}
</style>
