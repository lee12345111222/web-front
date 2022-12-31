import { memo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd-mobile'
import { post } from '../../fetch';

import styles from './index.module.scss';



export const Regist = memo(function () {
  const navgate = useNavigate()
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    post('web/user/addUser', values).then(res => {
      console.log("注册成功", res)
      navgate('/mobile/login')
    })
  };



  return (
    <div className={styles.registSwrap}>
      <h2 className='login-title'>Regist</h2>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            Create Account
          </Button>
        }
        requiredMarkStyle='asterisk'>
        <Form.Item name='nickname' label='nickname' rules={[{ required: true }]}>
          <Input placeholder='nickname' />
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
            type="number"
            placeholder="Phone number"
            style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="postalCode"
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
          <Input type="password" placeholder="Create password" />
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
          <Input type="password" placeholder="Repeat password" />
        </Form.Item>
      </Form>
    </div>
  )
})