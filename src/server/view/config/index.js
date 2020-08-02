import { getAppConfig, setAppConfig } from '../api/index.js'

export default {
  name: 'config',
  data() {
    return {
      formData: {
        chromePath: '',
        region: '',
        type: ''
      },
      chrome: '',
    }
  },
  created() {
    getAppConfig({

    }).then(response => {
      const { data } = response
      console.log(data)
    })
  },
  methods: {
    submit() {
      console.log(this.formData.chromePath)
      setAppConfig({
        chromePath: this.formData.chromePath
      }).then(response => {
        const { data } = response
        console.log(data)
      })
    }
  },
  template: `
              <div class="confire-view">
                <el-form width="80px" :model="formData">
                  <el-form-item label="chrome 浏览器安装路径">
                    <el-input v-model="formData.chromePath">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submit">确定</el-button>
                  </el-form-item>
                </el-form>
              </div>
            `

}