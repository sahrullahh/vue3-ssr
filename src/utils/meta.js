const meta = {
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
};

module.exports = meta;
