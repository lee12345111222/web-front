import { post } from '../fetch'

// 新增群组
export const addGroup = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/addGroup', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 删除群组
export const delGroup = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/delGroup', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });

}

// 修改群组名称
export const editGroupName = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/editGroupName', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 修改群组管理员
export const editGroupAdmin = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/editGroupAdmin', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 群组新增人员
export const addUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/addUser', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 群组删除人员
export const delUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/delUser?', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}


// 查询群组信息
export const findGroupInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/findGroupInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 分页查询当前用户群组列表
export const queryPageGroupInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/group/queryPageGroupInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

