import { post } from '../fetch'

// 新增动态
export const addDiscuss = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/discuss/addDiscuss', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 删除评率
export const delDiscuss = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/discuss/delDiscuss', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });

}

// 分页查询评率列表
export const queryPageDiscussInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/discuss/queryPageDiscussInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}