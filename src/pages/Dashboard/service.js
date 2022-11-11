// import Cookie from 'js-cookie';
// import {http} from 'fiture';
// import keycloak, { logout } from '@/keycloak';
import {TOOLS_API} from '../../utils/api';
import axios from 'axios'
// import fetch from '@/utils/fetch';


const domainMap = {
  // api: `${process.env.API_URL}/api`,
  // order: "http://172.22.0.178:8081",
  order: "http://stable.test-tools.nt.dev.xiguacity.cn",
};
const gen = domain => params => {
  let url = params;
  let method = 'POST';
  const paramsArray = params.split(' ');

  if (paramsArray.length === 2) {
    [method, url] = paramsArray;
  }

  const apiFunction = (data = {}, options) =>
    axios({
      url: domainMap[domain] + url,
      data,
      method,
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

const api = {};
Object.keys(TOOLS_API).forEach(key => {
  api[key] = gen('order')(TOOLS_API[key]);
});

export { api };
