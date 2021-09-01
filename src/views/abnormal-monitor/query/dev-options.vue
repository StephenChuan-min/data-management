<template>
  <div class="dev-exception-wrapper-query-options">
    <a-form ref="formRef" :model="formState" layout="inline">
      <a-form-item label="source_id" name="sourceId">
        <a-input
          v-model:value="formState.sourceId"
          autocomplete="off"
          placeholder="请输入表名"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="网站名称" name="sourceName">
        <a-input
          v-model:value="formState.sourceName"
          autocomplete="off"
          placeholder="请输入网站名称"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="优先级" name="priority">
        <a-select
          v-model:value="formState.priority"
          placeholder="please select your zone"
          style="width: 140px"
        >
          <a-select-option value="1">全部</a-select-option>
          <a-select-option value="2">1</a-select-option>
          <a-select-option value="3">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="错误类型" name="failedType">
        <a-select v-model:value="formState.failedType" style="width: 140px">
          <a-select-option value="0">全部</a-select-option>
          <a-select-option value="1">解析错误</a-select-option>
          <a-select-option value="2">抓取错误</a-select-option>
        </a-select>
      </a-form-item>
      <template style="display: flex" v-if="tabKey === '2'">
        <a-form-item label="最新处理时间" name="handleTimeStart">
          <a-date-picker v-model:value="formState.handleTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="handleTimeEnd">
          <a-date-picker v-model:value="formState.handleTimeEnd" />
        </a-form-item>
      </template>
      <template style="display: flex" v-if="tabKey !== '2'">
        <a-form-item label="发布日期" name="publishTimeStart">
          <a-date-picker v-model:value="formState.publishTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="publishTimeEnd">
          <a-date-picker v-model:value="formState.publishTimeEnd" />
        </a-form-item>
      </template>
      <template style="display: flex" v-if="tabKey !== '2'">
        <a-form-item label="报错日期" name="failedTimeStart">
          <a-date-picker v-model:value="formState.failedTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="failedTimeEnd">
          <a-date-picker v-model:value="formState.failedTimeEnd" />
        </a-form-item>
      </template>
      <a-form-item label="处理人" name="handler" v-if="handerDisplay">
        <a-select
          v-model:value="formState.handler"
          placeholder="please select your zone"
          style="width: 140px"
        >
          <a-select-option value="1">全部</a-select-option>
          <a-select-option value="2">张三</a-select-option>
          <a-select-option value="3">李四</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="margin: 0 20px" @click="handleSearch"
          >查询</a-button
        >
        <a-button @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { computed, reactive, toRaw, ref } from 'vue';

export default {
  name: 'AbnormalMontorQuery',
  props: {
    tabKey: {
      type: String,
      default: '0',
    },
  },
  setup(props) {
    const formRef = ref();

    const formState = reactive({
      sourceId: '',
      sourceName: '',
      priority: '1',
      failedType: '0',
      publishTimeStart: '',
      publishTimeEnd: '',
      failedTimeStart: '',
      failedTimeEnd: '',
      handleTimeStart: '',
      handleTimeEnd: '',
      handler: '',
    });

    const handerDisplay = computed(
      () => props.tabKey !== '0' && localStorage.getItem('role') !== '0'
    );
    const handleReset = () => {
      formRef.value.resetFields();
    };
    const handleSearch = () => {
      console.log(toRaw(formState));
    };

    return {
      formState,
      handerDisplay,
      handleSearch,
      handleReset,
      formRef,
    };
  },
};
</script>
<style lang="less">
.dev-exception-wrapper-query-options {
}
</style>
