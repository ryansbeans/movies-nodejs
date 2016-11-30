//加载express 模块
var express = require('express')
//
var bodyParser = require('body-parser')
var Promise = require('Promise')
var cheerio = require('cheerio');
var Reptile = require("./reptile");
var http = require('http')
var path = require('path')
//设置端口 ,process全局变量 
var port = process.env.PROT || 3000
// 将实例赋给变量app
var app = express()


app.set('views', './views/pages')

//请求样式，静态资源获取
app.use(express.static(path.join(__dirname,'bower_components')));
//渲染的index地址
app.set('views',path.join(__dirname,'views/pages'));
//设置默认模板引擎
app.set('view engine', 'jade')

app.use(require('body-parser').urlencoded({extended: true}))
//端口
app.listen(port)

console.log('端口：' + port + ' , 启动成功......')

var url = 'http://www.piaov.com/list/1.html';
http.get(url,function(res){
        html = ''
        res.on('data', function(data){
            html += data
        })
        var indexData
        res.on('end', function(){
        	indexData = {
        		title: 'kuaipk 首页',
				small:'我是首页2',
				movies: Reptile(html)
        	}
           // console.log(indexData)
            app.get('/', function(req, res){
				res.render('index', indexData)
			})
        })
        
}).on('error', function(e){
        console.log('获取课程数据出错！')
})

//	首頁


// 	詳情
app.get('/movie/:id', function(req, res){
	res.render('detail', {
		title: 'kuaipk 詳情頁',
		small:'我是詳情頁',
		movie: {
			doctor: '何塞·帕迪里亚',
			country: '美国',
			title:'机械战警',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
		}
	})
})

//	列表
app.get('/admin/movie', function(req, res){
	res.render('list', {
		title: 'kuaipk 列表頁',
		small:'我是列表頁',
		movies: {
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

//	後台
app.get('/admin/list', function(req, res){
	res.render('admin', {
		title: 'kuaipk 後台管理',
		small:'我是後台管理',
		movie:{
			doctor: '何塞·帕迪里亚1',
			country: '美国',
			title:'机械战警',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
		}
	})
})

