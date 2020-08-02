import { postReport } from '../api/index.js'

export default {
  name: 'report-view',
  data() {
    return {
      formData: {
        times: 2,
        type: 'double',
        sites: [{
          url: 'https://cn.bing.com/',
          type: 'ORIGIN',
          label: '对照组'
        }, {
          url: 'https://cn.bing.com/',
          type: 'EXPERIMENT',
          label: '优化组'
        }]
      }
    }
  },
  methods: {
    submit() {
      postReport({
        ...this.formData
      })
        .then(response => {
          const { data } = response
          console.log(data)
        })
    }
  },
  watch: {
    'formData.type': function(val) {
      if (val === 'single') {
        this.formData.sites = [{
          url: ''
        }]
      } else {
        this.formData.sites = [{
          url: 'https://cn.bing.com/',
          type: 'ORIGIN',
          label: '对照组'
        }, {
          url: 'https://cn.bing.com/',
          type: 'EXPERIMENT',
          label: '优化组'
        }]
      }
    }
  },
  template: `
              <div class="report">
                <el-form width="80px" :model="formData">
                  <el-form-item label="运行次数">
                    <el-input v-model="formData.times">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="运行类型">
                    <el-radio v-model="formData.type" label="double">多个对比</el-radio>
                    <el-radio v-model="formData.type" label="single">单个运行</el-radio>
                  </el-form-item>
                  <template v-if="formData.type === 'double'">
                    <div v-for="site in formData.sites">
                      <el-tag>{{site.label}}</el-tag>
                      <el-form-item label="地址">
                        <el-input v-model="site.url">
                        </el-input>
                      </el-form-item>
                    <div>
                  </template>
                  <template v-else="formData.type === 'single'">
                    <div v-for="site in formData.sites">
                      <el-form-item label="地址">
                        <el-input v-model="site.url">
                        </el-input>
                      </el-form-item>
                    </div>
                  </template>
                  <el-form-item>
                    <el-button type="primary" @click="submit">确定</el-button>
                  </el-form-item>
                </el-form>
              </div>
            `
}