import { post } from '../fetch'

// 查找用户
export const findPartner = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/findPartner', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 发起添加好友申请
export const applyAddPartner = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/applyAddPartner', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });

}

// 同意添加好友申请
export const approveAddPartner = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/approveAddPartner', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 删除好友
export const delPartner = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/delPartner', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 修改好友昵称
export const editPartnerNickname = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/editPartnerNickname', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 分页查询好友列表
export const queryPagePartnerInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/queryPagePartnerInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}


// 查找未审批好友添加申请
export const findPartnerAddInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/partner/findPartnerAddInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}