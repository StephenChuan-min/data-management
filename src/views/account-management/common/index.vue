<template>
  <div class="dev-account-wrapper">
    <header>
      <span>
        <svg class="icon" aria-hidden="true" v-if="mark === 'dev'">
          <use xlink:href="#icon-shuguan-kaifazhanghao"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else>
          <use xlink:href="#icon-shuguan-ceshizhanghao"></use>
        </svg>
      </span>
      <span> {{ title }}</span>
      <a-button @click="() => (state.visible = true)" type="primary">
        <template #icon><PlusOutlined /></template>添加账号
      </a-button>
    </header>
    <main>
      <div class="table-content">
        <a-table
          :row-key="(record) => record.id"
          :dataSource="state.dataSource"
          :columns="columns"
          @change="handleTableChange"
          :loading="state.loading"
          :pagination="pagination"
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
    <AddAccountModal :visible="state.visible" @handleClose="handleClose" />
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, createVNode, computed } from 'vue';
import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { accountColumn } from '@/static/column';
import AddAccountModal from '@/components/modal/add-account-modal.vue';
import createPaginationProps from '@/utils/pagination';

export default {
  name: 'accountManagementTable',
  components: {
    PlusOutlined,
    AddAccountModal,
  },
  props: {
    mark: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      loading: false,
      visible: false,
      total: 100,
      page: 1,
      dataSource: [],
    });

    const pagination = computed(() =>
      createPaginationProps(state.page, state.total)
    );
    const { mark } = props || {};
    const handleTableChange = ({ current }) => {
      state.page = parseInt(current, 10);
    };

    const handleClose = () => {
      state.visible = false;
    };
    const handleAction = (sign: string, id: string) => {
      const obj =
        sign === 'del'
          ? {
              title: '确认删除账号吗？',
              text: '点击确定，该账号将无法在本平台登录？',
            }
          : {
              title: '确认重置密码吗？',
              text: '点击确定，密码将被重置为账号的后六位数字？',
            };
      Modal.confirm({
        icon: createVNode(ExclamationCircleFilled),
        title: obj.title,
        content: obj.text,
        okText: '确认',
        cancelText: '取消',
        onOk() {
          console.log(id);
        },
      });
    };
    const getList = () => {
      const obj = {
        delDate: '2022-1-1',
        id: '1',
        phone: 32,
        name: '西湖区湖底公园1号',
        abnormalNum: '西湖区湖底公园1号',
        editField: '1',
      };
      for (let i = 0; i < 100; i++) {
        state.dataSource = [...state.dataSource, { ...obj, id: i }];
      }
    };
    const columns = accountColumn(mark);
    const title = `${mark === 'dev' ? '开发' : '测试'}账号`;
    onMounted(() => getList());
    return {
      state,
      columns,
      title,
      pagination,
      handleTableChange,
      handleAction,
      handleClose,
    };
  },
};
</script>

<style lang="less">
.dev-account-wrapper {
  height: 100%;

  header {
    height: 66px;
    font-weight: bold;
    color: #293038;
    line-height: 66px;
    position: relative;
    padding-left: 20px;
    .ant-btn {
      position: absolute;
      right: 20px;
      top: 18px;
      height: 30px;
    }
    .icon {
      font-size: 18px;
      margin-right: 9px;
      position: relative;
      top: 1px;
    }
  }

  .table-content {
    padding: 0 20px 0;
  }
}
</style>
