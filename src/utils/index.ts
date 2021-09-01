const createPaginationProps = (
  current = 1,
  total,
  showQuickJumper = true,
  pageSize = 10
) => {
  return {
    current, // 当前页数
    showQuickJumper, // 是否显示快速跳转工具
    total, // 数据总数
    pageSize, // 每页条数 默认20
    showTotal: () => `共 ${total} 条`,
    showSizeChanger: false,
  };
};

const newMapDisplay = (tabKey: string) => {
  const role = localStorage.getItem('role');
  const flagA = tabKey === '1'; // 是否为已处理
  const flagB = ['4', '2'].includes(tabKey); // 处理时间显示
  const flagC = tabKey === '3'; // 退回时间显示
  const flagD = tabKey === '5'; // 上传时间显示
  const flagE = role !== 'normal' && tabKey !== '1'; // 处理人显示
  const flagF =
    (role === 'normal' && tabKey === '3') ||
    (role === 'admin' && ['3', '4', '5'].includes(tabKey)); // 测试人员显示
  const dynamicDisplay = {
    flagA,
    flagB,
    flagC,
    flagD,
    flagE,
    flagF,
  };
  return dynamicDisplay;
};

export { newMapDisplay, createPaginationProps };
