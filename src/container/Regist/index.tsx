import { memo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { post } from '../../fetch';
import { addUser } from '../../apis/UserApi'



import './index.scss';

import {
  Button,
  Form,
  Input,
  Select,
  message,
  Image
} from 'antd';



const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export const Regist = memo(function () {
  const navgate = useNavigate()
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    try {
      const resData = await addUser(values);
      if (resData) {
        messageApi.open({
          type: 'success',
          content: '注册成功',
        });
        navgate('/login')
      }
    } catch (err) {
      console.error(err)
      messageApi.open({
        type: 'error',
        content: '注册失败',
      });
    }

  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+91</Option>
      </Select>
    </Form.Item>
  );


  return <div className='regist-content'>
    <Image
      preview={false}
      src={require('../../images/login.png')} />
    <div className='login-right'>
      <h2 className='login-title'>Sign up</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input placeholder="Full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input
            placeholder="Phone number"
            addonBefore={prefixSelector}
            style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="postalCode"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your postalCode!', whitespace: true }]}
        >
          <Input placeholder="postalCode" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Create password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repeat password" />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <a className="login-form-forgot" href="/login">
            Have an account ? Log in
          </a>
        </Form.Item>
      </Form>
    </div>

  </div>
})