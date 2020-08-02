import ConfigComponent from './config/index.js'
import ReportComponent from './report/index.js'

Vue.component('config-view', ConfigComponent)
Vue.component('report-view', ReportComponent)
export const createApp = () => {
  new Vue({
    el: '#app',
    component: {
      'config-view': ConfigComponent,
      'report-view': ReportComponent,
    },
    data() {
      return {
        currMenuIndex: 1,
        menus: [
          {
            index: 1,
            name: 'config',
            label: '配置',
            component: 'config-view'
          }, {
            index: 2,
            name: 'report',
            label: '运行',
            component: 'report-view'
          }
        ]
      }
    },
    computed: {
      currentView() {
        return this.menus.find(i => i.index === this.currMenuIndex).component
      }
    },
    methods: {
      selectMenu(index) {
        this.currMenuIndex = index
      }
    },
    template: `
                <el-container class="main" style="width:1080px;height:720px;">
                  <el-side style="width:200px;border-right:solid 1px #e6e6e6;" class="menu-left">
                    <el-menu
                        :default-active="currMenuIndex"
                        :index="currMenuIndex"
                        style="border-right:0;"
                        @select="selectMenu"
                        >
                      <el-menu-item 
                        v-for="menuItem of menus"
                        :key="menuItem.index"
                        :index="menuItem.index"
                        >
                        <h4 style="text-align:center;">{{menuItem.label}}</h4>
                      </el-menu-item>
                    </el-menu>
                  </el-side>
                  <el-main>
                    <component :is="currentView"/>
                  </el-main>
                </el-container>
              `
  })
}
createApp();

export default {}

