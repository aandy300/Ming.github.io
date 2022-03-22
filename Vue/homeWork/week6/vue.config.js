const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: ''
})

// module.exports = {
//   chainWebpack: config => {
//     config.module.rules.delete('eslint')
//   }
// }
