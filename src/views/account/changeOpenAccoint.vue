<template>
  <div class="newOpenAccoint">
    <div class="popUpHeader">
      <h2>开户</h2>
      <div>
        <a-button @click="handleCancel">返回</a-button>
        <a-button type="primary" @click="handleOk">保存</a-button>
        <a-button type="primary" @click="handleSubmit">保存并提交</a-button>
      </div>
    </div>
    <div class="contents">
        <a-form-model
        @submit="handleSubmit"
        :model="handleSubmitForm"
        >
          <a-row class="form-row" :gutter="16">
            <!-- customerId -->
            <a-col :lg="{span: 11}" :md="{span: 12}" :sm="20">
              <a-form-model-item
                
                label="公司名称"
              >
                  <a-select
                    placeholder="公司名称"
                    v-model="handleSubmitForm.accountApplication.customerId"
                    disabled
                  >
                    <a-select-option value="jack">
                      Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                      Lucy
                    </a-select-option>
                    <a-select-option value="tom">
                      Tom
                    </a-select-option>
                  </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :lg="{span: 11}" :md="{span: 12}" :sm="20">
              <a-form-model-item
                
                label="发送平台"
              >
                <a-select
                  placeholder="请选择"
                    v-model="handleSubmitForm.accountApplication.platformId"
                    disabled
                >
                  <a-select-option value="1">
                    直客
                  </a-select-option>
                  <a-select-option value="2">
                    渠道
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <!-- 备注 -->
            <a-col :lg="{span: 22}" :md="{span: 24}" :sm="20">
              <a-form-model-item
                
                label="备注"
              >
                <a-textarea
                  v-model="handleSubmitForm.accountApplication.remark"
                  disabled
                  placeholder="备注"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-divider />
          <div style="display: flex; justify-content: flex-start;">
            <h2>开户申请明细({{handleSubmitForm.accountApplicationDetails.length}}条)</h2>
            <a-button style="margin-left: 40px;" type="primary" @click="establishAAccount">开户</a-button>
          </div>
          <!-- 开户申请明细 -->
          <div class="DefiniteDetailed">
            <div
            class="accountDetailed"
            :style="styleScreenWidth"
            v-for="(item, idx) in handleSubmitForm.accountApplicationDetails"
            :key="idx">
              <div style="display: flex; justify-content: space-between">
                <h4>明细({{ idx + 1 }})</h4>
                <div>
                  <a-button type="link" @click="newlyBuild(item)">关联现有账号</a-button>
                </div>
              </div>
              <a-form-model
                ref="ruleForm"
                :model="item">
              <a-row class="form-row" :gutter="16">
                <!-- 协议类型 -->
                <a-col :lg="11" :md="11" :sm="20">
                  <a-form-model-item prop="joinProtocolCode" label="协议类型">
                    <a-select
                      placeholder="请选择"
                      v-model="item.joinProtocolCode"
                      disabled
                    >
                      <a-select-option value="1"> CMPP </a-select-option>
                      <a-select-option value="2"> HTTP </a-select-option>
                      <a-select-option value="3"> 客户端 </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <!-- 绑定ip -->
                <a-col :lg="11" :md="11" :sm="20">
                  <a-form-model-item label="绑定ip">
                    <a-input v-model="item.masIp"
                    disabled placeholder="绑定ip" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <!-- 连接数 -->
                <a-col :lg="11" :md="11" :sm="20">
                  <a-form-model-item label="连接数">
                    <a-input v-model="item.maxConnection"
                    disabled placeholder="连接数" />
                  </a-form-model-item>
                </a-col>
                <!-- 默认签名 -->
                <a-col :lg="11" :md="11" :sm="20">
                  <a-form-model-item label="默认签名">
                    <a-input v-model="item.mocode"
                    disabled placeholder="默认签名" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="{ span: 11 }" :md="{ span: 11 }" :sm="20">
                  <a-form-model-item label="移动单价" prop="price">
                    <a-input
                      v-model="item.price"
                      disabled
                      addon-after="分"
                      placeholder="移动单价"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="{ span: 11 }" :md="{ span: 11 }" :sm="20">
                  <a-form-model-item label="联通单价" prop="priceUnicom">
                    <a-input
                      v-model="item.priceUnicom"
                      disabled
                      addon-after="分"
                      placeholder="联通单价"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="{ span: 11 }" :md="{ span: 11 }" :sm="20">
                  <a-form-model-item label="电信单价" prop="priceTelecom">
                    <a-input
                      v-model="item.priceTelecom"
                      disabled
                      addon-after="分"
                      placeholder="电信单价"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="{ span: 11 }" :md="{ span: 11 }" :sm="20">
                  <a-form-model-item label="其他单价" prop="priceOther">
                    <a-input
                      v-model="item.priceOther"
                      disabled
                      addon-after="分"
                      placeholder="其他单价"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <!-- 支持开启短链 -->
                <a-col :lg="6" :md="6" :sm="20">
                  <a-form-model-item>
                    <a-checkbox disabled v-model="item.supportShortChain">
                      
                      支持开启短链
                    </a-checkbox>
                  </a-form-model-item>
                </a-col>
                <!-- 是否支持上行 -->
                <a-col :lg="6" :md="6" :sm="20">
                  <a-form-model-item>
                    <a-checkbox disabled v-model="item.supportUpstream">
                      
                      是否支持上行
                    </a-checkbox>
                  </a-form-model-item>
                </a-col>
                <!-- 是否国际 -->
                <a-col :lg="6" :md="6" :sm="20">
                  <a-form-model-item>
                    <a-checkbox disabled v-model="item.supportInternational">
                      
                      是否国际
                    </a-checkbox>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <!-- 预付款 -->
                <a-col :lg="6" :md="6" :sm="20">
                  <a-form-model-item>
                    <a-checkbox disabled v-model="item.prePay">
                       预付款 </a-checkbox>
                  </a-form-model-item>
                </a-col>
                <!-- 自动返还 -->
                <a-col :lg="6" :md="6" :sm="20">
                  <a-form-model-item>
                    <a-checkbox disabled v-model="item.autoBack">
                       自动返还 </a-checkbox>
                  </a-form-model-item>
                </a-col>
                <!-- 国际短信接口是否支持国内短信 -->
                <a-col :lg="9" :md="9" :sm="20">
                  <a-form-model-item>
                    <a-checkbox disabled v-model="item.interfaceSupportIna">
                      
                      国际短信接口是否支持国内短信
                    </a-checkbox>
                  </a-form-model-item>
                </a-col>
              </a-row>
              </a-form-model>
            </div>
          </div>
        </a-form-model>
      </div>
         <BuildSendAccount
          :sendAccount="sendAccount"
          :basicAccountInformation="basicAccountInformation"
          @sendAccountCancel="sendAccountCancel"
         />
    </div>
</template>

<script>
// 新建发送账号
import BuildSendAccount from "./buildSendAccount.vue";
export default {
  data() {
    return {
      confirmLoading: false,
      size: false,
      handleSubmitForm: this.$route.params,
      timer: false,
      styleScreenWidth: '',
      screenWidth: document.body.clientWidth,
      sendAccount: false,
      basicAccountInformation: [],
    };
  },
  components: {
    BuildSendAccount
  },
  props: {
  },
  watch:{
    screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenWidth = val
            this.timer = true
            let that = this
            // setTimeout(function(){
                // 打印screenWidth变化的值
                that.timer = false
                if (that.screenWidth < 1260) {
                that.styleScreenWidth = `flex: 0 0 93%;`
                } else {
                that.styleScreenWidth = `flex: 0 0 48%;`
                }
            // },400)
        }
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }
  },
  created() {
  },
    methods: {
    // 取消
    handleCancel() {
      this.$router.go(-1);
    },
    handleSubmit() {
      this.$refs.ruleForm[0].validate((valid) => {
        if (valid) {
          let arr = {};
          this.handleSubmitForm.validateFields((err, values) => {
            if (!err) {
              let array = { ...values };
              arr = array;
              // arr.details = JSON.parse(JSON.stringify(this.accountDetailed));
              // arr.application.status = 0;
              console.log(arr);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleOk() {
      this.$refs.ruleForm[0].validate((valid) => {
        if (valid) {
          let arr = {};
          this.handleSubmitForm.validateFields((err, values) => {
            if (!err) {
              let array = { ...values };
              arr = array;
              // arr.details = JSON.parse(JSON.stringify(this.accountDetailed));
              // arr.application.status = 0;
              console.log(arr);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    newlyBuild (item) {
        console.log(item);
    },
    // 点击开户
    establishAAccount () {
      this.sendAccount = true
      this.basicAccountInformation = this.handleSubmitForm.accountApplicationDetails
    },
    async sendAccountCancel(row) {
      this.sendAccount = row
    },
  }

}
</script>

<style lang="less" scoped>
.newOpenAccoint {
  background-color: #fff;
  width: 98%;
  margin: 0 auto;
  margin-top: 25px;
  padding: 10px;
  border-radius: 6px;
}
.popUpHeader {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  /deep/.ant-btn {
    margin-left: 8px;
  }
  .fullscreen {
    font-size: 26px;
    margin-right: 20px;
  }
}
/deep/.ant-modal-close-x {
  font-size: 26px;
}
/deep/.ant-modal {
  padding-bottom: 0;
}
/deep/ .ant-modal-content {
  height: 100%;
}
/deep/.ant-modal-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
}
/deep/.ant-modal-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 55px;
  background-color: #f0f2f5;
}
.contents {
    overflow-x: hidden;
    overflow-y: visible;
    height: 89%;
}
/deep/.ant-modal-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.DefiniteDetailed {
  display: flex;
  flex-wrap: wrap;
    // justify-content: flex-start;
  .accountDetailed {
    padding: 10px;
    border-radius: 6px;
    flex: 0 0 48%;
    margin: 10px 0 10px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }
}
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道背景*/
      // border-radius: 5px;
      background: #fff;
    }
</style>