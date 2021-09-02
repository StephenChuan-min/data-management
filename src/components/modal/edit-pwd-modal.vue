<template>
  <div>
    <a-modal
      :visible="visible"
      title="修改密码"
      @ok="handleOk"
      @cancel="handCancel"
      wrapClassName="edit-pwd-modal"
    >
      <div class="edit-pwd-modal-content">
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
    const handCancel = () => {
      vThis.emit('handleClose');
      formRef.value.resetFields();
    };
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          confirmLoading.value = true;
          setTimeout(() => {
            confirmLoading.value = false;
            handCancel();
          }, 2000);
        })
        .catch();
    };

    return {
      confirmLoading,
      formState,
      rules,
      formRef,
      handleOk,
      handCancel,
    };
  },
});
</script>
<style lang="less">
.edit-pwd-modal {
  .ant-modal-content {
    .ant-modal {
      &-body {
        .edit-pwd-modal-content {
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
    }
  }
}
</style>
