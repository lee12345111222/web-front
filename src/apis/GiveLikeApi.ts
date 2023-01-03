import { post } from '../fetch'

// 新增点赞
export const addAppreciate = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/appreciate/addAppreciate', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 分页查询点赞列表
export const queryPageByDynamicId = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/appreciate/queryPageByDynamicId', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}