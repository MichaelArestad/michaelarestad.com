var codepenURL = 'http://cpv2api.com/pens/showcase/MichaelArestad',
  pensList = [];

var createPenThumbnail = function( imageURL, sectionName, id) {
  var pen = document.getElementById( 'listItem_' + sectionName + id ).children[ 0 ];

  var thumbnail = document.createElement( 'img' );
  thumbnail.setAttribute( 'src', imageURL );
  thumbnail.setAttribute( 'class', 'codepen__thumbnail' );
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
          pen.image = pens.data[ i ].images.large;

          pensList.push( pen );
          Listatron.createListItem( pen, sectionName, 'codepen' );

          createPenThumbnail( pen.image, sectionName, pen.id );
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

codepenapi_getList( codepenURL, 'codepen', true );
