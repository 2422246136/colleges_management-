var resources = [
    {name: 'Vue', path: '/colleges_management/static/vue.min.js'},
    {name: 'VueRouter', path: '/colleges_management/static/vue-router.min.js'},
    {name: 'Vuex', path: '/colleges_management/static/vuex.min.js'},
    {name: 'iview', path: '/colleges_management/static/iview.min.js', css: '/colleges_management/static/iview.css'},
    {name: 'axios', path: '/colleges_management/static/axios.min.js'},
    {name: 'moment', path: '/colleges_management/static/moment.min.js'},
];
resources.forEach(function (val) {
    if (typeof window[val.name] === 'undefined') {
        document.write(unescape("%3Cscript src='" + val.path + "' type='text/javascript'%3E%3C/script%3E"));
        if (val.css) {
            loadStyle(val.css);
        }
    }
});


function loadStyle(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}
