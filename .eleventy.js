module.exports = function(eleventyConfig) {
eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./blog/*.md").sort((a, b) => {
    return b.date - a.date; // ordena del más nuevo al más viejo
    });
});

return {
    dir: {
    input: ".",
    includes: "_includes",
    output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
};
};
