<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      @cancel="handCancel"
      @ok="handleOk"
      :destroyOnClose="true"
    >
      <div class="edit-map-modal-wrapper">
        <li
          class="edit-map-modal-wrapper-item"
          v-for="item in viewList"
          :key="item.label"
        >
          <div class="edit-map-modal-wrapper-item-lable">
            {{ item.label }}：
          </div>
          <div class="edit-map-modal-wrapper-item-val">{{ item.val }}</div>
        </li>
        <li class="edit-map-modal-wrapper-item result">
          <div class="edit-map-modal-wrapper-item-lable">映射结果/码值：</div>
          <div class="edit-map-modal-wrapper-item-val">
            <a-select
              v-model:value="state.code"
              placeholder="请选择"
              style="width: 220px"
            >
              <a-select-option
                v-for="item in state.relationList"
                :value="item.code"
                :key="item.code"
              >
                {{ item.result }}
              </a-select-option>
            </a-select>
          </div>
          <div class="edit-map-modal-wrapper-item-btn">
            <a-popover
              v-model:visible="state.popoverVisible"
              trigger="click"
              overlayClassName="edit-map-popover"
            >
              <template #content>
                <div class="edit-map-popover-wrapper">
                  <div class="edit-map-popover-wrapper-item">
                    <div class="edit-map-popover-wrapper-item-label">
                      映射名称：
                    </div>
                    <div class="edit-map-popover-wrapper-item-input">
                      <a-input
                        v-model:value="state.addResult"
                        autocomplete="off"
                        placeholder="请输入码值名称"
                        style="width: 130px"
                      />
                    </div>
                  </div>
                  <div class="edit-map-popover-wrapper-item">
                    <div class="edit-map-popover-wrapper-item-label">
                      映射码值：
                    </div>
                    <div class="edit-map-popover-wrapper-item-input">
                      <a-input
                        v-model:value="state.addCode"
                        autocomplete="off"
                        placeholder="请输入码值名称"
                        style="width: 130px"
                      />
                    </div>
                  </div>
                  <div class="edit-map-popover-wrapper-btn-group">
                    <a-button @click="handlePopoverCancel">取消</a-button>
                    <a-button type="primary" @click="handlePopoverAdd"
                      >新增</a-button
                    >
                  </div>
                </div>
              </template>
              <span>+ 新增映射值</span>
            </a-popover>
          </div>
        </li>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRaw,
} from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '添加映射关系',
    },
    data: {
      type: Object,
      default: () => ({
        tableName: 'asset_auction',
        mapField: 'category',
        fieldName: '3C数码',
        code: '',
      }),
    },
  },
  setup(props) {
    const vThis: any = getCurrentInstance();
    const state = reactive({
      code: undefined,
      addCode: '',
      addResult: '',
      relationList: [
        { result: '水果', code: '1' },
        { result: '蔬菜', code: '2' },
        { result: '禽类', code: '3' },
        { result: '海鲜', code: '4' },
      ],
      popoverVisible: false,
    });
    const { tableName, mapField, fieldName } = props.data || {};
    const handCancel = () => {
      vThis.emit('handleClose');
    };
    const handleOk = () => {
      console.log(toRaw(state));
      handCancel();
    };

    const handlePopoverCancel = () => {
      state.popoverVisible = false;
      state.addCode = '';
      state.addResult = '';
    };
    const handlePopoverAdd = () => {
      const { addCode, addResult, relationList } = state;
      const obj = {
        code: addCode,
        result: addResult,
      };
      state.relationList = [...relationList, obj];
      handlePopoverCancel();
    };

    const viewList = [
      {
        label: '表名',
        val: tableName,
      },
      {
        label: '映射字段名',
        val: mapField,
      },
      {
        label: '新增名称',
        val: fieldName,
      },
    ];
    onMounted(() => {
      // state.code = code;
    });
    return {
      state,
      viewList,
      handleOk,
      handCancel,
      handlePopoverAdd,
      handlePopoverCancel,
    };
  },
});
</script>
<style lang="less">
.edit-map-modal-wrapper {
  &-item {
    display: flex;
  }
}
.edit-map-popover {
  &-wrapper {
    &-item {
      display: flex;
      margin-bottom: 10px;
    }
    &-btn-group {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
