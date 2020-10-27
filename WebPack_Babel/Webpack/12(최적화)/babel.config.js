module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '79',
          ie: '11'
      },

      // 폴리필
      useBuiltIns: 'usage',
      corejs: {
        version: 2
      }
    }]
  ]
}