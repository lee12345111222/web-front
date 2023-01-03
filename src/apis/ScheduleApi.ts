import { post } from '../fetch'

// 新增日程
export const addSchedule = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/addSchedule', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 删除日程
export const delSchedule = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/delSchedule', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });

}

// 修改日程
export const editSchedule = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/editSchedule', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 日程添加人员
export const addScheduleUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/addScheduleUser', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 日程删除人员
export const delScheduleUser = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/delScheduleUser', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}

// 查询日程信息
export const findDynamicInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/findDynamicInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}


// 分页查询当前用户所有日程
export const queryPageScheduleInfo = (params = {}) => {
  return new Promise((resovle, reject) => {
    post('web/schedule/queryPageScheduleInfo', params).then(res => {
      resovle(res);
    }).catch(err => {
      reject(err);
    })
  });
}
