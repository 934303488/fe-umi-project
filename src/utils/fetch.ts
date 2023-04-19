import axios from 'axios';
import { any } from 'prop-types';
const baseUrl = process.env.HOST;
function fetch(
  method: string,
  data = {},
  url: string,
  options: any,
  // ,callback: (arg0: any) => any
) {
  // axios({
  //   url: baseUrl + api,
  //   method: 'post',
  //   params: params,
  //   headers: {
  //     // token:'809321849084738'
  //   },
  // })

  const http: any = axios.create({
    url,
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

  http.interceptors.response.use(
    (response: any) => {
      // 处理正常响应...
      return response;
    },
    (error: any) => {
      if (error && error.response && error.response.status === 500) {
        alert('服务器异常，请稍候再试!');
      }

      return Promise.reject(error);
    },
  );
  // .then((res) => {
  //   console.log('成功'+res.data.body);
  //   let response = null;
  //   if (res.status === 200) {
  //     response = res.data;
  //     // callback && callback(response);
  //     return http;
  //   }
  //   else{
  //     alert(res.data)
  //   }
  // })
  // .catch((err) => {
  //   console.log('失败', err);
  // })
  // .then(() => {
  //   // 总会执行
  // });
  return http;
}
export default fetch;
