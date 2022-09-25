
export default {
  props: {
    contacts: {
      type: Array
    },
  },
  data() {
    return {
      contactArrs: [],
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
    };
  },
  render() {
    const contactForm = this.contacts.map((item ,key) => {
      return (
          <div>
            <div style="display: flex; justify-content: space-between; width: 60%;">
              <h4 style="padding-left: 25px;">{'联系人' + (key+1)}</h4>
              <a-button type="link" {...{ on: { click: () => { this.contactArrDlt(key) } } }}>删除</a-button>
            </div>
            <a-form form={item} label-col={this.labelCol} wrapper-col={this.wrapperCol}>
              <a-row class="form-row" gutter={16}>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="姓名">
                    <a-input v-model={item.name} placeholder="姓名">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="职务">
                    <a-input v-model={item.duty} placeholder="职务">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="手机号">
                    <a-input v-model={item.phone} placeholder="手机号">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" gutter={16}>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="座机">
                    <a-input v-model={item.telephone} placeholder="座机">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="邮箱">
                    <a-input v-model={item.email} placeholder="邮箱">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="球球">
                    <a-input v-model={item.qqNumber} placeholder="球球">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" gutter={16}>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="微信">
                    <a-input v-model={item.wechatNumber} placeholder="微信">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col lg={24} md={24} sm={24}>
                  <a-form-model-item label="备注">
                    <a-input v-model={item.remark} placeholder="备注">
                      <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form>
      </div>)
    });
    return (
      <div>
        {contactForm}
      </div>
    );
  },
  created() {
    // this.contactArr()
  },
  watch: {
  },
  methods: {
    contactArrDlt (key) {
      let result = false
      this.$emit('CaseDeletion', key, val => { result = val }) // 传函数给父组件
      return result
    }
  },
}