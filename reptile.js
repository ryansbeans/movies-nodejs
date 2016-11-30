/*
reptile.js
爬虫过滤
*/
var cheerio = require('cheerio');

var html = ''
function filterChapters(html) {
    var $ = cheerio.load(html)

    var chapterArray = $('.mlist li');
    var courseArray = []
    chapterArray.each((index,item) => {
        var list = $(item);
        var movieimg = list.find('img').attr("src")
        var movieTitle = list.find('a').attr("title");
        var datas = {
            title: movieTitle,
            _id: index,
            poster: movieimg
        }
        
    	courseArray.push(datas)
    })
    return courseArray
}


module.exports = filterChapters;




