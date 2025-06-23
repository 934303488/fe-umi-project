export default {
  fileUpload: '/file/upload',
  getMusic: '/music/list',
};

export const TOOLS_API: any = {
  getBearerToken: '/getBearerToken',
  getAppList: '/appList',
  encryptPhone: '/encryptPhone',
  decryptPhone: '/decryptPhone',
  getTesterToken: '/getTesterToken',
  timeLineSync: '/timeLineSync',
  orderImportFileGenerate: '/orderImportFile/generate',
  orderImportFileDownload: '/orderImportFile/download/',
  AIGCRecharge: '/AIGCRecharge',
  AddTeacher: '/addTeacher',
  CustomHandler: '/customHandler',
  upsertMock: '/mock/upsertMock',
  mockList: '/mock/list',
  updateStatus: '/mock/updateStatus',
};

export const ORDER_API = {
  orderLogisticsChange: '/order/logistics-change',
  orderList: '/order/distributor-order/list',
};

export const NODE_API = {
  nodeUpdate: '/node/update',
  nodeTree: '/node/tree',
};

export const CRYPTO_API = {
  encryption: '/encryption/value/get',
  decryption: '/decryption/value/get',
};
