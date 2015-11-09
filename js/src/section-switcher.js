$( 'document' ).ready( function(){

// My uber fancy section switching technology!
var switchSection = function( section ) {
  var clickedLink = document.getElementById( section + 'Link' );

  if ( clickedLink.className == 'current-page-item' ) {
    return false;
  } else {
    var currentLink = document.getElementsByClassName( 'current-page-item' ),
      currentSection = document.getElementsByClassName( 'list--current' );

    currentLink[0].className = '';
    clickedLink.className = 'current-page-item';
    currentSection[0].className = 'list';
    document.getElementById( section + 'List' ).className += ' list--current';
  }
};

var articles = document.getElementById( 'articlesLink' ),
  projects = document.getElementById( 'projectsLink' ),
  code = document.getElementById( 'codeLink' );

articles.onclick = function( e ){
  switchSection( 'articles' );
  e.preventDefault();
  return false;
};
projects.onclick = function( e ){
  switchSection( 'projects' );
  e.preventDefault();
  return false;
};
code.onclick = function( e ){
  switchSection( 'code' );
  e.preventDefault();
  return false;
};
});
