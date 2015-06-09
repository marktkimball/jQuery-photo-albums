$(document).ready(function(){

page.init();

});

var page = {
  init: function(arguments){
    page.initStyling();
    page.initEvents();
  },

  initStyling: function(arguments){
    //Create landing page
    page.loadAndPlaceTemplate("album", albums, $('.albumContainer'));

    //Create all 6 albums
    page.loadAndPlaceTemplate("photos", album1, $('.album1'));
    page.loadAndPlaceTemplate("photos", album2, $('.album2'));
    page.loadAndPlaceTemplate("photos", album3, $('.album3'));
    page.loadAndPlaceTemplate("photos", album4, $('.album4'));
    page.loadAndPlaceTemplate("photos", album5, $('.album5'));
    page.loadAndPlaceTemplate("photos", album6, $('.album6'));
  },

  initEvents: function(arguments){
    $('.albumBox').on('click', 'a', page.loadAlbumClick);
    $('.nav').on('click', 'a', page.sidebarClick);
    $('.sidebar').on('click', '.btn', page.homeButtonClick);
    $('.displayPhotos').on('click', 'a', page.individualPhotoClick);
    $('.individualPhotoViewer').on('click', '.btn', page.returnToAlbumClick);
    $('.individualPhotoViewer').on('click', '.glyphicon', page.clickLeftRight);
  },

  //Function to load and place templates
  loadAndPlaceTemplate: function(tmplName, data, $target){
    var compiledTmpl = _.template(templates[tmplName]);
    var tmplString = "";
    data.forEach(function(el){
      tmplString += compiledTmpl(el);
    })
    $target.append(tmplString);
  },

  //Click and view album
  loadAlbumClick: function(event){
    $('.landing').removeClass('activeElement');
    var albumTitle = ('.' + $(this).attr('rel'));
    $('.albumView').addClass('activeElement');
    $(albumTitle).addClass('activeElement');
  },

  //Toggle album visibility on click
  sidebarClick: function(event){
    var albumTitle = ('.' + $(this).attr('rel'));
    $(albumTitle).addClass('activeElement');
    $(albumTitle).siblings().removeClass('activeElement');
  },

  //Home buttom funcationality
  homeButtonClick: function(event){
    $(this).parent().siblings().children().removeClass('activeElement');
    $('.albumView').removeClass('activeElement');
    $('.landing').addClass('activeElement');

  },

  //Go to individual photo view
  individualPhotoClick: function(event){
    var compiledTmpl = _.template(templates.individual);
    var photoDict = {
      albumName: $(this).parent().siblings('h1').text(),
      photoName: $(this).children().children('h3').text(),
      relNum: $(this).children('img').attr('rel'),
      photoURL: $(this).children('img').attr('src')
      };

    $('.individualPhotoViewer').append(compiledTmpl(photoDict));
    $('.individualPhotoViewer').addClass('activeElement');
    $('.albumView').removeClass('activeElement');
  },

  //Return to album view
  returnToAlbumClick: function(event){
    var albumTitlePhoto = ('.' + $(this).text().slice(8).toLowerCase().replace(/\s+/g, ''));
    $(albumTitlePhoto).addClass('activeElement');
    $('.albumView').addClass('activeElement');
    $('.individualPhotoViewer').empty();
    $('.individualPhotoViewer').removeClass('activeElement');
  },

  //Left & right arrow clicks
  clickLeftRight: function(event){
    var albumName = ('.' + $(this).parent().siblings().children('a').text().slice(8).toLowerCase().replace(/\s+/g, ''));
    var countPhotos = $(albumName).children('div').length;
    var currentRelNum = $(this).siblings('img').attr('rel');

    if($(this).hasClass('glyphicon-triangle-right') && currentRelNum === '5'){
      var compiledTmpl = _.template(templates.individual);
      var photoDict = {
        albumName: $(albumName).children('h1').text(),
        photoName: $(albumName).children('div').eq(0).children().children().children('h3').text(),
        relNum: $(albumName).children('div').eq(0).children().children('img').attr('rel'),
        photoURL: $(albumName).children('div').eq(0).children().children('img').attr('src')
        };

      $('.individualPhotoViewer').empty();
      $('.individualPhotoViewer').append(compiledTmpl(photoDict));

    }else if($(this).hasClass('glyphicon-triangle-left')){
      currentRelNum--
      var compiledTmpl = _.template(templates.individual);
      var photoDict = {
          albumName: $(albumName).children('h1').text(),
          photoName: $(albumName).children('div').eq(currentRelNum).children().children().children('h3').text(),
          relNum: $(albumName).children('div').eq(currentRelNum).children().children('img').attr('rel'),
          photoURL: $(albumName).children('div').eq(currentRelNum).children().children('img').attr('src')
      }

      $('.individualPhotoViewer').empty();
      $('.individualPhotoViewer').append(compiledTmpl(photoDict));

    }else{
      currentRelNum++
      var compiledTmpl = _.template(templates.individual);
      var photoDict = {
          albumName: $(albumName).children('h1').text(),
          photoName: $(albumName).children('div').eq(currentRelNum).children().children().children('h3').text(),
          relNum: $(albumName).children('div').eq(currentRelNum).children().children('img').attr('rel'),
          photoURL: $(albumName).children('div').eq(currentRelNum).children().children('img').attr('src')
      }
      $('.individualPhotoViewer').empty();
      $('.individualPhotoViewer').append(compiledTmpl(photoDict));
    }
  }
};
