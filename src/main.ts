import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Picker, Button,Form, Switch, Field, CellGroup, Calendar, Checkbox , CheckboxGroup, Cell, Tabbar, TabbarItem, Popup } from 'vant';
import 'vant/lib/index.css';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { Space } from 'vant';
import { Icon } from 'vant';
const app = createApp(App);
app.use(Button);
app.use(Icon)
app.use(Field);
app.use(CellGroup);
app.use(Cell);
app.use(Calendar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Checkbox);
app.use(Picker);
app.use(Form);
app.use(Popup);
app.use(Switch);
app.use(CheckboxGroup);
app.use(VCalendar, {})
app.use(Space);

app.use(router)

app.mount('#app')
