import { memo } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Image } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import './login.scss';

export const Login = memo(function () {
  const navgate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const goToRegist = () => {
    navgate('/regist')
  }
  return <div className='login-content'>
    <Image
      preview={false}
      src={require('../../images/login.png')} />
    <div className='login-right'>
      <h2 className='login-title'>Sign In</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-btn">
            SIGN IN
          </Button>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>

          <Button onClick={goToRegist} className="regist-btn">
            CREATE AN ACCOUNT
          </Button>
        </Form.Item>
      </Form>
    </div>

  </div>
})