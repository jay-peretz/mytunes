$(document).ready(function() {
	function getMusic() {
		$.ajax({
       type: "GET",
       url: "php/get-music.php",
       datatype: "json",
       async: false
      }).done(function(data) {
		   genres = $.parseJSON(data);
	  });
	  return genres;
	};
	function showGenres() {
		var content = '<div id="genredisplay" class="tabbable">'; 
        content += '<ul class="nav nav-tabs">';
		$.each(genres, function (index,value) {
			content += '<li><a href="#genre'+genres[index].idgenres+'" data-toggle="tab">'+genres[index].genre+'</a></li>';
		});  
		content += '<li><a href="#addgenre" data-toggle="modal"><i class="icon-plus"></i></a></li>'; 
        content += '</ul>';  		     
		content += '</div>';
		$("#genre").html(content);
		$("#genredisplay ul li:first").addClass("active");
		showArtists();
		$("#newgenre").unbind("click");
		$("#newgenre").click(function() {
		$.ajax({
		   type: "POST",
		   data: {genre:$("#newgenrename").text()},
		   url: "php/new-genre.php"
		  		}).done(function(data) {
				   music = getMusic();
				   showGenres();
				   $("#addgenre").modal("hide");
		  			});
		});
	}
	function showArtists() {
		var content = '<div class="tab-content">';
		$.each(genres, function (index, value) {
			 content += '<div class="tab-pane row" id="genre'+genres[index].idgenres+'">';
			 if (genres[index].artists) {
			 $.each(genres[index].artists, function (index2, value2) { 
			      content += '<article class="span4 hero-unit">';
				  content += '<h4>'+genres[index].artists[index2].artist+'</h4>';
				  content += '<img src="php/utils/get-artist-image.php?id='+index2+'" />';
				  content += '</article>';
				  content += showAlbums(index,index2);
			 });
			 }
    	     content += '</div>';
		});
  		content += '</div>';
		$("#genredisplay").append(content);
		$("#genredisplay div.tab-content div.tab-pane:first").addClass("active");
	}
	function showAlbums(genreID,artistID) {
		var content = '<section class="albums span7">';
		$.each( genres[genreID].artists[artistID].albums, function(index,value) {
			content += '<article class="album">';
			content += '<img class="tn" src="php/utils/get-album-image.php?id='+index+'" />';	
			content += '<h5>'+value.album+'</h5>';	
			content += '</article>';
		});
		content += '</section>';
		return content;
	}
	var music = getMusic();
	console.log(music);	
	showGenres();  
});