<template>
  <div>
    <a-modal
      :title="titleText"
      :visible="visible"
      :confirm-loading="confirmLoading"
      layout="horizontal"
      @ok="handleOk"
      @cancel="handCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item label="姓名" name="name">
          <a-input
            v-model:value="formState.name"
            autocomplete="off"
            placeholder="请输入姓名"
          />
        </a-form-item>
        <a-form-item label="账号" name="phone">
          <a-input
            v-model:value="formState.phone"
            autocomplete="off"
            @blur="handleBlur"
            maxLength="11"
            placeholder="请输入手机号"
          />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            v-model:value="formState.password"
            disabled
            placeholder="密码默认为账号后六位"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, toRaw } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: '添加账号',
    },
  },
  setup() {
    const vThis: any = getCurrentInstance();
    const confirmLoading = ref<boolean>(false);
    const formRef = ref();
    const formState = reactive({
      name: '',
      phone: '',
      password: '',
    });
    const rules = {
      name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
      phone: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        { min: 11, message: '账号小于11位', trigger: 'change' },
      ],
      password: [{ required: true, message: '', trigger: 'change' }],
    };
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
    const handCancel = () => {
      const { resetFields } = formRef.value;
      resetFields();
      vThis.emit('handleClose');
    };
    const handleBlur = () => {
      const { phone } = formState;
      if (/^\d{11}$/.test(phone)) formState.password = phone.substring(5);
    };
    return {
      confirmLoading,
      formState,
      rules,
      formRef,
      handleOk,
      handCancel,
      handleBlur,
    };
  },
});
</script>
