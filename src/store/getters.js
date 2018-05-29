const getters = {
  sidebar: state => state.app.sidebar,
  menuList: state => state.app.menuList, // 注意state后面的app别忘了写
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters
