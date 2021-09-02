import { RuleObject } from '_ant-design-vue@2.2.6@ant-design-vue/es/form/interface';

const EditPwdRules = (formRef, formState) => {
  const validateOld = async (rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject('请输入原密码');
    }
    if (formState.newPassword !== '') {
      formRef.value.validateFields('newPassword');
    }
    return Promise.resolve();
  };
  const validateNew = async (rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject('请输入新密码');
    }
    if (value.length < 6) {
      return Promise.reject('密码小于6位');
    }
    if (value === formState.oldPassword) {
      return Promise.reject('新密码不能与原密码一致');
    }
    if (formState.confirmPassword !== '') {
      formRef.value.validateFields('confirmPassword');
    }
    return Promise.resolve();
  };

  const validateConfirm = async (rule: RuleObject, value: string) => {
    if (value !== formState.newPassword && formState.newPassword) {
      return Promise.reject('密码不一致');
    }
    return Promise.resolve();
  };
  return {
    oldPassword: [{ validator: validateOld, trigger: 'blur' }],
    newPassword: [{ validator: validateNew, trigger: 'blur' }],
    confirmPassword: [{ validator: validateConfirm, trigger: 'blur' }],
  };
};

export default EditPwdRules;
