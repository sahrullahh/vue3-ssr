const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const { createHead } = require("unhead");
const { renderSSRHead } = require("@unhead/ssr");

const head = createHead();

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
  head.push({
    title: "Hello World",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex" },
      { name: "title", content: "Blomb!" },
      {
        name: "description",
        content:
          "This is just test for meta tags in mode ssr vue js app, can't you see it?",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vue-serverside.vercel.app" },
      { property: "og:title", content: "Blomb!" },
      {
        property: "og:description",
        content:
          "This is just test for meta tags in mode ssr vue js app, can't you see it?",
      },
      {
        property: "og:image",
        content: "https://metatags.io/images/meta-tags.png",
      },

      { property: "twitter:url", content: "https://vue-serverside.vercel.app" },
      { property: "twitter:title", content: "Blomb!" },
      {
        property: "twitter:description",
        content:
          "This is just test for meta tags in mode ssr vue js app, can't you see it?",
      },
      {
        property: "twitter:image",
        content: "https://metatags.io/images/meta-tags.png",
      },
    ],
  });
  const { headTags, htmlAttrs } = await renderSSRHead(head);

  const html = `
      <html ${htmlAttrs}>
        <head>
        ${headTags}
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
