/**
 * 设置
 * @param {*} data 
 */
export const setAppConfig = (data) => {
  return axios({
    method: 'POST',
    url: '/app/config/post',
    data,
  })
}

export const getAppConfig = data => {
  return axios({
    method: 'POST',
    url: '/app/config/query',
    data
  })
}


export const postReport = data => {
  return axios({
    method: 'POST',
    url: '/app/run/report',
    data,
  })
}