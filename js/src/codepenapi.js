$( 'document' ).ready( function(){
var codepenURL = 'http://cpv2api.com/pens/popular/MichaelArestad',
  pensList = [];

var createPenThumbnail = function( url, sectionName, id) {
  var pen = document.getElementById( 'listItem_' + sectionName + id ).children[ 0 ];

  var thumbnail = document.createElement( 'img' );
  thumbnail.setAttribute( 'src', url + '/image/large.png' );
  thumbnail.setAttribute( 'class', 'codepen__thumbnail' );
  // thumbnail.className( 'codepen-thumbnail' );
  pen.appendChild( thumbnail );
};

var codepenapi_getList = function( url, sectionName ) {
  var pens = new XMLHttpRequest();

  pens.open( 'GET', url, true );

  pens.onload = function ( e ) {
    if ( pens.readyState === 4 ) {
      if ( pens.status === 200 ) {
        pens = JSON.parse( pens.response );

        for ( var i = 0; i < pens.data.length; i++ ) {
          var pen = [];

          pen.title = pens.data[ i ].title;
          pen.id = pens.data[ i ].id;
          pen.link = pens.data[ i ].link;

          pensList.push( pen );
          Listatron.createListItem( pen, sectionName, 'codepen' );
          createPenThumbnail( pen.link, sectionName, pen.id );
        }
      } else {
        console.error( pens.statusText );
      }
    }
  };
  pens.onerror = function ( e ) {
    console.error( pens.statusText );
  };
  pens.send();
};

codepenapi_getList( codepenURL, 'codepen' );
codepenapi_getList( codepenURL + '?page=2', 'codepen' );
});
