const createPaginationProps = (
  current = 1,
  total,
  showQuickJumper = true,
  pageSize = 10
) => {
  return {
    current,
    showQuickJumper,
    total,
    pageSize,
    showTotal: () => `共 ${total} 条`,
    showSizeChanger: false,
  };
};
export default createPaginationProps;
