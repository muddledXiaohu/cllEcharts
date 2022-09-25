
<template>
    <div>
      <div class="loginCard">
        <h2>登录</h2>
        <a-form class="signIn" :form="form" @submit="handleSubmit">
          <a-form-item
            :validate-status="userNameError() ? 'error' : ''"
            :help="userNameError() || ''"
            :wrapper-col="{ span: 24 }"
          >
            <a-input
              v-decorator="['username', ValidateRules.username]"
              placeholder="用户名"
            />
          </a-form-item>
          <a-form-item
            :validate-status="passwordError() ? 'error' : ''"
            :help="passwordError() || ''"
            :wrapper-col="{ span: 24 }"
          >
            <a-input
              v-decorator="['password', ValidateRules.password]"
              type="password"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 24 }">
            <a-button
              class="loginBtn"
              type="primary"
              html-type="submit"
              :disabled="hasErrors(form.getFieldsError())"
              >登录
              </a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- <a-button @click="qweqwe">123</a-button> -->
    </div>
  </template>
  <script>
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  }
  import { mapActions } from 'vuex'
  // import { usercenter } from '@/api/login'
  export default {
    data() {
      return {
        hasErrors,
        // form: this.$form.createForm(this),
        form: this.$form.createForm(this, { name: "loginForm" }),
        ValidateRules: {
          username: {
            rules: [{ required: true, message: "请输入您的账号！" }],
          },
          password: {
            rules: [{ required: true, message: "请输入您的密码！" }],
          },
        },
        // base64
        userInfo: {},
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        // To disabled submit button at the beginning.
        this.form.validateFields();
      });
    },
    methods: {
      ...mapActions(['Login', 'Usercenter']),
      // Only show error after a field is touched.
      userNameError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched("userName") && getFieldError("userName");
      },
      // Only show error after a field is touched.
      passwordError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched("password") && getFieldError("password");
      },
      handleSubmit(e) {
        // const aa = document.getElementById("username");
        // console.log(aa.value);
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
              let array = { ...values }
            console.log(array);
            // array.password = this.$md5(array.username+array.captcha+this.$md5(array.password)+'233');
            this.login(array)
          }
        });
        // console.log(this.form.getFieldsValue());
      },
      async qweqwe () {
        console.log(123123);
        this.$router.push({ path: '/' });
      },
      // 登录
      login(array) {
        const { Login } = this
        Login(array)
          .then((res) => {
            console.log(res);
            if (res.status ===400)  return this.$message.error(res.msg)
            this.qweqwe()
          })
          .catch(err => console.log(err))
          .finally(() => {
            console.log('zale');
          })
      }
    },
  };
  </script>
  <style lang="less" scoped>
  /deep/.ant-btn-primary {
    color: #fff;
    background-color: #1890ff;
  }
  .loginCard {
      width: 300px;
      background: hsla(0,0%,100%,.39);
      -webkit-box-shadow: 0 0 14px #d2d5df;
      box-shadow: 0 0 14px #d2d5df;
      opacity: 1;
      padding: 20px 50px;
      transform: translateX(-50%);
      position: absolute;
      left: 70%;
      top: 250px;
  }
  .VCode {
    display: flex;
    img {
      width: 80px;
    }
  }
  .loginBtn {
    width: 100%;
  }
  </style>