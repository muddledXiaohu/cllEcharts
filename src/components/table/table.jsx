
import HTransfer from "./Transfer";
export default {
  components: {
    HTransfer,
  },
  props: {
      columns: {
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
      ButtonTB: {
        type: Object
      },
      // 操作按钮表
      operationGroup: {
        type: Array
      }
  },
  data() {
    return {
      selectedRowKeys: [],
      loading: false,
      formInline: {},
      wrapperCol: { span: 0, offset: 19 },
      customStyle:' font-size: 16px;background: #f0f2f5;border-radius: 4px;margin-bottom: 4px;border: 0;overflow: hidden',
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: total => `共 ${total} 条`,
        showQuickJumper: true
      },
      visible: false,
      scroll:{x: 1500}
    };
  },
  render() {
     const scopedSlots = {
        id: title => {
          return (
            <a>{title}</ a>
          );
        },
        sourceType: title => {
          return (
            <span>
              <a-tag
                color={title === '1' ? 'volcano' : title === "2" ? 'geekblue' : 'green'}
              >
                { title }
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
    const panes = that.condition.map((item) => {
      return !item.select ? (
          <a-form-model-item label={item.key}>
            <a-input
            vModel={this.formInline[item.title]}/>
          </a-form-model-item>
      ): (
        <a-form-model-item label={item.key}>
          <a-select vModel={this.formInline[item.title]} placeholder='请选择' style="min-width: 120px">
            <a-select-option value="shanghai">
              Zone one
            </a-select-option>
            <a-select-option value="beijing">
              Zone two
            </a-select-option>
          </a-select>
        </a-form-model-item>);
    });
    // 查询按钮
    const HButton = Object.keys(that.ButtonTB).map( a => {
      return (
        <a-button
            type="primary"
            style="margin-left: 10px;"
            {...{ on: { click: () => { this.search(that.ButtonTB[a]) } } }}>
            {that.ButtonTB[a]}
        </a-button>
      )
    })
    // 表单增删改查等等等
    const HoperationGroup = that.operationGroup.map( item => {
      return (
        <a-button
          type="primary"
          style="margin-left: 10px;"
          disabled={ item.disabled ? this.selectedRowKeys.length === 0: false}
          {...{ on: { click: () => { this.business(item.name) } } }}
          >
          {item.name}
        </a-button>
      )
    })

    return (
      <div>
        <a-collapse bordered={false}>
          <a-collapse-panel key="1" header="搜索" style={this.customStyle}>
            <a-form-model layout="inline" props = {{ model: this.formInline }}>
                  {panes}
                <a-form-model-item>
                  {HButton}
                </a-form-model-item>
            </a-form-model>
          </a-collapse-panel>
        </a-collapse>
          <div class="FormActionItem">
            {HoperationGroup}
          </div>
        <div>
          <span style="margin-left: 8px">
            { this.hasSelected ? `已选择 ${this.selectedRowKeys.length} 项` : ''}
          </span>
          {this.hasSelected ?
          <a-button type="link" loading={this.loading}
          {...{ on: { click: () => { this.start() } } }}>
            清空
          </a-button> : ''}

        </div>
        <a-table
          columns={ this.columns }
          data-source={ this.data }
          {...{ scopedSlots }}
          row-selection={this.rowSelection}
          pagination={this.pagination}
          rowKey={"id"}
          scroll={ this.scroll }
          style="height: 600px;"
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
          <HTransfer dataSource={this.columns} />
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
      console.log('selectedRowKeys changed:',  this.selectedRowKeys);
    },
    // 搜索
    search (e) {
      let result = false
      this.$emit('tables', this.formInline, e, val => { result = val }) // 传函数给父组件
      return result
    },
    // 业务功能按钮
    business (e) {
      let result = false
      this.$emit('businessGroup', this.selectedRowKeys, e, val => { result = val }) // 传函数给父组件
      return result
    },
    // 打开穿梭框选择数据
    SelectData () {
      console.log('打开');
      this.visible = true;
    },

    // 穿梭框确认按钮
    handleOk () {
      console.log('handleOk');
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