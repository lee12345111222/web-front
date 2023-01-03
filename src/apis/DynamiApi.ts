import { post } from '../fetch'

// 新增动态
export const addDynamic = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/addDynamic', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 上传动态资源
export const addDynamicResources = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/addDynamicResources', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });

}

// 上传动态内容
export const saveDynamic = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/saveDynamic', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 发布动态
export const releaseDynamic = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/releaseDynamic', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 删除动态
export const delDynamic = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/delDynamic', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 查询指定动态
export const findDynamicInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/findDynamicInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 分页查询动态列表
export const queryPageDynamicInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/dynamic/queryPageDynamicInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}
