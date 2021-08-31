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

export { accountColumn, devExceptionColumn };
