// 更改账户
<template>
  <a-modal
    :visible="sendAccount"
    :confirm-loading="confirmLoading"
    :maskClosable="false"
    :centered="true"
    :width="size ? '100%' : '80%'"
    :height="size ? '100%' : '80%'"
    @cancel="handleCancel"
  >
    <template slot="footer">
      <!-- <a-button @click="handleCancel">取消</a-button> -->
      <!-- <a-button type="primary" @click="handleOk">保存</a-button>
      <a-button type="primary" @click="handleSubmit">保存并提交</a-button> -->
    </template>
    <div class="popUpHeader">
      <h2>开户</h2>
      <a-button type="link" @click="switchSize">
        <a-icon
          class="fullscreen"
          :type="size ? 'fullscreen-exit' : 'fullscreen'"
        />
      </a-button>
    </div>
    <div class="contents">
      <a-table
       :scroll="{ x: 1800 }"
        ref="table"
        size="default"
        :pagination="false"
        :columns="inspectionColumns"
        :dataSource="buildSendAccountData"
      >
        <!-- 协议类型 -->
        <template slot="joinProtocolCode" slot-scope="text, record, index">
          <a-select
            placeholder="请选择"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            optionFilterProp="children"
            showSearch
            allowClear
            @change="(e) => handleChangeIndex(e, index, 'joinProtocolCode')"
          >
            <a-select-option value="1"> CMPP </a-select-option>
            <a-select-option value="2"> HTTP </a-select-option>
            <a-select-option value="3"> 客户端 </a-select-option>
          </a-select>
          <template v-else>
            {{['CMPP', "HTTP", "客户端"][text - 1]}}
          </template>
        </template>
        <!-- 绑定ip -->
        <template slot="masIp" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'masIp')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 连接数 -->
        <template slot="maxConnection" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'maxConnection')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 默认签名 -->
        <template slot="mocode" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'mocode')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 移动单价 -->
        <template slot="price" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'price')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 联通单价 -->
        <template slot="priceUnicom" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'priceUnicom')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 电信单价 -->
        <template slot="priceTelecom" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'priceTelecom')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 其他单价 -->
        <template slot="priceOther" slot-scope="text, record, index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'priceOther')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 支持开启短链 -->
        <template slot="supportShortChain" slot-scope="text, record, index">
          <a-checkbox
            v-if="record.editable"
            style="margin: -5px 0"
            :checked="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'supportShortChain')"
          >支持开启短链</a-checkbox>
          <template v-else>
            <div v-if="text">是</div>
            <div v-else>否</div>
          </template>
        </template>
        <!-- 是否支持上行 -->
        <template slot="supportUpstream" slot-scope="text, record, index">
          <a-checkbox
            v-if="record.editable"
            style="margin: -5px 0"
            :checked="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'supportUpstream')"
          >是否支持上行</a-checkbox>
          <template v-else>
            <div v-if="text">是</div>
            <div v-else>否</div>
          </template>
        </template>
        <!-- 是否国际 -->
        <template slot="supportInternational" slot-scope="text, record, index">
          <a-checkbox
            v-if="record.editable"
            style="margin: -5px 0"
            :checked="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'supportInternational')"
          >是否国际</a-checkbox>
          <template v-else>
            <div v-if="text">是</div>
            <div v-else>否</div>
          </template>
        </template>
        <!-- 预付款 -->
        <template slot="prePay" slot-scope="text, record, index">
          <a-checkbox
            v-if="record.editable"
            style="margin: -5px 0"
            :checked="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'prePay')"
          >预付款</a-checkbox>
          <template v-else>
            <div v-if="text">是</div>
            <div v-else>否</div>
          </template>
        </template>
        <!-- 自动返还 -->
        <template slot="autoBack" slot-scope="text, record, index">
          <a-checkbox
            v-if="record.editable"
            style="margin: -5px 0"
            :checked="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'autoBack')"
          >自动返还</a-checkbox>
          <template v-else>
            <div v-if="text">是</div>
            <div v-else>否</div>
          </template>
        </template>
        <!-- 国际短信接口是否支持国内短信 -->
        <template slot="interfaceSupportIna" slot-scope="text, record, index">
          <a-checkbox
            v-if="record.editable"
            style="margin: -5px 0"
            :checked="text"
            @change="(e) => handleChangeIndex(e.target.value, index, 'interfaceSupportIna')"
          >国际短信接口是否支持国内短信</a-checkbox>
          <template v-else>
            <div v-if="text">是</div>
            <div v-else>否</div>
          </template>
        </template>

        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="saveRowIndex(index)">保存</a>&nbsp;
              <a-popconfirm title="确定取消吗?" @confirm="() => cancelIndex( index)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="() => editRowIndex( index)">编辑</a>&nbsp;
              <a-popconfirm  title="确定删除吗?" @confirm="() => delRowIndex(index)">
                <a>删除</a>
              </a-popconfirm>
      
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      confirmLoading: false,
      size: false,
      formInline: {},
      inspectionColumns: [
        {
          title: '协议类型',
          dataIndex: 'joinProtocolCode',
          scopedSlots: { customRender: 'joinProtocolCode' },
        },
        {
          title: '绑定ip',
          dataIndex: 'masIp',
          scopedSlots: { customRender: 'masIp' },
        },
        {
          title: '连接数',
          dataIndex: 'maxConnection',
          scopedSlots: { customRender: 'maxConnection' },
        },
        {
          title: '默认签名',
          dataIndex: 'mocode',
          scopedSlots: { customRender: 'mocode' },
        },
        {
          title: '移动单价',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' },
        },
        {
          title: '联通单价',
          dataIndex: 'priceUnicom',
          scopedSlots: { customRender: 'priceUnicom' },
        },
        {
          title: '电信单价',
          dataIndex: 'priceTelecom',
          scopedSlots: { customRender: 'priceTelecom' },
        },
        {
          title: '其他单价',
          dataIndex: 'priceOther',
          scopedSlots: { customRender: 'priceOther' },
        },
        {
          title: '支持开启短链',
          dataIndex: 'supportShortChain',
          scopedSlots: { customRender: 'supportShortChain' },
        },
        {
          title: '是否支持上行',
          dataIndex: 'supportUpstream',
          scopedSlots: { customRender: 'supportUpstream' },
        },
        {
          title: '是否国际',
          dataIndex: 'supportInternational',
          scopedSlots: { customRender: 'supportInternational' },
        },
        {
          title: '预付款',
          dataIndex: 'prePay',
          scopedSlots: { customRender: 'prePay' },
        },
        {
          title: '自动返还',
          dataIndex: 'autoBack',
          scopedSlots: { customRender: 'autoBack' },
        },
        {
          title: '国际短信接口是否支持国内短信',
          dataIndex: 'interfaceSupportIna',
          scopedSlots: { customRender: 'interfaceSupportIna' },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }, width: 150, fixed: 'right'
        },
      ],
      editingKey: '',
      buildSendAccountData: [],
      cacheData: []
    };
  },
  props: {
    sendAccount: {
      type: Boolean,
    },
    basicAccountInformation: {
      type: Array,
    },
  },
  watch: {
    basicAccountInformation() {
      this.q();
    },
  },
  created() {},
  methods: {
    q() {
      this.buildSendAccountData = this.basicAccountInformation
      this.cacheData = this.buildSendAccountData.map(item => ({ ...item }))
      console.log(123, this.cacheData);
    },
    // 放大缩小
    switchSize() {
      this.size = !this.size;
    },
    // 取消
    handleCancel() {
      this.$emit("sendAccountCancel", false); // 传函数给父组件
    },
    handleSubmit() {
      console.log(this.formInline);
    },
        //保存
    saveRowIndex(key) {
      alert('保存')
      const newData = [...this.buildSendAccountData]
      const target = newData[key]
      if (target) {
        target.editable = false
        delete target.editable
        delete target.isAdd
        this.buildSendAccountData = newData
      }
    },
    //取消
    cancelIndex(key) {
      alert('取消')
      const newData = [...this.buildSendAccountData]
      const target = newData[key]
      if (target) {
        delete target.editable
        if (target.isAdd) {
          newData.splice(key, 1)
        }
        this.buildSendAccountData = newData
      }
    },
    //编辑
    editRowIndex(key) {
      const newData = [...this.buildSendAccountData]
      const target = newData[key]
      if (target) {
        target.editable = true
        this.buildSendAccountData = newData
      }
    },
    //删除
    delRowIndex(key) {
      const newData = [...this.buildSendAccountData]
      const target = newData[key]
      if (target) {
        newData.splice(key, 1)
      }
      this.buildSendAccountData = newData
    },
    //表格确定回调
    handleChangeIndex(value, key, column) {
      const dataSource = [...this.buildSendAccountData]
      const target = dataSource[key]
      if (target) {
        target[column] = value
        this.buildSendAccountData = dataSource
      }
    },
  },
};
</script>

<style lang="less" scoped>
.popUpHeader {
  margin-top: -10.5px;
  display: flex;
  justify-content: space-between;
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
}
.contents {
  overflow-x: hidden;
  overflow-y: visible;
  height: 89%;
  h4 {
    color: #1890ff;
  }
}
/deep/.ant-modal-footer {
  display: none;
}
/deep/ .ant-divider-horizontal {
    margin: 2px 0;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道背景*/
  // border-radius: 5px;
  background: #fff;
}
</style>