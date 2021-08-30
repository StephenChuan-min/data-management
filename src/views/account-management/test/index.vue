<template>
  <div class="dev-account-wrapper">
    <header>
      测试账号
      <a-button>
        <template #icon><PlusOutlined /></template>添加账号
      </a-button>
    </header>
    <main>
      <div class="table-content">
        <a-table
          :row-key="(record) => record.id"
          :dataSource="data.dataSource"
          :columns="columns"
          @change="handleTableChange"
          :loading="loading"
        >
          <template #action="{ record }">
            <a-button type="link" @click="handleAction('reset', record.id)">
              重置密码
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleAction('del', record.id)">
              删除
            </a-button>
          </template>
        </a-table>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { ref, reactive, UnwrapRef, onMounted } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { TableState } from 'ant-design-vue/es/table/interface';
import { accountColumn } from '@/static/column';

type Pagination = TableState['pagination'];
interface FormState {
  account: string;
  name: string;
}
export default {
  name: 'DevAccount',
  components: {
    PlusOutlined,
  },
  setup() {
    const formRef = ref();
    const loading = ref(false);
    const formState: UnwrapRef<FormState> = reactive({
      account: '',
      name: '',
    });
    const handleSearch = () => {
      console.log(formState);
    };
    const handleReset = () => {
      console.log(formRef);
      formRef.value.resetFields();
    };
    const handleTableChange = (pag: Pagination, filter: any, sorter: any) => {
      console.log(pag, sorter);
    };
    const data = reactive({
      dataSource: [],
    });
    const handleAction = (sign, params) => {
      console.log(sign, params);
    };
    const getList = () => {
      const obj = {
        delDate: '2022-1-1',
        id: '1',
        account: 32,
        name: '西湖区湖底公园1号',
        wrong: '西湖区湖底公园1号',
        mapNum: '1',
      };
      for (let i = 0; i < 100; i++) {
        data.dataSource = [...data.dataSource, { ...obj, id: i }];
      }
    };
    const columns = accountColumn('test');

    onMounted(() => getList());
    return {
      activeKey: ref('1'),
      formRef,
      formState,
      handleSearch,
      handleReset,
      handleTableChange,
      data,
      columns,
      loading,
      handleAction,
    };
  },
};
</script>

<style lang="less">
.dev-account-wrapper {
  header {
    height: 64px;
    border-bottom: 1px solid #edeff3;
    font-weight: bold;
    color: #293038;
    line-height: 64px;
    position: relative;
    padding-left: 20px;
    .ant-btn {
      position: absolute;
      right: 20px;
      top: 18px;
      height: 30px;
    }
  }

  .table-content {
    padding: 24px 20px 0;
  }
}
</style>
