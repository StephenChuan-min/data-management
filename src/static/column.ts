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

const otherColumn: any[] = [];

export { accountColumn, otherColumn };
