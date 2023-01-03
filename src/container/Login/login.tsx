import { memo, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Checkbox, Form, Input, Image, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'

import { commonLogin } from '../../apis/SystemApi'

import { post } from '../../fetch';
import { setUsers } from '../counter/userReducer'

import './login.scss';
import { store } from '../../app/store';

export const Login = memo(function (props) {
  const navgate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  //const [messageApi] = message.useMessage();
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    const code = searchParams.get('code')
    // console.log("code", code)
    // if (code === '20006') {
    //   messageApi.open({
    //     type: 'success',
    //     content: '登录已过期，请重新登录',
    //   });
    // }
  }, [])

  const onFinish = async (values: any) => {
    try {
      const resData = await commonLogin(values)
      console.log("9999", resData)
      localStorage.setItem("userInfo", JSON.stringify(resData))
      dispatch(setUsers(resData))
      navgate('/home')
    } catch (error) {
      console.log("errr", error);
    }
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