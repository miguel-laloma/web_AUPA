module.exports = function(eleventyConfig) {
    // Colección de posts del blog (archivos markdown en blog/*.md)
    eleventyConfig.addCollection("blogPosts", function(collectionApi) {
      return collectionApi.getFilteredByGlob("blog/*.md");
    });
  
    // Colección única de categorías
    eleventyConfig.addCollection("blogCategories", function(collectionApi) {
      let categoriesSet = new Set();
      collectionApi.getFilteredByGlob("blog/*.md").forEach(post => {
        if (post.data.categories) {
          post.data.categories.forEach(cat => categoriesSet.add(cat));
        }
      });
      return [...categoriesSet];
    });
  
    // Filtro simple para fechas en formato dd MMM yyyy (ej: 12 ago 2025)
    eleventyConfig.addFilter("simpleDate", (dateObj) => {
      return new Date(dateObj).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    });

    // Filtro para el año actual
    eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
    });

    // Rutas relativas al documento actual (compatible con GitHub Pages y dominio propio)
    eleventyConfig.addFilter("relative", function(url) {
      if (!url || typeof url !== "string" || !url.startsWith("/")) return url;

      let pagePath = this.page?.url || "/";
      if (pagePath.endsWith("index.html")) {
        pagePath = pagePath.slice(0, -"index.html".length);
      }
      if (!pagePath.endsWith("/")) {
        pagePath += "/";
      }

      const depth = pagePath.split("/").filter(Boolean).length;
      const prefix = depth === 0 ? "." : Array(depth).fill("..").join("/");

      if (url === "/") {
        return depth === 0 ? "./" : prefix + "/";
      }
      return prefix + url;
    });
  
    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("publicaciones/archivos");
    eleventyConfig.addPassthroughCopy("publicaciones/portadas");
    eleventyConfig.addPassthroughCopy(".nojekyll"); // Copiar .nojekyll para GitHub Pages
      
    return {
      dir: {
        input: ".",
        includes: "_includes",
        output: "_site"
      }
    };
  };
  