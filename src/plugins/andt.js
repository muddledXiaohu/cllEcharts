import Vue from 'vue'
import {
    Layout,
    Menu,
    Icon,
    Button,
    Form,
    Input,
    Checkbox,
    notification,
    table,
    tag,
    divider,
    card,
    breadcrumb,
    tree,
    collapse,
    formModel,
    select,
    modal,
    transfer,
    row,
    col,
    cascader,
    message,
    list,
    descriptions,
    popconfirm
} from 'ant-design-vue';
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(table)
Vue.use(tag)
Vue.use(divider)
Vue.use(card)
Vue.use(breadcrumb)
Vue.use(tree)
Vue.use(collapse)
Vue.use(formModel)
Vue.use(select)
Vue.use(modal)
Vue.use(transfer)
Vue.use(row)
Vue.use(col)
Vue.use(cascader)
Vue.use(list)
Vue.use(descriptions)
Vue.use(popconfirm)

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$confirm = modal.confirm;