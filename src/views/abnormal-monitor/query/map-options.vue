<template>
  <div class="new-mapping-wrapper-query-options">
    <a-form ref="formRef" :model="formState" layout="inline">
      <a-form-item label="表名" name="tableName">
        <a-input
          v-model:value="formState.tableName"
          autocomplete="off"
          placeholder="请输入表名"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="表字段名" name="fieldName">
        <a-input
          v-model:value="formState.fieldName"
          autocomplete="off"
          placeholder="请输入表字段名"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="映射结果" name="result" v-if="!dynamicDisplay.flagA">
        <a-input
          v-model:value="formState.result"
          autocomplete="off"
          placeholder="请输入映射结果名称"
          style="width: 200px"
        />
      </a-form-item>

      <template style="display: flex" v-if="dynamicDisplay.flagA">
        <a-form-item label="更新日期" name="updateTimeStart">
          <a-date-picker v-model:value="formState.updateTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="updateTimeEnd">
          <a-date-picker v-model:value="formState.updateTimeEnd" />
        </a-form-item>
      </template>
      <template style="display: flex" v-if="dynamicDisplay.flagA">
        <a-form-item label="首次发布日期" name="createTimeStart">
          <a-date-picker v-model:value="formState.createTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="createTimeEnd">
          <a-date-picker v-model:value="formState.createTimeEnd" />
        </a-form-item>
      </template>
      <template style="display: flex" v-if="dynamicDisplay.flagB">
        <a-form-item label="处理时间" name="handleTimeStart">
          <a-date-picker v-model:value="formState.handleTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="handleTimeEnd">
          <a-date-picker v-model:value="formState.handleTimeEnd" />
        </a-form-item>
      </template>
      <template style="display: flex" v-if="dynamicDisplay.flagC">
        <a-form-item label="退回时间" name="backTimeStart">
          <a-date-picker v-model:value="formState.backTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="backTimeEnd">
          <a-date-picker v-model:value="formState.backTimeEnd" />
        </a-form-item>
      </template>
      <template style="display: flex" v-if="dynamicDisplay.flagD">
        <a-form-item label="上传时间" name="publishTimeStart">
          <a-date-picker v-model:value="formState.publishTimeStart" />
          <span style="margin-left: 20px">至</span>
        </a-form-item>
        <a-form-item name="publishTimeEnd">
          <a-date-picker v-model:value="formState.publishTimeEnd" />
        </a-form-item>
      </template>
      <a-form-item label="映射码值" name="code" v-if="!dynamicDisplay.flagA">
        <a-input
          v-model:value="formState.code"
          autocomplete="off"
          placeholder="请输入码值名称"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="处理人" name="handlerId" v-if="dynamicDisplay.flagE">
        <a-select
          v-model:value="formState.handlerId"
          placeholder="please select your zone"
          style="width: 140px"
        >
          <a-select-option value="1">全部</a-select-option>
          <a-select-option value="2">1</a-select-option>
          <a-select-option value="3">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="测试人员" name="testId" v-if="dynamicDisplay.flagF">
        <a-select
          v-model:value="formState.testId"
          placeholder="please select your zone"
          style="width: 140px"
        >
          <a-select-option value="1">全部</a-select-option>
          <a-select-option value="2">1</a-select-option>
          <a-select-option value="3">2</a-select-option>
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
import { newMapDisplay } from '@/utils';

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
    const dynamicDisplay = computed(() => newMapDisplay(props.tabKey));
    return {
      formState,
      handerDisplay,
      handleSearch,
      handleReset,
      formRef,
      dynamicDisplay,
    };
  },
};
</script>
<style lang="less">
.new-mapping-wrapper-query-options {
}
</style>
