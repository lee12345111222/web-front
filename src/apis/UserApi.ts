import { post } from '../fetch'

// 添加用户
export const addUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/user/addUser', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 修改密码
export const editPassword = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/user/editPassword', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 附属用户注册
export const addOtherUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/user/addOtherUser', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 附属用户删除
export const delOtherUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/user/delOtherUser', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 查询附属用户列表
export const queryPageUserInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/user/queryPageUserInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

