import { memo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd-mobile'

import { post } from '../../fetch';
import { setUsers } from '../../container/counter/userReducer'

import styles from './index.module.scss';

export const MobileLogin = memo(function (props) {
  const navgate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    post('web/login/login', values).then(res => {
      localStorage.setItem("userInfo", JSON.stringify(res))
      dispatch(setUsers(res))
      navgate('/home')
    }).catch(err => {
      console.log("登录失败");
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const goToRegist = () => {
    navgate('/mobile/regist')
  }
  return (
    <div className={styles.loginSwrap}>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            SIGN IN
          </Button>
        }
        requiredMarkStyle='asterisk'>
        <Form.Item name='username' label='姓名' rules={[{ required: true }]}>
          <Input placeholder='phone/emial' />
        </Form.Item>
        <Form.Item name='password' label='密码' rules={[{ required: true }]}>
          <Input placeholder='password' type="password" />
        </Form.Item>
      </Form>

      <div className={styles.forgot}>Forget password</div>

      <div className={styles.loginFooter}>
        <div className={styles.or}>---------OR---------</div>
        <Button onClick={goToRegist} block color='primary' size='large'>
          CREATE AN ACCOUNT
        </Button>
      </div>
    </div>
  )

})
