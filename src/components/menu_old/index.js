import ElMenu from './src/menu'

/* istanbul ignore next */
ElMenu.install = (Vue) => {
  Vue.component(ElMenu.name, ElMenu)
}

export default ElMenu
