$(document).ready(function(){

//Create all albums view

var compiledTmpl = _.template(templates.album);
var tmplString = "";

albums.forEach(function(el) {
  tmplString += compiledTmpl(el);
});

$('.albumContainer').append(tmplString);


//Create all 6 albums

var compiledPhotos = _.template(templates.photos);
var tmplPhotoString = "";

albumOne.forEach(function(el){
  tmplPhotoString += compiledPhotos(el);
});

$('.album1').append(tmplPhotoString);

tmplPhotoString = "";

albumTwo.forEach(function(el){
  tmplPhotoString += compiledPhotos(el);
});

$('.album2').append(tmplPhotoString);

tmplPhotoString = "";

albumThree.forEach(function(el){
  tmplPhotoString += compiledPhotos(el);
});

$('.album3').append(tmplPhotoString);

tmplPhotoString = "";

albumFour.forEach(function(el){
  tmplPhotoString += compiledPhotos(el);
});

$('.album4').append(tmplPhotoString);

tmplPhotoString = "";

albumFive.forEach(function(el){
  tmplPhotoString += compiledPhotos(el);
});

$('.album5').append(tmplPhotoString);

tmplPhotoString = "";

albumSix.forEach(function(el){
  tmplPhotoString += compiledPhotos(el);
});

$('.album6').append(tmplPhotoString);


//Create individual photo view



//Click album and toggle visibility of other albums
$('.albumBox').on('click', 'a', function(event){
  $('.landing').removeClass('activeElement');
  var albumTitle = ('.' + $(this).attr('rel'));
  $('.albumView').addClass('activeElement');
  $(albumTitle).addClass('activeElement');
  //Set button to active.  This piece not working!!
  // $('.nav-stacked').find($('a').attr('rel') === albumTitle).parent().addClass('active');
});

$('.sidebar').on('click', 'a', function(event){
  var albumTitle = ('.' + $(this).attr('rel'));
  $(albumTitle).addClass('activeElement');
  $(albumTitle).siblings().removeClass('activeElement');
});


//Go to individual photo view
$('.displayPhotos').on('click', 'a', function(event){
  var compiledTmpl = _.template(templates.individual);
  var photoDict = {
    albumName: $(this).parent().siblings('h1').text(),
    photoName: $(this).children().children('h3').text(),
    photoURL: $(this).children('img').attr('src')
    };

  $('.individualPhotoViewer').append(compiledTmpl(photoDict));

  $('.individualPhotoViewer').addClass('activeElement');
  $('.albumView').removeClass('activeElement');
});


//Return to album view
$('.individualPhotoViewer').on('click', 'a', function(event){
  var albumTitlePhoto = ('.' + $(this).text().slice(8).toLowerCase().replace(/\s+/g, ''));
  $(albumTitlePhoto).addClass('activeElement');
  $('.albumView').addClass('activeElement');
  $('.individualPhotoViewer').empty();
  $('.individualPhotoViewer').removeClass('activeElement');

})

});
