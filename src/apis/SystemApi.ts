import { post } from '../fetch'

// 退出
const loginOut = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/login/logout', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 普通用户登录
export const commonLogin = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/login/login', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

const auxiliaryLogin = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/login/loginSwich', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

export { loginOut, auxiliaryLogin }