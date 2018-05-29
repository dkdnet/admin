import request from '@/utils/request'

export function getMenuList(id) {
  id = id || ''
  return request({
    url: '/api/menu_list',
    method: 'post',
    data: {
      id
    }
  })
}
