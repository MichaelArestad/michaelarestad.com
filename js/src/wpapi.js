$( 'document' ).ready( function(){
var blogURL = 'http://blog.michaelarestad.com/wp-json/wp/v2/',
  blogPostCount = 10;

var wpapi_getCategories = function( item, sectionName ) {
  var categories = new XMLHttpRequest(),
    categoriesURL = blogURL + 'posts/' + item.id + '/terms/category';

  categories.open( 'GET', categoriesURL, true );

  categories.onload = function ( e ) {
    if (categories.readyState === 4) {
      if (categories.status === 200) {
        categories = JSON.parse( categories.response );

        for ( var i = 0; i < categories.length; i++ ) {
          if ( categories[ i ].name.length > 0 ) {
            Listatron.createListCategory( categories[ i ].name, sectionName, item.id );
          }
        }
      } else {
        console.error( categories.statusText );
      }
    }
  };
  categories.send();
};

var wpapi_getList = function( url, sectionName ) {
  var blogPosts = new XMLHttpRequest();

  blogPosts.open( 'GET', url + 'posts?filter[posts_per_page]=' + blogPostCount, true );

  blogPosts.onload = function ( e ) {
    if ( blogPosts.readyState === 4 ) {
      if ( blogPosts.status === 200 ) {
        blogPosts = JSON.parse( blogPosts.response );

        for ( var i = 0; i < blogPosts.length; i++ ) {
          var post = [];

          post.title = blogPosts[ i ].title.rendered;
          post.id = blogPosts[ i ].id;
          post.link = blogPosts[ i ].link;

          Listatron.createListItem( post, sectionName );
          wpapi_getCategories( post, sectionName );
        }
      } else {
        console.error( blogPosts.statusText );
      }
    }
  };
  blogPosts.onerror = function ( e ) {
    console.error( blogPosts.statusText );
  };
  blogPosts.send();
}

wpapi_getList( blogURL, 'articles' );
});
