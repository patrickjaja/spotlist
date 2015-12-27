$(document).ready(function() {
    
    
    
    $(".logout-btn").click(function(e) {
        doLogout();
    });
	
   //freebase
   //https://developers.google.com/freebase/v1/search-widget
   //Und das Kochbuch https://developers.google.com/freebase/v1/search-cookbook
//    $(".searchSpot").suggest({filter:'(any type:/film/film type:/tv/tv_series_season)'
//                            ,lang: "de"
//                            ,key : "AIzaSyBSvfUNmcf-SqVzzuV-quLSMz7vPI8drHc"}).bind("fb-select", 
//    function(e, data) {
//        alert(data.name + ", " + data.id + " (" + data['n:type'].name + ")");;
//    });
    
    $(".ttip").tipTip();
    $(".ttip_right").tipTip({defaultPosition:"right"});
    
});



function doLogout() {
	var request=new Remote(
		'endSession',
		[], 
		$(".main-header-nav-item[name=menu_3]")
	);
	request.call();
	$(request).on("success", function(o) {
		self.location.href = "./index.php";
	});	
}
