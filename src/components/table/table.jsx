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
  },
  data() {
    return {
      selectedRowKeys: [],
      loading: false,
      formInline: {},
      customStyle: ' font-size: 16px;background: #fff;border-radius: 4px;margin-bottom: 4px;border: 0;overflow: hidden',
      visible: false,
      scroll: { x: 1500 },
      advanced: false,
      SelectArray: []
    };
  },
  render() {
    const scopedSlots = {
      id: (title, EachItems) => {
        return (
          <a
            {...{ on: { click: () => { this.EachItem('name', EachItems) } } }}>{title}</ a>
        );
      },
      sourceType: title => {
        return (
          <span>
            <a-tag
              color={title === '1' ? 'volcano' : title === "2" ? 'geekblue' : 'green'}
            >
              {title}
            </a-tag>
          </span>
        )
      },
      operation: () => {
        return (
          <span>
            <a>按钮1</ a>
            <a-divider type="vertical" />
            <a>按钮2</ a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> C <a-icon type="down" /> </ a>
          </span>
        );
      }
    }

    const that = this;
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
          <a-form-model-item label={item.key}>
            <a-select vModel={this.formInline[item.title]} placeholder='请选择' style="min-width: 120px">
              {item.option.map(optionItem => {
                return (
                  <a-select-option value={optionItem.value}>
                    {optionItem.title}
                  </a-select-option>)
              })}
            </a-select>
          </a-form-model-item>);
      });
    }
    // 查询按钮
    let HButton = null
    if (that.buttonGroup) {
      HButton = that.buttonGroup.map(a => {
        return (
          <a-button
            type="primary"
            style="margin-left: 10px;"
            {...{ on: { click: () => { this.search(a) } } }}>
            {a}
          </a-button>
        )
      })
    }
    // 表单增删改查等等等
    let HoperationGroup = null
    if (that.operationGroup) {
      HoperationGroup = that.operationGroup.map(item => {
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
    const collapses =
      that.condition && that.condition.length > 0 ? (<div>
        <span class="table-page-search-submitButtons" style={this.advanced && { float: 'right', overflow: 'hidden', width: '60px', height: '20px' } || {}}>
          <a onClick={this.toggleAdvanced} style="position: absolute; right: 60px;">
            {this.advanced ? '收起' : '展开'}
            <a-icon type={this.advanced ? 'up' : 'down'} />
          </a>
        </span>
        {that.advanced ?
          <a-form-model layout="inline" props={{ model: this.formInline }}>
            {panes}
            <a-form-model-item>
              {HButton}
            </a-form-model-item>
          </a-form-model> : null}</div>) : null
    return (
      <div>
        {collapses}
        <div class="FormActionItem">
          {HoperationGroup}
        </div>
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
          pagination={this.pagination}
          rowKey={"id"}
          // scroll={this.displayScroll ? this.scroll : {}}
          style="height: 500px;"
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
          {...{ on: { ok: () => { this.handleOk() } } }}>
          <HTransfer dataSource={this.columns} selectedHeader={this.selectedHeader} onTransfers={this.transfers} />
        </a-modal>
      </div>
    );
  },
  created() {
    this.getformInline()
  },
  watch: {
    Inline() {
      this.getformInline()
    }
  },
  methods: {
    getformInline() {
      this.formInline = this.Inline
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
      console.log('selectedRowKeys changed:', this.selectedRowKeys);
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
    transfers(row, callback) {
      let result = false;
      //业务逻辑代码...
      callback(result);
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
      let result = false
      this.$emit('ListOperation', EachItems, a, val => { result = val }) // 传函数给父组件
      return result
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