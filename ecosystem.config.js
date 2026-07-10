module.exports = {
    apps: [
      {
        name: "radom-next",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3000",
        cwd: "/home/radom/htdocs/radomuniversity.pl",
        interpreter: "node",
        env: {
          NODE_ENV: "production",
          PORT: 3000
        }
      }
    ]
  };
  