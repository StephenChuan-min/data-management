<template>
  <div class="dev-exception-wrapper-query">
    <div class="dev-exception-wrapper-query-type">
      <div class="dev-exception-wrapper-query-type-all">
        <span>数据类型：</span>
        <span :class="state.allChecked ? 'active type-label' : 'type-label'">
          全部
        </span>
      </div>
      <div class="dev-exception-wrapper-query-type-main">
        <span
          v-for="(item, index) in state.list.slice(0, 12)"
          :key="item.id"
          :class="item.class"
          @click="handleClick(index)"
        >
          {{ item.typeName }}
        </span>

        <template v-if="!state.toggle">
          <span
            v-for="(item, index) in state.list.slice(12)"
            :key="item.id"
            :class="item.class"
            @click="handleClick(index + 12)"
          >
            {{ item.typeName }}
          </span>
        </template>
      </div>
      <div class="dev-exception-wrapper-query-type-btn">
        <span v-if="state.toggle" key="up" @click="handleToggle">展开 +</span>
        <span v-else key="down" @click="handleToggle">收起 -</span>
      </div>
    </div>
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
    const state = reactive({
      toggle: false,
      list: [
        {
          id: 1,
          typeName: '拍卖信息',
        },
        {
          id: 2,
          typeName: '金融资产拍卖信息',
        },
        {
          id: 3,
          typeName: '产交所金交所',
        },
        {
          id: 4,
          typeName: '资产处置信息',
        },
        {
          id: 5,
          typeName: '土地出让',
        },
        {
          id: 6,
          typeName: '土地抵押',
        },
        {
          id: 7,
          typeName: '土地交易',
        },
        {
          id: 8,
          typeName: '招投标信息',
        },
        {
          id: 9,
          typeName: '裁判文书',
        },
        {
          id: 10,
          typeName: '车辆严重违法信息',
        },
        {
          id: 11,
          typeName: '破产公告',
        },
        {
          id: 12,
          typeName: '不动产登记',
        },
        {
          id: 13,
          typeName: '电子报',
        },
        {
          id: 14,
          typeName: '在建工程',
        },
        {
          id: 15,
          typeName: '排污权证',
        },
        {
          id: 16,
          typeName: '排污权证交易',
        },
        {
          id: 17,
          typeName: '探矿权证、采矿权证',
        },
        {
          id: 18,
          typeName: '探矿权采矿权交易',
        },
        {
          id: 19,
          typeName: '股权风险',
        },
        {
          id: 20,
          typeName: '股权质押',
        },
        {
          id: 21,
          typeName: '商标专利权',
        },
        {
          id: 22,
          typeName: '商标专利权交易',
        },
        {
          id: 23,
          typeName: '建筑建造资质',
        },
        {
          id: 24,
          typeName: '建筑建造资质交易',
        },
        {
          id: 25,
          typeName: '中介房产数据',
        },
        {
          id: 26,
          typeName: '立案信息',
        },
        {
          id: 27,
          typeName: '开庭公告',
        },
        {
          id: 28,
          typeName: '送达公告',
        },
        {
          id: 29,
          typeName: '不动产查封解封',
        },
        {
          id: 30,
          typeName: '重大税收违法',
        },
        {
          id: 31,
          typeName: '消防验收',
        },
        {
          id: 32,
          typeName: '环境处罚',
        },
        {
          id: 33,
          typeName: '上市公司、债券',
        },
      ],
      checkedList: [],
      allChecked: computed(() => !state.checkedList.length),
    });
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
    const handleToggle = () => {
      state.toggle = !state.toggle;
    };
    const handleClick = (index) => {
      const { checkedList } = state;
      if (checkedList.includes(index)) {
        state.list[index].class = '';
        state.checkedList = checkedList.filter((i) => i !== index);
      } else {
        state.list[index].class = 'active';
        state.checkedList = [...checkedList, index];
      }
    };
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
      state,
      handleToggle,
      handleClick,
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
.dev-exception-wrapper-query {
  width: 100%;
  background-color: #fff;
  padding: 20px;

  &-type {
    display: flex;
    border-bottom: 1px solid #dde0e7;
    .type-label() {
      line-height: 28px;
      display: inline-block;
      padding: 0 12px;
      margin: 4px 8px;
    }
    .type-label {
      .type-label();
    }
    &-all {
      min-width: 198px;
    }
    &-main {
      width: 1426px;
      span {
        .type-label();
      }
    }
    &-btn {
      min-width: 66px;
    }
    .active {
      border-radius: 14px;
      background: #e7f1ff;
    }
  }
}
</style>
