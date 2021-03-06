<template>
  <div class="new-mapping-wrapper">
    <div class="new-mapping-wrapper-query">
      <QueryType />
      <QueryMapOptions :tabKey="state.tabKey" />
    </div>
    <div class="new-mapping-wrapper-table">
      <div class="new-mapping-wrapper-table-tabs-content">
        <a-tabs v-model:activeKey="state.tabKey">
          <a-tab-pane v-for="item in tabPanes" :key="item.status.toString()">
            <template #tab>
              <span>{{ item.title }}{{ item.key }}</span>
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="new-mapping-wrapper-table-table-content">
        <a-table
          :row-key="(record) => record.id"
          :dataSource="state.dataSource"
          :columns="columns"
          @change="handleTableChange"
          :loading="state.loading"
          :pagination="pagination"
        >
          <template #action="{ record }">
            <a-button type="link" @click="handleAction('editMap', record.id)">
              添加映射关系
            </a-button>
            <a-divider type="vertical" />
            <a-button
              type="link"
              @click="handleAction('historyMap', record.id)"
            >
              查看历史映射
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <HistoryMapModal
      :visible="state.visible === 'historyMap'"
      @handleClose="state.visible = ''"
    />
    <EditMapModal
      :visible="state.visible === 'editMap'"
      @handleClose="state.visible = ''"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue';

import createPaginationProps from '@/utils/pagination';
import { newMappingColumn } from '@/static/column';
import HistoryMapModal from '@/components/modal/history-map-modal.vue';
import { QueryMapOptions, QueryType } from '@/views/abnormal-monitor/query';
import EditMapModal from '@/components/modal/edit-map-modal.vue';

export default defineComponent({
  name: 'devException',
  components: {
    EditMapModal,
    QueryType,
    QueryMapOptions,
    HistoryMapModal,
  },
  setup() {
    const state = reactive({
      tabKey: '1',
      dataSource: [],
      loading: false,
      page: 1,
      total: 100,
      visible: '',
      ANum: 12,
      BNum: 12,
      CNum: 12,
      DNum: 12,
    });
    const { ANum, BNum, CNum, DNum } = state;
    const data = [
      { title: '待处理', total: ANum, rule: 'admin', status: 1 },
      { title: '待测试', total: BNum, rule: 'admin', status: 2 },
      { title: '已退回', total: CNum, rule: 'admin', status: 3 },
      { title: '已修改', total: DNum, rule: 'admin', status: 4 },
      { title: '已上传', total: 'no', rule: 'admin', status: 5 },

      { title: '待测试', total: true, rule: 'test', status: 2 },
      { title: '已退回', total: true, rule: 'test', status: 3 },
      { title: '已修改', total: true, rule: 'test', status: 4 },
      { title: '已上传', total: true, rule: 'test', status: 5 },

      { title: '待处理', total: true, rule: 'normal', status: 1 },
      { title: '已处理', total: 'no', rule: 'normal', status: 2 },
      { title: '待修改', total: true, rule: 'normal', status: 3 },
    ];
    const role = 'test';
    const tabPanes = data.filter((i) => i.rule === role);
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
    const columns = computed(() => newMappingColumn(state.tabKey));
    const handleAction = (sign: string, id: number) => {
      state.visible = sign;
      console.log(id);
    };
    onMounted(() => {
      if (localStorage.getItem('role') === 'check') {
        state.tabKey = '2';
      }
      getList();
    });
    return {
      state,
      pagination,
      handleTableChange,
      handleAction,
      columns,
      tabPanes,
    };
  },
});
</script>

<style lang="less">
.new-mapping-wrapper {
  width: 100%;
  background-color: #edeff3;
  &-query {
    width: 100%;
    background-color: #fff;
  }
  &-table {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
