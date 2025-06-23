import { Button, Card, Col, Form, Input, message, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { api } from '../service';
import { topic } from '@/utils/enum';

const { Option } = Select;

const CustomMessageHandler: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const content = await api.CustomHandler(values);
    console.log(content.data.success);
    if ((content.data.success = true)) {
      message.success('发送成功');
    }
  };

  return (
    <Col span={8}>
      <Card title="自定义事件发送" style={{ width: 400, margin: 10 }}>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: '请输入tocpic' }]}
          >
            <Select placeholder="请输入tocpic" allowClear showSearch>
              {topic.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="消息内容"
            name="message"
            rules={[{ required: true, message: '请输入用户消息内容' }]}
          >
            <TextArea allowClear style={{ height: 200 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default CustomMessageHandler;
