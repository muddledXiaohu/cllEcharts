
<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
        :wrapper-col="{ span: 5 }"
      >
        <a-input
          v-decorator="['username', ValidateRules.username]"
          placeholder="Username"
        />
      </a-form-item>
      <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
        :wrapper-col="{ span: 5 }"
      >
        <a-input
          v-decorator="['password', ValidateRules.password]"
          type="password"
          placeholder="Password"
        />
      </a-form-item>
      <a-form-item
        :validate-status="captchaError() ? 'error' : ''"
        :help="captchaError() || ''"
      :wrapper-col="{ span: 2 }">
        <a-input
          v-decorator="['captcha', ValidateRules.captcha]"
          placeholder="captcha"
        />
        <img
          v-if="userInfo.img"
          :src="'data:image/png;base64,' + userInfo.img"
          @click="getPhonecode"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 5 }">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
    <a-button @click="qweqwe">123</a-button>
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
        captcha: {
          rules: [{ required: true, message: "请输入验证码！" }],
        },
      },
      // base64
      userInfo: {},
    };
  },
  created() {
    this.getPhonecode();
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    ...mapActions(['Login', 'Usercenter']),
    // 图形验证码
    async getPhonecode() {
      const { data: res } = await this.$http.get(
        "usercenter/auth/getCaptcha?userName="
      );
      // console.log(res);
      this.userInfo = res;
    },
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
    captchaError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("captcha") && getFieldError("captcha");
    },
    handleSubmit(e) {
      // const aa = document.getElementById("username");
      // console.log(aa.value);
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let array = { ...values }
          array.uuid = this.userInfo.uuid
          array.password = this.$md5(array.username+array.captcha+this.$md5(array.password)+'233');
          array.device = "WEB"
          this.login(array)
        }
      });
      // console.log(this.form.getFieldsValue());
    },
    async qweqwe () {
      const { Usercenter } = this
      await Usercenter(11)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
        .finally(() => {
          console.log('zale');
        })
      console.log(2);
      this.$router.push({ path: '/' });
    },
    // 登录
    login(array) {
      const { Login } = this
      Login(array)
        .then((res) => {
          console.log(res);
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
</style>