<template>
  <a-menu
    style="width: 220px"
    mode="inline"
    :openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @openChange="onOpenChange"
    theme="dark"
  >
    <template v-for="item in leftMenu" :key="item.key">
      <a-sub-menu>
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>{{ item.text }}</template>
        <a-menu-item
          v-for="childItem in item.child"
          :key="childItem.key"
          @click="handleClick(childItem.path)"
        >
          {{ childItem.text }}
        </a-menu-item>
      </a-sub-menu>
    </template>
    <!--    <a-sub-menu key="sub2">-->
    <!--      <template #icon>-->
    <!--        <AppstoreOutlined />-->
    <!--      </template>-->
    <!--      <template #title>数据概览</template>-->
    <!--      <a-menu-item key="3">数据增量监控</a-menu-item>-->
    <!--    </a-sub-menu>-->
    <!--    <a-sub-menu key="sub4">-->
    <!--      <template #icon>-->
    <!--        <SettingOutlined />-->
    <!--      </template>-->
    <!--      <template #title>司法拍卖数据监控</template>-->
    <!--      <a-menu-item key="6">其他指标监控</a-menu-item>-->
    <!--      <a-menu-item key="7">抓取情况监控</a-menu-item>-->
    <!--    </a-sub-menu>-->
  </a-menu>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue';
import { AppstoreOutlined } from '@ant-design/icons-vue';
import { leftMenu } from '@/utils/rules';

interface StateProp {
  rootSubmenuKeys: string[];
  openKeys: string[];
  selectedKeys: string[];
}
export default {
  setup() {
    const vThis: any = getCurrentInstance();
    const { proxy } = vThis;
    const state: StateProp = reactive({
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
      openKeys: [],
      selectedKeys: ['index'],
    });

    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey: any = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    const handleClick = (path: string) => {
      proxy.$router.push(path);
    };

    onMounted(() => {
      const path = (window.location.hash || '').replace('#/', '');
      state.selectedKeys = [path];
      const { key } =
        leftMenu.find((i) => i.child?.find((j) => j.key === path)) || {};
      state.openKeys = [key || ''];
    });
    return {
      ...toRefs(state),
      onOpenChange,
      handleClick,
      leftMenu,
    };
  },
  components: {
    AppstoreOutlined,
  },
};
</script>
<style lang="less"></style>
