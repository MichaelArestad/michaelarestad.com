$( 'document' ).ready( function(){
var codepenURL = 'http://cpv2api.com/pens/public/MichaelArestad',
  pensList = [];

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
          Listatron.createListItem( pen, sectionName, pen.id );
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
