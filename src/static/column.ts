const accountColumn = (sign: string) => {
  const flag = sign === 'dev';
  const text = flag ? '待修改' : '待复核';
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '账号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    flag && {
      title: '处理中异常数',
      dataIndex: 'abnormalNum',
      key: 'abnormalNum',
    },
    {
      title: `${text}映射数`,
      dataIndex: 'editField',
      key: 'editField',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ].filter((i) => i);
};

const devExceptionColumn = (tabKey: string) => {
  const flag = tabKey !== '2';
  const handerDisplay = tabKey !== '0' && !localStorage.getItem('role');
  return [
    flag && {
      title: '发布日期',
      dataIndex: 'gmtPublish',
      key: 'gmtPublish',
    },
    flag && {
      title: '报错日期',
      dataIndex: 'gmtFailed',
      key: 'gmtFailed',
    },
    !flag && {
      title: '最新处理时间',
      dataIndex: 'gmtHandle',
      key: 'gmtHandle',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: '数据类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    {
      title: '错误类型',
      dataIndex: 'failedType',
      key: 'failedType',
    },
    {
      title: 'source_id',
      dataIndex: 'sourceId',
      key: 'sourceId',
    },
    {
      title: '网站名称',
      dataIndex: 'sourceName',
      key: 'sourceUrl',
    },
    {
      title: '子目录',
      dataIndex: 'childCatalog',
      key: 'catalogUrl',
    },
    {
      title: '爬虫名称',
      dataIndex: 'crawlerName',
      key: 'crawlerName',
    },
    handerDisplay && {
      title: '处理人',
      dataIndex: 'handler',
      key: 'handler',
    },
    // {
    //   title: '报错内容',
    //   key: 'errorDetail',
    //   slots: { customRender: 'errorDetail' },
    // },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ].filter((i) => i);
};

const newMappingColumn = (tabKey: string) => {
  const role = 'normal';
  const flagA = tabKey === '1'; // 是否为已处理
  const flagB = ['4', '2'].includes(tabKey); // 处理时间显示
  const flagC = tabKey === '3'; // 退回时间显示
  const flagD = tabKey === '5'; // 上传时间显示
  const flagE = role !== 'normal' && tabKey !== '1'; // 处理人显示
  const flagF =
    (role === 'normal' && tabKey === '3') ||
    (role === 'admin' && ['3', '4', '5'].includes(tabKey)); // 测试人员显示
  return [
    flagB && {
      title: '处理时间',
      dataIndex: 'gmtPublish',
      key: 'gmtPublish',
    },
    flagA && {
      title: '更新日期',
      dataIndex: 'gmtPublish',
      key: 'gmtPublish',
    },
    flagA && {
      title: '首次发布日期',
      dataIndex: 'gmtFailed',
      key: 'gmtFailed',
    },
    flagC && {
      title: '退回时间',
      dataIndex: 'gmtFailed',
      key: 'gmtFailed',
    },
    flagD && {
      title: '上传时间',
      dataIndex: 'gmtFailed',
      key: 'gmtFailed',
    },
    {
      title: '表名',
      dataIndex: 'gmtHandle',
      key: 'gmtHandle',
    },
    {
      title: '表字段名',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: '新增名称',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    !flagA && {
      title: '映射结果',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    !flagA && {
      title: '映射码值',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    flagE && {
      title: '处理人',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    flagF && {
      title: '测试人员',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ].filter((i) => i);
};
export { accountColumn, devExceptionColumn, newMappingColumn };
