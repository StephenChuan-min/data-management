<template>
  <div class="query-type-wrapper">
    <div class="query-type-wrapper-all">
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuguan-shujuleixing"></use>
        </svg>
      </span>
      <span>数据类型：</span>
      <span
        :class="state.allChecked ? 'active type-label' : 'type-label'"
        @click="allClick"
      >
        全部
      </span>
    </div>
    <div class="query-type-wrapper-main">
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
    <div class="query-type-wrapper-btn">
      <span v-if="state.toggle" key="up" @click="handleToggle">
        展开
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuguan-jiantou_xia"></use>
        </svg>
      </span>
      <span v-else key="down" @click="handleToggle">
        收起
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuguan-jiantou_shang"></use>
        </svg>
      </span>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue';

export default {
  name: 'AbnormalMontorQuery',
  props: {
    tabKey: {
      type: String,
      default: '0',
    },
  },
  setup() {
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

    const allClick = () => {
      if (!state.allChecked) {
        const { list } = state;
        state.list = list.map((i) => ({ ...i, class: '' }));
        state.checkedList = [];
      }
    };
    return {
      state,
      handleToggle,
      handleClick,
      allClick,
    };
  },
};
</script>
<style lang="less">
.query-type-wrapper {
  display: flex;
  border-bottom: 1px solid #dde0e7;
  padding: 20px 20px 10px;
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
    min-width: 178px;
    position: relative;
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    &:after {
      content: '';
      width: 1px;
      height: 16px;
      background-color: #dde0e7;
      position: absolute;
      right: 0;
      top: 10px;
    }
  }
  &-main {
    width: 1426px;
    span {
      .type-label();
    }
  }
  &-btn {
    min-width: 66px;
    padding-top: 6px;
  }
  .active {
    border-radius: 14px;
    background: #e7f1ff;
  }
}
</style>
