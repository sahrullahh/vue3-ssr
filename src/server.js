const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("../dist/ssr-manifest.json");

const server = express();

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);
const App = require(appPath).default;

server.use("/css", express.static(path.join(__dirname, "../dist/css", "css")));
server.use("/js", express.static(path.join(__dirname, "../dist/js", "js")));
server.use("/img", express.static(path.join(__dirname, "../dist/img", "img")));
server.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "../dist", "favicon.ico"))
);

server.get("*", async (req, res) => {
  const app = createSSRApp(App);
  const appContent = await renderToString(app);

  const html = `
      <html>
        <head>
          <title>Hello World</title>
          <link rel="stylesheet" href="${manifest["app.css"]}" />
        </head>
        <body>
         ${appContent}
        </body>
      </html>
  `;
  res.send(html);
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
