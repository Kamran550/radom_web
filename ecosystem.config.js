// Bu fayl build ilə birlikdə hər release qovluğuna kopyalanır (server.js-in yanına)
module.exports = {
  apps: [
    {
      name: "radom-next",
      script: "server.js",
      cwd: __dirname,
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Linux-da HOSTNAME adətən maşının adıdır, server ona bind olmasın
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
