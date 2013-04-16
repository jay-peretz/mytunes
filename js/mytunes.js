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
				   $("#data-update").show();
		  			});
		});
		$('ul.nav-tabs a[data-toggle="tab"]').on('shown', function (e) {
 			$("#track").html("");
		})		
	}
	function showArtists() {
		var content = '<div class="tab-content">';
		$.each(genres, function (index, value) {
			 content += '<div class="tab-pane row" id="genre'+genres[index].idgenres+'">';
			 if (genres[index].artists) {
			 $.each(genres[index].artists, function (index2, value2) { 
			      content += '<article class="span4 hero-unit">';
				  content += '<h2>'+genres[index].artists[index2].artist+'</h2>';
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
		$("article.album").unbind('click');
		$("article.album").click(function(e) {
			showTracks($(this).attr('data-genreid'),$(this).attr('data-artistid'),$(this).attr('data-albumid'));
		});
	}
	function showAlbums(genreID,artistID) {
		if (genres[genreID].artists[artistID].albums) {
		var content = '<section class="albums span7">';
		$.each( genres[genreID].artists[artistID].albums, function(index,value) {
			content += '<article class="album" data-genreid='+genreID+' data-artistid='+artistID+' data-albumid='+index+'>';
			content += '<img class="tn" src="php/utils/get-album-image.php?id='+index+'" />';	
			content += '<h5>'+value.album+'</h5>';	
			content += '</article>';
		});
		content += '</section>';
		} else {
			content = "";
		}
		return content;
	}
	function showTracks(genreID,artistID,albumID) {
		if (music[genreID].artists[artistID].albums[albumID].tracks) {
			var content = '<section class="tracks span12">';
		    content += '<h3>Tracks&nbsp;<a  data-genreid='+genreID+' data-artistid='+artistID+' data-albumid='+albumID+'  id="plustrack"><i class="icon-plus"></i></a></h3>';
			$.each(music[genreID].artists[artistID].albums[albumID].tracks,function(index,value) {
				content += '<article class=span10  data-trackid=';
				content += index;
				content += '><p contenteditable class="span3 trackname">';	
				content += value.track;			
				content += '</p>';
				content += '<p contenteditable class="span4 trackfile">';	
				content += value.url;			
				content += '</p>';
				content += '<span class="label span1 update-track">Update</span><span class="label label-important span1 delete-track">Delete</span></article>';
			});
			content += "</section>";
			$("#track").html(content);
			$("#plustrack").unbind("click");
			$("#plustrack").click(function() {
				$("#addtrack").modal("show");
				$("#newtrack").attr("data-albumid", $(this).attr('data-albumid'));
				$("#newtrack").attr("data-artistid", $(this).attr('data-artistid'));
				$("#newtrack").attr("data-genreid", $(this).attr('data-genreid'));
				$("#data-update").show();
			});
			$(".update-track").unbind("click");
			$(".update-track").click(function() {
				alert("Update"+$(this).parent().attr("data-trackid"));
			});
			$(".delete-track").unbind("click");
			$(".delete-track").click(function() {
				alert("Delete"+$(this).parent().attr("data-trackid"));
				
			});
		} else {
			$("#track").html("");
		}
	}
	$("#newtrack").click(function() {
		$.ajax({
       type: "POST",
       url: "php/new-track.php",
	   data : { albumid: $("#newtrack").attr("data-albumid"), track: $("#newtrackname").text()}
      }).done(function(data) {
		  var newtrack = {albums_idalbums: $("#newtrack").attr("data-albumid") , idtracks : data , track:$("#newtrackname").text() };
		  music[$("#newtrack").attr("data-genreid")].artists[$("#newtrack").attr("data-artistid")].albums[$("#newtrack").attr("data-albumid")].tracks[data] = newtrack;
		  $("#addtrack").modal("hide");
		 showTracks($("#newtrack").attr("data-genreid"),$("#newtrack").attr("data-artistid"),$("#newtrack").attr("data-albumid"));
	  });
	});
	$("#data-update").hide();
	$("#addtrack").modal("hide");
	var music = getMusic();
	console.log(music);	
	showGenres();  
});