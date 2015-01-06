var fis = module.exports = require('fis');

fis.cli.name = 'fis-nos';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    modules: {
        parser: {
            less: 'less',
            tmpl: 'utc'
        },
        postprocessor: {
            js: "jswrapper, require-async",
            aspx: "require-async",
			html: "require-async",
			cshtml: "require-async"
        },
		prepackager:['bom'],
        postpackager : ['autoload', 'simple'],
        lint : {
            js : 'jshint'
        }
    },
    roadmap: {
        ext: {
            less: 'css'
        },
        path : [
			{
                reg : "README.md",
                release : false
            },
            {
                //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/js\/modules\/([^\/]+)\/\1\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id为文件夹名
                id : '$1',
            },
            {
                //modules目录下的其他脚本文件
                reg : /^\/js\/modules\/(.*)\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id是去掉modules和.js后缀中间的部分
                id : '$1',
            }
        ]
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        lint : {
            jshint : {
                camelcase : true,
                curly : true,
                eqeqeq : true,
                forin : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                noempty : true,
                node : true
            }
        }
    }
});