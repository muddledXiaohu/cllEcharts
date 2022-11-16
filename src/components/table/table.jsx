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
// import {  ACCESS_ROLEID } from '@/store/mutation-types'
// import storage from 'store'
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
    },
    // 时间
    sendDateStartTime: {
      type: String
    },
    sendDateEndTime: {
      type: String
    },
    // 是否时间为空
    timeEmpty:{
      type: Boolean
    },
    listName: {
      type: String
    },
    scrollWidth: {
      type: Object
    },
    tablePermissions: {
      type: Boolean
    },
    totalArr: {
      type: Object
    },
    haveSelection: {
      type: Boolean
    },
    permit: {
      type: String
    },
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
      rangePickerDateFC: [],
      createValue: [],
      jurisdiction: 'color: #ccc;',
      shortcutKeySize: -1,
      accessRoleid: {}
    };
  },
  render() {
    const that = this;
    const scopedSlots = {
      id: (title, EachItems) => {
        return (
          <a  {...{ on: { click: () => { this.EachItem('name', EachItems) } } }}>{title}</a>
        );
      },
      number: (title, EachItems) => {
        return (
          <a  {...{ on: { click: () => { this.EachItem('number', EachItems) } } }}>{title}</a>
        );
      },
      sourceType: title => {
        return (
          <span>
            <a-tag color={this.sourceTypeArr[title].color}>
              {this.sourceTypeArr[title].tit}
            </a-tag>
          </span>
        )
      },
      actions: title => {
        return(
          <span class="accountNames">
            <p>{title}</p>
          </span>
        )
      },
      operation: (title, EachItems) => {
        return (
          that.permissionButton.map(item => {
            let names = ''
            if (item.recoveryOrFreeze && title.status === 1) {
              names = item.name.substring(0, 2)
            } else if (item.recoveryOrFreeze && title.status === 0) {
              names = item.name.substring(3, 5)
            } else {
              names = item.name
            }

            // whole
            return item.popconfirms ?
            (<span>
              <a-popconfirm
               style="margin-left: 10px;"
               onConfirm={() => {
                this.operationClick(item.clck, title)
              }}
               title={`是否确认${names}？`} ok-text="是" cancel-text="否">
                <a>
                  {names}
                </ a>
              </a-popconfirm>
            </span>) : (item.dataJudgment && title.status === 1 ? null : <span style="margin-left: 10px;">
                <a
                style={item.jurisdiction && EachItems[item.jurisdiction] != 0 ? this.jurisdiction : null}
                onClick={() => {this.operationClick(item.clck, title)}}>
                  {names}
                </a>
            </span>)
          })
        );
      },
      /**
       * 
       * @name cllTrend上下标签
       */
      cllTrend: (title) => {
        return (
          title == '上' ? <a-icon type="rise" style="fontSize: 16px; color: #66ad6b;" /> :
          <a-icon type="fall" style="fontSize: 16px; color: red;" />
        )
      },
      /**
       * @name tagging标签化
       */
       tagging: (title) => {
         let colors = title.includes('A') ? 'background-color: #66ad6b' :
           title.includes('B') ? 'background-color: #bfda73' :
           title.includes('C') ? 'background-color: #ffe37d' :
           title.includes('D') ? 'background-color: #f6a057' : 'background-color: #e37574';
         return (
          <div class="taggings" style={colors}>
            <p>{title}</p>
          </div>)
       }
    }
    // form每一项
    let panes = null
    if (that.condition) {
      panes = that.condition.map((item) => {
        return !item.select ? (
          <a-form-model-item label={item.key}>
            <a-input
              maxLength={50}
              vModel={this.formInline[item.title]} />
          </a-form-model-item>
        ) : (
          item.times ?
          (!item.month ? (item.shortcutKey ? 
            <a-form-model-item label={item.key}>
            <a-range-picker
             allowClear={false}
             vModel={this.rangePickerDateFC}
             onChange={this.selectTime}
             format="YYYY-MM-DD"
             placeholder={['开始时间', '结束时间']} />
              <a-radio-group value={this.shortcutKeySize} onChange={this.handleSizeChange}>
                <a-radio-button value={1}>昨天</a-radio-button>
                <a-radio-button value={2}>本周</a-radio-button>
                <a-radio-button value={3}>本月</a-radio-button>
                <a-radio-button value={4}>上月</a-radio-button>
              </a-radio-group>
          </a-form-model-item> : <a-form-model-item label={item.key}>
            <a-range-picker
             allowClear={item.allowClears ? true : false}
             vModel={this.rangePickerDateFC}
             onChange={this.selectTime}
             format="YYYY-MM-DD"
             placeholder={['开始时间', '结束时间']} />
          </a-form-model-item>) : <a-form-model-item label={item.key}>
          <a-month-picker
            vModel={this.createValue}  onChange={this.selectTime} format="YYYY-MM" />
          </a-form-model-item>) : (
          <a-form-model-item label={item.key}>
            <a-select
              vModel={this.formInline[item.title]}
              placeholder='请选择'
              show-search
              allowClear
              showArrow={!item.showArrow}
              filter-option={this.filterOption}
              not-found-content={null}
              style={item.styleWt ? item.styleWt : "min-width: 120px"}
              onSearch={(value)=> {item.channelBusinessId ? this.channelBusiness(value, item.key) : this.searchChange(value)}}
              >
              {item.option.map(optionItem => {
                return (
                  <a-select-option value={optionItem.value} title={optionItem.title}>
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
            style="margin-left: 10px;margin-top: 5px;"
            {...{ on: { click: () => { this.search(a) } } }}>
            {a}
          </a-button>)
      })
    }
    // 表单增删改查等等等
    let HoperationGroup = null
    if (that.operationGroup) {
      let selectModel = '航次'
      HoperationGroup = 
      <div class="HoperationGroup">
        <h4>{this.listName ? this.listName : '列表'}</h4>
        <div>
          {
            // that.$directives(that.operationGroup ?? [], true).map(item => {
              that.operationGroup.map(item => {
              return JSON.stringify(item) == "{}" ? null : (
                item.select ? (
                  <a-select
                    vModel={selectModel}
                    placeholder='请选择'
                    show-search
                    allowClear
                    not-found-content={null}
                    onSearch={(value)=> {this.displayMode(value)}}
                    >
                    {item.option.map(optionItem => {
                      return (
                        <a-select-option value={optionItem.value} title={optionItem.title}>
                          {optionItem.title}
                        </a-select-option>)
                    })}
                  </a-select>) : (<a-button
                  type="primary"
                  style="margin-left: 10px;"
                  disabled={item.disabled ? this.selectedRowKeys.length === 0 : false}
                  {...{ on: { click: () => { this.business(item.name) } } }}
                >
                  {item.name}
                </a-button>)
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
          <span>
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
          row-selection={this.operationGroup && this.operationGroup.length != 0 && this.haveSelection ? this.rowSelection : null}
          pagination={this.pagination != undefined && this.pagination}
          rowKey="id"
          class="hwGTable"
          scroll={this.scrollWidth? this.scrollWidth:{}}
          title={() => HoperationGroup}
          onChange={this.handleTableChange}
        >
          <span slot="Transfer"
            {...{ on: { click: () => { this.SelectData() } } }}>
            <a-icon type="setting" />
          </span>
          {this.totalArr ? <span slot="footer">
              <a-table
                class="totalTable"
                columns={this.columns}
                data-source={[this.totalArr]}>
                <template slot="actions">
                  <span class="accountNames total">
                    <p>总计</p>
                  </span>
                </template>
              </a-table>
            </span> : null
          }
        </a-table>
        {/* 弹出框 */}
        <a-modal
          vModel={this.visible}
          title="编辑显示字段"
          // okText="保存设置"
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
    this.actionBar()
    this.accessRoleid = 123
  },
  watch: {
    Inline() {
      this.getformInline()
    },
    sendDateStartTime() {
      if (this.sendDateStartTime) {
        this.getformInline()
      }
    },
    rangePickerDateFC() {
      this.dailyGrossDateFc()
    }
  },
  methods: {
    moment,
    // 操作栏是否为空
    actionBar() {
      if (this.permissionButton) {
        let bar = this.permissionButton
        // let bar = this.$directives(this.permissionButton)
        let whether = true
        bar.forEach( item => {
          if (JSON.stringify(item) !== '{}') {
            whether = false
          }
        })
        if (whether) {
          this.columns.pop()
        }
      }
    },
    getformInline() {
      this.formInline = this.Inline || {}
      if (this.formInline.resetdate != 1) {
        this.rangePickerDateFC = []
        this.createValue = []
         this.rangePickerDateFC = this.timeEmpty ? [] : [
          moment(this.currentStartTime(), 'YYYY-MM-DD'),
          moment(this.currentEndTime(), 'YYYY-MM-DD')
        ]
        this.createValue = moment(this.gainMonthDate(), 'YYYY-MM')
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
      if (e == '导出') {
        this.ToDoExcel()
        return
      }
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
      console.log(EachItems, a);
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
      this.formInline.date = e
    },
    // 搜索功能
    filterOption(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) > -1;
    },
    // 
    searchChange (input) {
      this.$emit('tbFilterOption', input) // 传函数给父组件
    },
    channelBusiness (input, key) {
      this.$emit('tbchannelBusiness', input, key) // 传函数给父组件
    },
    // 获取当前开始时间
    currentStartTime () {
      if (this.sendDateStartTime) {
        return this.sendDateStartTime
      }
      let curDate = new Date();
      let nowDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let day = nowDate.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + '-' + month + '-' +day
    },
    // 获取当前结束时间
    currentEndTime () {
      if (this.sendDateEndTime) {
        return this.sendDateEndTime
      }
      let curDate = new Date();
      let nowDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
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
      return year + '-' + month
    },
    ToDoExcel() {
      const tableData = this.transData(
          this.columns,
          this.data
      );
      // 将一组 JS 数据数组转换为工作表
      const ws = this.$XLSX.utils.aoa_to_sheet(tableData);
      const wb = this.$XLSX.utils.book_new();
      this.$XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      this.$XLSX.writeFile(wb, 'table.xlsx');
    },
    transData(columns, tableList) {
      const obj = columns.reduce((acc, cur) => {
        if (!acc.titles && !acc.keys) {
          acc.titles = [];
          acc.keys = [];
        }
        if (cur.scopedSlots?.customRender == "actions") {
          acc.titles.push('主账号');
        } else {
          acc.titles.push(cur.title);
        }
        acc.keys.push(cur.dataIndex);
        return acc;
      }, {});
        const tableBody = tableList.map(item => {
          return obj.keys.map(key => item[key]);
        });
      return [ obj.titles, ...tableBody ];
    },
    // 日期快捷键
    handleSizeChange(e) {
      this.shortcutKeySize = e.target.value;
      let times = this.moments(e.target.value)
      this.rangePickerDateFC =  [
       moment(times[0], 'YYYY-MM-DD'),
       moment(times[1], 'YYYY-MM-DD')
     ]
     this.$emit('shortcutKeyBun', times)
     this.$emit('tables', this.formInline, '查询') // 传函数给父组件
    },
    moments(e) {
      if (e == 1) {
        // console.log(moment().subtract(1, 'days').format('YYYY-MM-DD'));
        const startEnd = moment().subtract(1, 'days').format('YYYY-MM-DD')
        return [startEnd, startEnd]
      } else if (e == 2) {
        // const startDate = moment().startOf('week').format('YYYY-MM-DD')
        // const endDate = moment().endOf('week').format('YYYY-MM-DD')
        const startDate = moment().weekday(1).format('YYYY-MM-DD')
        const endDate = moment().weekday(7).format('YYYY-MM-DD')
        return [startDate, endDate]
      } else if (e == 3) {
        const startDate = moment().startOf('month').format('YYYY-MM-DD')
        const endDate = moment().endOf('month').format('YYYY-MM-DD')
        return [startDate, endDate]
      } else if (e == 4) {
        const startDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
        const endDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
        return [startDate, endDate]
      }
      // console.log(moment().weekday(1).format('YYYY-MM-DD'));
      // console.log(moment().weekday(7).format('YYYY-MM-DD'));
    },
    dailyGrossDateFc() {
      let conditions = false
      let conditionArr = this.condition ?? []
      conditionArr.forEach( item => {
        if (item.shortcutKey) {
          conditions = true
        }
      })
      if (conditions) {
        let date1 = this.rangePickerDateFC[0].format('YYYY-MM-DD')
        let date2 = this.rangePickerDateFC[1].format('YYYY-MM-DD')
        const startEnd = moment().subtract(1, 'days').format('YYYY-MM-DD')
        const startDate1 = moment().weekday(1).format('YYYY-MM-DD')
        const endDate1 = moment().weekday(7).format('YYYY-MM-DD')
        const startDate2 = moment().startOf('month').format('YYYY-MM-DD')
        const endDate2 = moment().endOf('month').format('YYYY-MM-DD')
        const startDate3 = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
        const endDate3 = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
        if (date1 === startEnd && date2 === startEnd) {
          this.shortcutKeySize = 1
        }else if (date1 === startDate1 && date2 === endDate1) {
          this.shortcutKeySize = 2
        }else if (date1 === startDate2 && date2 === endDate2) {
          this.shortcutKeySize = 3
        }else if (date1 === startDate3 && date2 === endDate3) {
          this.shortcutKeySize = 4
        } else {
          this.shortcutKeySize = -1
        }
      }
      // rangePickerDateFC
    },

    // table上边下拉选择功能
    displayMode(value) {
      console.log(value, 123);
    },
    handleTableChange (pagination, filters, sorter) {
      // console.log(pagination, filters, sorter);
      this.$emit('tbhandleTableChange', sorter.order || '') // 传函数给父组件
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