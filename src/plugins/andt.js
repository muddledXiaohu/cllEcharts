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
    transfer
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

Vue.prototype.$notification = notification;