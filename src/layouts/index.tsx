import React, { useState, useEffect } from 'react';
import { history } from 'umi'; // 引入 umi 路由实例
import ProLayout from '@ant-design/pro-layout';

export default (props: any) => {
  const [pathname, setPathname] = useState(history.location.pathname);

  // 监听路由变化
  useEffect(() => {
    const unlisten = history.listen((location) => {
      setPathname(location.pathname);
    });
    return () => unlisten(); // 卸载监听
  }, []);

  return (
    <ProLayout
      location={{ pathname }} // 关键：动态注入当前路径
      menuItemRender={(item: any) => (
        <a
          onClick={() => {
            history.push(item.path);
          }}
        >
          {item.name}
        </a>
      )}
      {...props}
    >
      {props.children}
    </ProLayout>
  );
};
