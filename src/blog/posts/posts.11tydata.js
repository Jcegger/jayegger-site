module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (data.draft && process.env.ELEVENTY_ENV !== "drafts") return false;
      return `/blog/${data.page.fileSlug}/`;
    },
    eleventyExcludeFromCollections: (data) => {
      return Boolean(data.draft) && process.env.ELEVENTY_ENV !== "drafts";
    },
  },
};
