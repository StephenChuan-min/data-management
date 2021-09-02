<template>
  <main class="yc-login-wrapper">
    <header>
      <h1>
        <img src="../../assets/img/logo.png" alt="" />
      </h1>
    </header>
    <section class="main">
      <div class="main-form">
        <div class="main-form-title yc-bold">用户登录</div>
        <div class="main-form-container">
          <a-form ref="formRef" :model="formState" :rules="rules">
            <a-form-item name="name">
              <a-input
                v-model:value="formState.phone"
                placeholder="请输入11位账号"
                autocomplete="off"
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input
                v-model:value="formState.password"
                placeholder="请输入密码"
                autocomplete="off"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="picCode" class="pic-code">
              <a-input
                v-model:value="formState.picCode"
                placeholder="请输入验证码"
                autocomplete="off"
                style="width: 224px"
              >
                <template #prefix>
                  <KeyOutlined />
                </template>
              </a-input>
              <div class="pic-code-box">R A T O</div>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block>登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </section>
    <footer>
      <div class="footer-copyright">
        Copyright © 2018 杭州源诚科技有限公司 浙ICP备17030014号
      </div>
    </footer>
  </main>
</template>

<script lang="ts">
import { reactive, UnwrapRef } from 'vue';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons-vue';
import { LoginFormIF } from '@/static/interface';

export default {
  name: 'index',
  nameComment: '登录页',
  components: {
    UserOutlined,
    LockOutlined,
    KeyOutlined,
  },
  setup() {
    const formState: UnwrapRef<LoginFormIF> = reactive({
      phone: '',
      password: '',
      picCode: '',
    });
    const rules: { name: any[] } = {
      name: [],
    };
    return {
      formState,
      rules,
    };
  },
};
</script>

<style lang="less">
.yc-login-wrapper {
  height: 100vh;
  width: 100%;
  background: url('../../assets/img/bg.jpg') center no-repeat;
  background-size: cover;
  min-width: 1600px;
  min-height: 937px;
  overflow: auto;
  padding-top: 60px;
  position: relative;
  //TODO
  header {
    h1 {
      text-align: center;
    }
  }
  .main {
    display: flex;
    justify-content: flex-end;
    &-form {
      background: url('../../assets/img/formbg.png') center no-repeat;
      height: 530px;
      width: 560px;
      margin: 152px 13.5% 0 0;
      padding: 93px 88px 0 92px;
      &-title {
        text-align: center;
        font-size: 30px;
        color: #fff;
        line-height: 30px;
        margin-bottom: 32px;
      }
      &-container {
        .rgb {
          height: 44px;
          background: rgba(7, 153, 216, 0.3);
          border: 1px solid rgba(7, 153, 216, 0.6);
        }
        .pic-code {
          .ant-form-item-control-input-content {
            display: flex;
            align-items: center;
          }
          &-box {
            width: 144px;
            text-align: center;
            line-height: 44px;
            margin-left: 12px;
            color: #fff;
            font-size: 30px;
            .rgb();
          }
        }
        .ant-input-affix-wrapper {
          .rgb();
          .ant-input-prefix {
            padding-right: 6px;
          }
        }
        .ant-input {
          background: transparent;
          color: #fff;
        }
        .ant-btn {
          height: 44px;
          margin-top: 16px;
        }
        .anticon {
          color: #4daff2;
        }
      }
    }
  }
  footer {
    position: absolute;
    width: 100%;
    bottom: 80px;
    .footer-copyright {
      text-align: center;
      color: #fff;
    }
  }
}
</style>
