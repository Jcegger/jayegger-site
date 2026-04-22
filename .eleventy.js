const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/scripts.js": "scripts.js" });

  const md = markdownIt({ html: true, linkify: true, breaks: false }).enable(["table"]);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(dateObj);
  });

  eleventyConfig.addFilter("rfc822", (dateObj) => {
    return new Date(dateObj).toUTCString();
  });

  eleventyConfig.addFilter("absolute", (path, siteUrl) => {
    if (!siteUrl) return path;
    const base = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
    return `${base}${path}`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
    pathPrefix: "/"
  };
};
