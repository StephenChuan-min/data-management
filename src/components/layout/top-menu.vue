<template>
  <div class="top-menu-wrapper">
    <div class="top-menu-wrapper-left">
      <img src="../../assets/img/header-logo.png" alt="" />
      <span class="yc-bold">源诚数据管理平台</span>
    </div>
    <div class="top-menu-wrapper-right">
      <a-dropdown
        :trigger="['click']"
        overlayClassName="top-menu-dropdown"
        @click="state.toggle = !state.toggle"
      >
        <a class="ant-dropdown-link" @click.prevent>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size: 24px; margin-right: 12px"
          >
            <use xlink:href="#icon-shuguan-touxiang"></use>
          </svg>
          <span style="margin-right: 2px">hi，管理员</span>
          <template v-if="state.toggle">
            <DownOutlined />
          </template>
          <template v-else>
            <UpOutlined style="font-size: 10px; margin-left: 2px" />
          </template>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" @click="handleAction('editPwd')">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shuguan-xiugaimima"></use>
              </svg>
              修改密码
            </a-menu-item>
            <a-menu-item key="1" @click="handleAction('loginOut')">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shuguan-tuichudenglu1"></use>
              </svg>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <EditPwdModal :visible="state.visible" @handleClose="handleClose" />
</template>

<script lang="ts">
import {
  DownOutlined,
  ExclamationCircleFilled,
  UpOutlined,
} from '@ant-design/icons-vue';
import { Modal } from '_ant-design-vue@2.2.6@ant-design-vue';
import { createVNode } from '_vue@3.2.6@vue';
import { getCurrentInstance, reactive } from 'vue';
import EditPwdModal from '@/components/modal/edit-pwd-modal.vue';

export default {
  name: 'TopMenu',
  components: {
    DownOutlined,
    EditPwdModal,
    UpOutlined,
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const state = reactive({
      visible: false,
      toggle: true,
    });
    const handleAction = (sign: string) => {
      if (sign === 'editPwd') {
        state.visible = true;
      } else {
        Modal.confirm({
          icon: createVNode(ExclamationCircleFilled),
          title: '确认要退出登录吗？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            vThis.proxy.$router.push('/login');
          },
        });
      }
    };

    const handleClose = () => {
      state.visible = false;
    };
    return {
      handleAction,
      state,
      handleClose,
    };
  },
};
</script>

<style lang="less">
.top-menu-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    height: 100%;
    padding-left: 20px;
    background-color: #233b7b;
    width: 220px;
    display: flex;
    align-items: center;
    img {
      width: 21px;
      height: 21px;
    }
    span {
      color: #fff;
      margin-left: 6px;
      line-height: 21px;
    }
  }
  &-right {
    .ant-dropdown-trigger {
      color: #293038;
      &:hover {
        color: #2f7eec;
      }
      display: flex;
      align-items: center;
    }
    .ant-dropdown-open {
      color: #2f7eec;
    }
  }
}
.top-menu-dropdown {
  top: 50px !important;
  left: revert !important;
  right: 0px !important;
  width: 118px;
  .ant-dropdown-menu {
    padding: 0;

    &-item {
      width: 118px;
      text-align: center;
      padding: 0;
      line-height: 40px;
      &:hover {
        background-color: #e7f1ff;
      }
    }
  }
}
</style>
