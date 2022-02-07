// columns table标题栏选择项 
// selectedHeader标题栏已选项 
// displayScroll是否显示左右滚动条 
// condition 查询项 
// Inline 查询绑定数据 
// buttonGroup 查询重置按钮 
// tables 查询重置事件 
// operationGroup 表单业务按钮 
// businessGroup 表单业务事件 
// pagination分页 
// ListOperation表单数据点击事件（customRender==id）
import HTransfer from "./Transfer";
import moment from 'moment';
export default {
  components: {
    HTransfer,
  },
  props: {
    columns: {
      type: Array
    },
    selectedHeader: {
      type: Array
    },
    data: {
      type: Array
    },
    condition: {
      type: Array
    },
    // vModel
    Inline: {
      type: Object
    },
    // 查询按钮表
    buttonGroup: {
      type: Array
    },
    // 操作按钮表
    operationGroup: {
      type: Array
    },
    displayScroll: {
      type: Boolean
    },
    // 分页
    pagination: {
      type: Object
    },
    // 权限按钮
    permissionButton: {
      type: Array
    },
    // sourceType的判断
    sourceTypeArr: {
      type: Object
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      loading: false,
      formInline: {},
      customStyle: ' font-size: 16px;background: #fff;border-radius: 4px;margin-bottom: 4px;border: 0;overflow: hidden',
      visible: false,
      advanced: false,
      SelectArray: [],
      createValue: [],
      monthValue: "",
      jurisdiction: 'color: #ccc;'
    };
  },
  render() {
    const that = this;
    const scopedSlots = {
      id: (title, EachItems) => {
        return (
          <a
            {...{ on: { click: () => { this.EachItem('name', EachItems) } } }}>{title}</a>
        );
      },
      sourceType: title => {
        return (
          <span>
            <a-tag
              color={this.sourceTypeArr[title].color}
            >
              {this.sourceTypeArr[title].tit}
            </a-tag>
          </span>
        )
      },
      operation: (title, EachItems) => {
        return (
          that.permissionButton && that.permissionButton.map(item => {
            const directives = [
                { name: 'action', value: item.title}
            ]
            return  item.name != '编辑' && item.name != '核销' ?
              (<span>
                <a-popconfirm
                 onConfirm={() => {
                  this.operationClick(item.clck, title)
                }}
                 title={`是否确认${item.name}？`} ok-text="是" cancel-text="否">
                  <a style="margin-left: 10px;" { ...{ directives } }>
                    {item.name}
                  </ a>
                </a-popconfirm>
              </span>) : (<span>
                  <a style="margin-left: 10px;"
                  style={item.jurisdiction && EachItems[item.jurisdiction] != 0 ? this.jurisdiction : null}
                  onClick={() => {this.operationClick(item.clck, title)}}>
                    {item.name}
                  </ a>
              </span>)
          })
        );
      }
    }

    // form每一项
    let panes = null
    if (that.condition) {
      panes = that.condition.map((item) => {
        return !item.select ? (
          <a-form-model-item label={item.key}>
            <a-input
              vModel={this.formInline[item.title]} />
          </a-form-model-item>
        ) : (
          item.times ?
          (!item.month ? <a-form-model-item label={item.key}>
            <a-range-picker
              value={this.createValue} onChange={this.selectTime} format="YYYY-MM-DD" placeholder={['开始时间', '结束时间']} />
          </a-form-model-item> : <a-form-model-item label={item.key}>
          <a-month-picker value={this.monthValue} onChange={this.selectTime} format="YYYY-MM" />
          </a-form-model-item>) : (
          <a-form-model-item label={item.key}>
            <a-select
              vModel={this.formInline[item.title]}
              placeholder='请选择'
              style="min-width: 120px">
              {item.option.map(optionItem => {
                return (
                  <a-select-option value={optionItem.value}>
                    {optionItem.title}
                  </a-select-option>)
              })}
            </a-select>
          </a-form-model-item>));
      });
    }
    // 查询按钮
    let HButton = null
    if (that.buttonGroup) {
      HButton = that.buttonGroup.map(a => {
        return  a == '返回' ?(<a-button
            style="position: absolute;right: 32px;"
            {...{ on: { click: () => { this.search(a) } } }}>
            {a}
          </a-button>) : (<a-button
            type="primary"
            style="margin-left: 10px;"
            {...{ on: { click: () => { this.search(a) } } }}>
            {a}
          </a-button>)
      })
    }
    // 表单增删改查等等等
    let HoperationGroup = null
    if (that.operationGroup) {
      HoperationGroup = 
      <div class="HoperationGroup">
        <h4>列表</h4>
        <div>
          {
            that.operationGroup.map(item => {
              return (
                <a-button
                  type="primary"
                  style="margin-left: 10px;"
                  disabled={item.disabled ? this.selectedRowKeys.length === 0 : false}
                  {...{ on: { click: () => { this.business(item.name) } } }}
                >
                  {item.name}
                </a-button>
              )
            })
          }
        </div>
      </div>
    }
    const collapses =
      that.condition && that.condition.length > 0 ?
      <a-form-model class="formModelMenuHeader" layout="inline" props={{ model: this.formInline }}>
      {panes}
        {HButton}
    </a-form-model> : null
    return (
      <div>
        {collapses}
        <div>
          <span style="margin-left: 8px">
            {this.hasSelected ? `已选择 ${this.selectedRowKeys.length} 项` : ''}
          </span>
          {this.hasSelected ?
            <a-button type="link" loading={this.loading}
              {...{ on: { click: () => { this.start() } } }}>
              清空
            </a-button> : ''}

        </div>
        <a-table
          columns={this.columns}
          data-source={this.data}
          {...{ scopedSlots }}
          row-selection={this.operationGroup && this.operationGroup.length != 0 ? this.rowSelection : null}
          pagination={this.pagination != undefined && this.pagination}
          rowKey="id"
          class="hwGTable"
          title={() => HoperationGroup}
        >
          <span slot="Transfer"
            {...{ on: { click: () => { this.SelectData() } } }}>
            <a-icon type="setting" />
          </span>
        </a-table>
        {/* 弹出框 */}
        <a-modal
          vModel={this.visible}
          title="编辑显示字段"
          okText="保存设置"
          okText="确认"
          cancelText="取消"
          {...{ on: { ok: () => { this.handleOk() } } }}>
          <HTransfer dataSource={this.columns} selectedHeader={this.selectedHeader} onTransfers={this.transfers} />
        </a-modal>
      </div>
    );
  },
  created() {
    this.getformInline()
    this.gainMonthDate()
  },
  watch: {
    Inline() {
      this.getformInline()
    }
  },
  methods: {
    moment,
    getformInline() {
      this.formInline = this.Inline
      if (this.formInline.date != 1) {
        this.createValue = []
        this.monthValue = ""
      }
    },
    $_handleInputUser(value) {
      this.formInline.user = value
    },
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      let arr= []
      for (const key in selectedRowKeys) {
        this.data.forEach(e => {
          if (e.id == selectedRowKeys[key]) {
            arr.push(e)
          }
        });
      }
      this.SelectArray = arr
      // console.log('selectedRowKeys changed:', this.selectedRowKeys);
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    // 搜索
    search(e) {
      let result = false
      this.$emit('tables', this.formInline, e, val => { result = val }) // 传函数给父组件
      return result
    },
    // 业务功能按钮
    business(e) {
      let result = false
      this.$emit('businessGroup', this.SelectArray, e, val => { result = val }) // 传函数给父组件
      return result
    },
    // 修改头部表单标题栏
    transfers(row) {
      console.log(row);
    },
    // 打开穿梭框选择数据
    SelectData() {
      console.log('打开');
      this.visible = true;
    },

    // 穿梭框确认按钮
    handleOk() {
      console.log('handleOk');
    },
    // table每项scopedSlots==id数据点击事件
    EachItem(a, EachItems) {
      this.$emit('ListOperation', EachItems, a) // 传函数给父组件
    },
    // 权限按钮点击事件
    operationClick(a, title) {
      this.$emit(a, title)
    },
    // 取消
    cancel () {
      console.log(1);
    },
    selectTime (e) {
      console.log(e);
      this.monthValue = e
      this.createValue = e;
      this.formInline.date = e
    },
    // 获取当前时间
    currentTime () {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let day = nowDate.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + '-' + month + '-' +day
    },
    // 获取monthDate
    gainMonthDate () {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      if (month < 10) month = '0' + month
      this.monthDate = year + '-' + month
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange
      };
    }
  }
}