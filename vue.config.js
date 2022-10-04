module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Punto de venta",
        appId: "com.inventory.app",
        win: {
          "target": [
            "nsis"
          ],
          icon: 'src/register.png',
        },
        publish: ['github'],
      }
    }
  },
  transpileDependencies: ["vuetify"], 
};
