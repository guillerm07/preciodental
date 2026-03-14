/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://preciodental.net",
  generateRobotsTxt: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/api/*", "/buscar"],
  generateIndexSitemap: true,
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/tratamientos") {
      priority = 0.9;
      changefreq = "daily";
    } else if (path.match(/^\/tratamientos\/[^/]+$/)) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.match(/^\/tratamientos\/[^/]+\/[^/]+$/)) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.match(/^\/ciudades\/[^/]+$/)) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/seguros-dentales")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/comparar" || path === "/reportar-precio") {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/sobre-nosotros" || path === "/metodologia") {
      priority = 0.5;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
