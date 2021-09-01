import { Plugin } from 'vue';
import {
  Button,
  message,
  Table,
  Layout,
  Input,
  Dropdown,
  Menu,
  Pagination,
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Row,
  Col,
  Select,
  Tooltip,
  Modal,
  Spin,
  Calendar,
  ConfigProvider,
  Tabs,
  Divider,
  Timeline,
  Popover,
} from 'ant-design-vue';

const plugins = [
  Spin,
  Layout,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  DatePicker,
  Select,
  Calendar,
  Tooltip,
  Modal,
  Table,
  Pagination,
  Button,
  Form,
  Dropdown,
  Menu,
  ConfigProvider,
  Tabs,
  Divider,
  Timeline,
  Popover,
];

const antdInstall: Plugin = function (app) {
  plugins.forEach((i) => app.use(i));
  app.config.globalProperties.$message = message;
};
export default antdInstall;
