(function ( $ ) {
 
    var currentTab = '';
    $.fn.createResponsivetabs = function( options ) {
 
        // Set default options.
        var settings = $.extend({
        }, options );
        
        $("#tabs li").removeClass("current");
        $("#content > div   ").hide();

        var tabContentList = [], idTemplate = 'tab';
        $("#content").on("createtabs","p",function(){
            var length = tabContentList.length;

            $("#tabs").append("<li><a class='tab' id='" +
                idTemplate+length+ "' href='#'>" + $(this).prev().text() + "</li>");

            $(this).parent().attr('id',idTemplate+length+'_content');
            tabContentList.push($(this).text());
        })
        $("p").trigger("createtabs");
        
        if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {

            // find the first tab    
            var firsttab = $("#tabs li:first-child");
            firsttab.addClass("current");
            var firsttabid = $(firsttab).find("a.tab").attr("id");
            $("#" + firsttabid + "_content").show();
            currentTab = firsttabid;
        }
        
        var selectNode = $('<select>').attr('id','respSelect').appendTo('#selectList');
        $('#tabs li').each(function(){
            selectNode.append($("<option>").attr('value',$(this).find('a').attr('id')).text($(this).text()));
        });

        $("#respSelect").change(function(val){
            currentTab = $(this).val();
            var contentId = "#" +currentTab+'_content';
            $("#content > div").hide();
            $('#wrapper > #content > '+contentId).show();
        });

        $('#tabs').on('click', ' a.tab', function() {
                // Get the tab id
                currentTab = $(this).attr("id");
                var contentname =  currentTab + "_content";

                // hide other tabs
                $("#content > div").hide();
                $("#tabs li").removeClass("current");

                // show current tab
                $("#" + contentname).show();
                $(this).parent().addClass("current");
        });


        return this;
    };

    
    adjustTabs($(window).height(),$(window).width());
    $( window ).resize(function() {
        adjustTabs($(this).height(),$(this).width());
    });

    function adjustTabs(height, width){
        if(height < 600 && width < 360){
            $("#selectList").show();
            $("#wrapper > #tab-nav-list").hide();
            $("#respSelect").val(currentTab);
        }else{
            $("#selectList").hide();
            $("#wrapper #tab-nav-list").show();
            $("#tabs li").removeClass("current");
            $("#"+currentTab).parent().addClass("current");
        }
    }
 
}( jQuery ));