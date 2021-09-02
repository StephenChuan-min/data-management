<template>
  <div>
    <a-modal
      :visible="visible"
      :closable="false"
      @ok="handleOk"
      @cancel="handCancel"
      wrapClassName="init-pwd-modal"
    >
      <div class="init-pwd-modal-content">
        <div class="header">为了您的账号安全，请修改初始密码</div>
        <a-form ref="formRef" :model="formState" :rules="rules">
          <a-form-item label="原密码" name="oldPassword">
            <a-input
              v-model:value="formState.oldPassword"
              autocomplete="off"
              placeholder="请输入原密码"
            />
          </a-form-item>
          <a-form-item label="新密码" name="newPassword">
            <a-input
              v-model:value="formState.newPassword"
              autocomplete="off"
              maxLength="11"
              placeholder="请输入新密码"
            />
          </a-form-item>
          <a-form-item label="确认新密码" name="confirmPassword">
            <a-input
              v-model:value="formState.confirmPassword"
              placeholder="请再次输入新密码"
              autocomplete="off"
            />
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <a-button
          key="submit"
          type="primary"
          :loading="confirmLoading"
          @click="handleOk"
          >确定修改</a-button
        >
        <a-button key="back" @click="handleLoginOut">退出登录</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue';
import EditPwdRules from '@/utils/formRule';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const confirmLoading = ref<boolean>(false);
    const formRef = ref();
    const formState = reactive({
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
    });
    const rules = EditPwdRules(formRef, formState);
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          confirmLoading.value = true;
          setTimeout(() => {
            confirmLoading.value = false;
            vThis.emit('handleClose');
          }, 2000);
        })
        .catch();
    };
    const handleLoginOut = () => {
      vThis.proxy.$router.push('/login');
    };

    return {
      confirmLoading,
      formState,
      rules,
      formRef,
      handleOk,
      handleLoginOut,
    };
  },
});
</script>
<style lang="less">
.init-pwd-modal {
  .ant-modal-content {
    .ant-modal {
      &-body {
        .init-pwd-modal-content {
          .header {
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 20px;
          }
          .ant-form {
            .ant-form-item-label {
              min-width: 90px;
            }
            .ant-input {
              width: 300px;
            }
          }
        }
      }
      &-footer {
        border-top: none;
        text-align: center;
      }
    }
  }
}
</style>
