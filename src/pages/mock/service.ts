import { TOOLS_API } from '../../utils/api';
import http from '@/utils/axios';

const domainMap: any = {
  // api: `${process.env.API_URL}/api`,
  // api: "http://localhost:8081",
  api: 'http://stable.test-tools.nt.dev.xiguacity.cn',
};
const gen = (domain: any) => (params: any) => {
  let url = params;
  let method = 'POST';
  const paramsArray = params.split(' ');

  if (paramsArray.length === 2) {
    [method, url] = paramsArray;
  }

  const apiFunction = (data: any = {}, options: any) =>
    http({
      url: !Object.keys(data).includes('suffix')
        ? domainMap[domain] + url
        : domainMap[domain] + url + data.suffix,
      responseType: !Object.keys(data).includes('responseType')
        ? 'json'
        : data.responseType,
      data,
      method: data.method ? data.method : method,
      // onUnauthorized: logout,
      filterEmptyParam: false,
      headers: {
        // Authorization: `Bearer ${keycloak.token}`,
        // _EMPLOYEE_USERNAME: Cookie.get('username'),
        // 'X-NT-App-Meta': JSON.stringify(window.APP_METADATA || {}),
      },
      ...options,
    });
  // 方便权限组件获接口的地址；
  apiFunction.url = url;

  return apiFunction;
};

const api: any = {};
Object.keys(TOOLS_API).forEach((key) => {
  api[key] = gen('api')(TOOLS_API[key]);
});

export { api, domainMap };
