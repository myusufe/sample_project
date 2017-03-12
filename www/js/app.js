function init_page() {

    var tmp = '';
    for (i = 0; i < list_news_url.length; i++) {

        tmp += '<li onclick="display_single_feed(\'' + list_news_url[i][2]  + '\',' +  i + ',\'' + list_news_url[i][3]  + '\');">' + list_news_url[i][1] + '</li>';

    }

    document.getElementById("main_list").innerHTML = tmp;


}


function display_single_feed(url,news_name,url_home) {

    start_progress();

    var list = '';
    $.ajax({
        //url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        url: url,
        type: 'GET',
        dataType: 'xml',
        }).done(function(xml) {

        $.each($("item", xml), function(i, e) {

            var blogNumber = i + 1 + ". ";

            var itemURL = ($(e).find("link"));
            var blogURL = "<a href='" + itemURL.text() + "'>" + itemURL.text() +"</a>";

            var itemTitle = ($(e).find("title"));
            var blogTitle = "<h4>" + blogNumber + itemTitle.text() + "</h4>";
            var pubDate = ($(e).find("pubDate"));
            //var description = ($(e).find("description"));
            
            //if(description.text().length > 80) {
            //    var desc = description.text().substring(0, 80) + "...";
            //}
            
            if(!itemURL.text().indexOf('http')){
                var url_link = itemURL.text();
            }
            else{
                var url_link = url_home + itemURL.text() 
            }
            
            var date = pubDate.text().split('+');
            
            //list += '<li><a href="javascript:display_post(\'' + itemURL.text() + '\')">' + pubDate.text() + '<br> ' + itemTitle.text()  + '<br>' + desc + '</a></li>';
            list += '<li onclick="display_post(\'' + url_link+ '\')">' + date[0] + '<br> ' + itemTitle.text()  + '</li>';

        });
        document.getElementById("news_content").innerHTML = list;
        
        $("#single_feed").attr('data-title', list_news_url[news_name][1]);
        
            $.afui.loadContent("#single_feed", false, false, "fade");
            $('#single_feed').animate({
                scrollTop: 0
            }, 'slow');
            stop_progress();
    });
        
        /*
        success: function (data) {
            if (data.responseData.feed && data.responseData.feed.entries) {
                $.each(data.responseData.feed.entries, function (i, e) {
                    var title = e.title;
                    var link = e.link;
                    list += '<li><a href="javascript:display_post(\'' + link + '\')">';
                    list += title;
                    list += '</a></li>';
                });
            }
            document.getElementById("news_content").innerHTML = list;
            $.afui.loadContent("#single_feed", false, false, "fade");
            $('#single_feed').animate({
                scrollTop: 0
            }, 'slow');
            stop_progress();
        }
*/

}

function display_post(url){
    
    cordova.InAppBrowser.open(url, '_blank', 'location=yes');
    
}

function stop_progress() {
    SpinnerPlugin.activityStop();
}

function go_help() {

    $.afui.loadContent("#help", false, false, "fade");
}

function jump_page(page) {

    $.afui.loadContent("#" + page, false, false, "up");
}

function start_progress() {

    var options = {
        dimBackground: true
    };
    SpinnerPlugin.activityStart("Loading...", options);
}