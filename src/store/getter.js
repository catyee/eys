
const getters = {
  token: state => state.user ? state.user.token : '',
  name: state => state.user ? state.user.name : '',
  nickName: state => state.user ? state.user.nickName : '',
  userId: state => state.user ? state.user.userId : '',
  roles: state => state.user ? state.user.roles : '',
  permission_routes: state => state.permission.routes,
  sidebarRouters: state => state.permission.sidebarRouters
  // menus: state => state.user.menus
  // indexPath: state => state.user.indexPath
}
export default getters
