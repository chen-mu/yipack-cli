module.exports = `
// 自动导入路由（勿动）------------------------------------------------------
let R = {
    pages: [],
    views: [],
    pageImport: {},
    viewImport: {}
};
R.pageImport = require.context('@src/pages/<%= camelCaseName %>', true, /routePage\\.js$/);
R.pageImport.keys().map((path) => {
    R.pages.push(R.pageImport(path).default || R.pageImport(path));
});
R.viewImport = require.context('@src/pages/<%= camelCaseName %>', true, /routeView\\.js$/);
R.viewImport.keys().map((path) => {
    R.views.push(R.viewImport(path).default || R.viewImport(path));
});
// 自动导入路由（勿动）------------------------------------------------------

export default {
    path: '/<%= kebabCaseName %>',
    component: () => import("@src/layout/default/index.vue"),
    children: [
        {
            path: '/',
            component: () => import('@src/pages/<%= camelCaseName %>/index.vue'),
            children: [...R.views]
        },
        ...R.pages
    ]
};`;
