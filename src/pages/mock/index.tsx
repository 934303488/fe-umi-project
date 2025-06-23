import { api } from './service';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Select,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from '@ant-design/icons';

// 枚举类型定义
enum Status {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

const { Option } = Select;

// 接口类型定义
interface MockItem {
  id: string;
  appName: string;
  api: string;
  mockResponse: string;
  status: Status;
  createAt: string;
  updateAt: string;
}

// 搜索表单类型
interface SearchForm {
  appName?: string;
  path?: string;
  response?: string;
}

const mockService: React.FC = () => {
  const [appList, setAppList] = useState<[]>([]);

  // 搜索表单状态
  const [searchForm, setSearchForm] = useState<SearchForm>({});
  // 表格数据状态
  const [data, setData] = useState<MockItem[]>([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [currentRecord, setCurrentRecord] = useState<MockItem | null>(null);
  const [form] = Form.useForm<SearchForm>();

  // mockList
  const fetchMockList = async (params: SearchForm = {}) => {
    setLoading(true);
    try {
      const content = await api.mockList(params);
      setTimeout(() => {
        setData(content.data.body);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('获取数据失败:', error);
      setLoading(false);
    }
  };

  //appList
  const fetchAppList = async () => {
    setLoading(true);
    try {
      const content = await api.getAppList();
      setTimeout(() => {
        setAppList(content.data.body);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('获取数据失败:', error);
      setLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    fetchMockList();
    fetchAppList();
  }, []);

  // 处理搜索
  const handleSearch = () => {
    fetchMockList(searchForm);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchForm({});
    fetchMockList();
  };

  // 调用更新接口
  const callUpsertMock = async (values: SearchForm) => {
    try {
      const res = await api.upsertMock(values);
      return true;
    } catch (error) {
      message.error('操作失败');
      return false;
    }
  };

  // 启用/禁用操作
  const handleToggleStatus = async (record: MockItem) => {
    setLoading(true);
    try {
      await api.updateStatus({
        appName: record.appName,
        path: record.api,
        response: record.mockResponse,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('获取数据失败:', error);
      setLoading(false);
    }
    fetchMockList();
  };

  // 打开编辑模态框
  const handleEdit = (record: MockItem) => {
    setModalType('edit');
    setCurrentRecord(record);
    form.setFieldsValue({
      appName: record.appName,
      path: record.api,
      response: record.mockResponse,
    });
    setModalVisible(true);
  };

  // 打开新增模态框
  const handleAdd = () => {
    setModalType('add');
    form.resetFields();
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const success = await callUpsertMock(values);

      if (success) {
        if (modalType === 'add') {
          message.success('新增接口成功');
        } else {
          message.success('更新接口成功');
        }
        setModalVisible(false);
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
    fetchMockList();
  };

  // 表格列配置
  const columns: ColumnsType<MockItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '服务名',
      dataIndex: 'appName',
      key: 'appName',
    },
    {
      title: '接口',
      dataIndex: 'api',
      key: 'api',
    },
    {
      title: 'Mock参数',
      dataIndex: 'mockResponse',
      key: 'mockResponse',
      render: (text) => <span className="code-block">{text}</span>,
      width: 400,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === Status.ENABLED ? 'green' : 'red'}>
          {status === Status.ENABLED ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '修改时间',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {record.status === Status.DISABLED && (
            <Button type="link" onClick={() => handleToggleStatus(record)}>
              启用
            </Button>
          )}
          {record.status === Status.ENABLED && (
            <Button
              type="link"
              danger
              onClick={() => handleToggleStatus(record)}
            >
              禁用
            </Button>
          )}
          {
            <Button
              style={{ marginLeft: '1px' }}
              type="link"
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
          }
        </Space>
      ),
    },
  ];

  return (
    <div className="mock-management-page">
      {/* 搜索表单 */}
      <div
        className="search-form"
        style={{ marginBottom: 24, padding: 24, background: '#fff' }}
      >
        <Space>
          <Select
            placeholder="服务名"
            value={searchForm.appName}
            onChange={(e) => setSearchForm({ ...searchForm, appName: e })}
            style={{ width: 180 }}
            showSearch
            allowClear
          >
            {appList.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="接口"
            value={searchForm.path}
            onChange={(e) =>
              setSearchForm({ ...searchForm, path: e.target.value.trim() })
            }
            style={{ width: 200 }}
          />

          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            搜索
          </Button>

          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ marginInlineEnd: 16 }}
          >
            新增接口
          </Button>
        </Space>
      </div>
      {/* 数据表格 */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1500 }}
      />

      {/* 新增/编辑模态框 */}
      <Modal
        title={modalType === 'add' ? '新增接口' : '编辑接口'}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            serviceName: '',
            api: '',
            mockParams: '',
          }}
        >
          <Form.Item
            name="appName"
            label="服务名"
            rules={[{ required: true, message: '请输入服务名' }]}
          >
            <Select placeholder="请选择服务" showSearch>
              {appList.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="path"
            label="接口"
            rules={[{ required: true, message: '请输入接口路径' }]}
          >
            <Input placeholder="例如: /api/v1/users" />
          </Form.Item>

          <Form.Item
            name="response"
            label="Mock参数"
            rules={[{ required: true, message: '请输入Mock参数' }]}
          >
            <Input.TextArea placeholder="请输入完整的参数" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default mockService;
