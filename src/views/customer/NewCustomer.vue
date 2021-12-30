<template>
  <div class="NewCustomer">
    <div class="OperationReturn">
      <a-button class="antReturn" @click="customerReturn">返回</a-button>
    </div>
    <a-divider class="divider" orientation="left">
      基本信息
    </a-divider>
    <a-row type="flex">
      <a-col :span="24">
        <a-form :form="handleSubmitForm" @submit="handleSubmit">
          <a-row class="form-row" :gutter="16">
            <!-- name -->
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item
                :validate-status="nameError() ? 'error' : ''"
                :help="nameError() || ''"
                label="客户名称"
              >
                <a-input
                  v-decorator="['name', ValidateRules.name]"
                  placeholder="客户名称"
                />
              </a-form-item>
            </a-col>
            <!-- sourceType -->
            <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item
                :validate-status="sourceTypeError() ? 'error' : ''"
                :help="sourceTypeError() || ''"
                label="客户属性"
              >
                <a-select
                  placeholder="请选择"
                  v-decorator="['sourceType']"
                >
                  <a-select-option value="1">
                    1
                  </a-select-option>
                  <a-select-option value="2">
                    2
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- tariffNumber -->
            <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
              <a-form-item
                :validate-status="tariffNumberError() ? 'error' : ''"
                :help="tariffNumberError() || ''"
                label="纳税人识别号"
              >
                <a-input
                  placeholder="纳税人识别号"
                  v-decorator="['tariffNumber']"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <!-- industryDictCode -->
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item
                :validate-status="industryDictCodeError() ? 'error' : ''"
                :help="industryDictCodeError() || ''"
                label="行业"
              >
                <a-select
                  placeholder="请选择"
                  v-decorator="['industryDictCode']"
                >
                  <a-select-option value="1">
                    1
                  </a-select-option>
                  <a-select-option value="2">
                    2
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- 地区 -->
            <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item
                :validate-status="regionError() ? 'error' : ''"
                :help="regionError() || ''"
                label="地区"
              >
                <area-select
                  @change="selectArea"
                  :default-value="defaultArea"
                />
              </a-form-item>
            </a-col>
            <!-- location -->
            <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
              <a-form-item
                :validate-status="locationError() ? 'error' : ''"
                :help="locationError() || ''"
                label="详细地址"
              >
                <a-input
                  placeholder="详细地址"
                  v-decorator="['location']"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <!-- telephone -->
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item
                :validate-status="telephoneError() ? 'error' : ''"
                :help="telephoneError() || ''"
                label="手机号"
              >
                <a-input
                  placeholder="手机号"
                  v-decorator="['telephone']"
                />
              </a-form-item>
            </a-col>
            <!-- tags -->
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item
                :validate-status="tagsError() ? 'error' : ''"
                :help="tagsError() || ''"
                label="标签"
              >
                <a-input
                  placeholder="标签"
                  v-decorator="['tags']"
                />
              </a-form-item>
            </a-col>
        </a-row>
        </a-form>
          <a-divider class="divider" orientation="left">
            联系人信息
          </a-divider>
      </a-col>
      <a-col :span="24">
        <ContactsForm
          :contacts="contacts"
          @CaseDeletion="CaseDeletion"
         />
      </a-col>
      <a-col :span="5">
      </a-col>
      <a-col :span="19" style="padding-bottom: 30px;">
        <a-button
          type="dashed"
          style="width: 50%; display: block;"
          @click="AddAContact"
        >
          +  添加联系人
        </a-button>
        <a-button
          @click="handleSubmit"
          type="primary"
          html-type="submit"
          class="saveSubmit"
          :disabled="hasErrors(handleSubmitForm.getFieldsError())"
        >
          保存
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import areaSelect from "@/components/NewCustomer/areaselect.vue";
import ContactsForm from "@/components/NewCustomer/contactsForm.jsx";
import { save, contactsSave } from '@/api/customer'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: 'NewCustomer',
  components: {
    areaSelect,
    ContactsForm
  },
  data() {
    return {
      hasErrors,
      defaultArea:[],
      handleSubmitForm: this.$form.createForm(this, { name: "Information" }),
      ValidateRules: {
        name: {
          rules: [{ required: true, message: "请输入客户名称！" }],
        },
      },
      selectAreaNumber: [],
      // 联系人
      contacts: []
    }
  },
  created() {
  },
  methods: {
      //选择地区之后的回调
      selectArea(selectedArea) {
        this.selectAreaNumber = selectedArea
      },
      customerReturn () {
        this.$router.go(-1);
      },

      // Only show error after a field is touched.
      nameError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("name") && getFieldError("name");
      },
      // sourceTypeError
      sourceTypeError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("sourceType") && getFieldError("sourceType");
      },
      // tariffNumberError
      tariffNumberError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("tariffNumber") && getFieldError("tariffNumber");
      },
      // industryDictCodeError
      industryDictCodeError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("industryDictCode") && getFieldError("industryDictCode");
      },
      // regionError
      regionError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("region") && getFieldError("region");
      },
      // locationError
      locationError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("location") && getFieldError("location");
      },
      // telephone
      telephoneError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("telephone") && getFieldError("telephone");
      },
      // tags
      tagsError() {
        const { getFieldError, isFieldTouched } = this.handleSubmitForm;
        return isFieldTouched("tags") && getFieldError("tags");
      },
      async handleSubmit(e) {
        // const aa = document.getElementById("name");
        // console.log(aa.value);
        e.preventDefault();
        this.handleSubmitForm.validateFields( async (err, values) => {
          if (!err) {
            let array = { ...values }
            if (this.selectAreaNumber.length != 0) {
                array.provinceNumber = this.selectAreaNumber[0]
                array.cityNumber = this.selectAreaNumber[1]
                array.zoneNumber = this.selectAreaNumber[2]
            } else {
                array.provinceNumber = undefined
                array.cityNumber = undefined
                array.zoneNumber = undefined
            }
            array.belongUid = 1
            await save(array)
              .then((res) => {
                console.log(res)
                // const { data } = res
                this.contactsSubmit()
              }).catch(err => console.log(err))
          }
        });
        // console.log(this.handleSubmitForm.getFieldsValue());
      },
      // 
      async contactsSubmit () {
        for (const key in this.contacts) {
          console.log(this.contacts[key]);
            await contactsSave(this.contacts[key])
              .then((res) => {
                console.log(res)
              }).catch(err => {
                console.log(err)
                return;
              })
        }
        this.$message.success(
          '保存成功！'
        );
      },
      // 添加联系人
      AddAContact () {
        this.contacts.push({
          customerId: 1,
          name:'',
          duty:'',
          phone:'',
          telephone:'',
          email:'',
          qqNumber:'',
          wechatNumber:'',
          remark:'',
          createUid:202
        })
      },
      // 删除联系人
      CaseDeletion (row, callback) {
        let result = false;
        //业务逻辑代码...
        callback(result);
        this.contacts.splice(row,1)
      }
  }
};
</script>
<style lang="less" scoped>
.NewCustomer {
    padding-top: 20px;
}
.OperationReturn {
    text-align: right;
    .antReturn {
        margin-right: 20px;
    }
}
.form-row {
  padding: 10px;
}
.saveSubmit {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
<style lang="less">
.contactJsx {
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
}
</style>