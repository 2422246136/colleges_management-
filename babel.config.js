const plugins = [
    // view-design 按需加载
    // ["import", {
    //     "libraryName": "view-design",
    //     "libraryDirectory": "src/components"
    // }]
];

// 生产环境移除console
if(process.env.NODE_ENV === 'production') {
    plugins.push(["transform-remove-console", { "exclude": [ "error", "warn"] }])
}
module.exports = {
    "presets": [
        [
            "@vue/app",
            { "useBuiltIns": "usage" }    // usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加。
        ]
    ],
    "plugins": plugins
};
