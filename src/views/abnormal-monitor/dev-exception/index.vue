<template>
  <div class="dev-exception-wrapper">
    <div class="dev-exception-wrapper-query">
      <QueryType />
      <QueryDevOptions :tabKey="state.tabKey" />
    </div>
    <div class="dev-exception-wrapper-table">
      <div class="dev-exception-wrapper-table-tabs-content">
        <a-tabs v-model:activeKey="state.tabKey">
          <a-tab-pane key="0">
            <template #tab>
              <span>待处理（7）</span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="1">
            <template #tab>
              <span>处理中（9）</span>
            </template>
          </a-tab-pane>
          <a-tab-pane key="2" tab="已处理" />
        </a-tabs>
      </div>
      <div class="dev-exception-wrapper-table-table-content">
        <a-table
          :row-key="(record) => record.id"
          :dataSource="state.dataSource"
          :columns="columns"
          @change="handleTableChange"
          :loading="state.loading"
          :pagination="pagination"
        >
          <!--          <template #errorDetail="{ record }">-->
          <!--            <a-button type="link" @click="handleAction('errorContent', record.id)">-->
          <!--              详情-->
          <!--            </a-button>-->
          <!--          </template>-->
          <template #action="{ record }">
            <a-button
              type="link"
              @click="handleAction('errorContent', record.id)"
            >
              详情
            </a-button>
            <a-divider type="vertical" />
            <a-button
              type="link"
              @click="handleAction('handleError', record.id)"
            >
              处理
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <ErrorContentModal
      :visible="state.visible === 'errorContent'"
      @handleClose="state.visible = ''"
    />
    <handleErrorModal
      :visible="state.visible === 'handleError'"
      @handleClose="state.visible = ''"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue';
import { QueryType, QueryDevOptions } from '../query';
import createPaginationProps from '@/utils/pagination';
import { devExceptionColumn } from '@/static/column';
import ErrorContentModal from '@/components/modal/error-content-modal.vue';
import handleErrorModal from '@/components/modal/handle-error-modal.vue';

export default defineComponent({
  name: 'devException',
  components: {
    QueryType,
    QueryDevOptions,
    ErrorContentModal,
    handleErrorModal,
  },
  setup() {
    const state = reactive({
      tabKey: '0',
      dataSource: [],
      loading: false,
      page: 1,
      total: 100,
      visible: '',
    });
    const pagination = computed(() =>
      createPaginationProps(state.page, state.total)
    );
    const handleTableChange = ({ current }) => {
      state.page = parseInt(current, 10);
    };
    const getList = () => {
      const obj = {
        gmtPublish: '2022-1-1',
        gmtFailed: '2022-3-3',
        gmtHandle: '2022-5-5',
        id: '1',
        priority: 32,
        sourceType: '西湖区湖底公园1号',
        failedType: '西湖区湖底公园1号',
        sourceName: '房产',
        sourceId: '1231',
        childCatalog: '目录',
        crawlerName: '爬虫名称非军事打击开发商',
        handler: '张雨法撒旦雨',
        errorDetail: '1',
      };
      for (let i = 0; i < 100; i++) {
        state.dataSource = [...state.dataSource, { ...obj, id: i }];
      }
    };
    const columns = computed(() => devExceptionColumn(state.tabKey));
    const handleAction = (sign: string, id: number) => {
      state.visible = sign;
      console.log(id);
    };
    onMounted(() => getList());
    return {
      state,
      pagination,
      handleTableChange,
      handleAction,
      columns,
    };
  },
});
</script>

<style lang="less">
.dev-exception-wrapper {
  width: 100%;
  background-color: #edeff3;
  &-query {
    width: 100%;
    background-color: #fff;
  }
  &-table {
    margin-top: 20px;
    background-color: #fff;
  }
}
</style>
