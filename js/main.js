var Listatron = {};

$( 'document' ).ready( function(){

Listatron.createListItem = function( item, sectionName ) {
  var container = document.getElementById( sectionName + 'List' );

  var blogPostContainer = document.createElement( 'li' );
  blogPostContainer.setAttribute( 'class', 'list-item__container' );
  container.appendChild( blogPostContainer );

  var blogPost = document.createElement( 'div' );
  blogPost.setAttribute( 'class', 'list-item' );
  blogPost.setAttribute( 'id', 'listItem_' + sectionName + item.id );
  blogPostContainer.appendChild( blogPost );

  var blogPostLink = document.createElement( 'a' );
  blogPostLink.setAttribute( 'rel', 'external' );
  blogPostLink.setAttribute( 'href', item.link );
  blogPostLink.setAttribute( 'class', 'list-item__link' );
  blogPost.appendChild( blogPostLink );

  var blogPostName = document.createElement( 'span' );
  blogPostName.textContent = item.title;
  blogPostName.setAttribute( 'class', 'list-item__name' );
  blogPostLink.appendChild( blogPostName );

  var blogPostCategories = document.createElement( 'ul' );
  blogPostCategories.setAttribute( 'id', 'listItemCategories_' + sectionName + item.id );
  blogPostCategories.setAttribute( 'class', 'list-item__categories' );
  blogPost.appendChild( blogPostCategories );
};

Listatron.createListCategory = function( category, sectionName, id ) {
  var postItem = document.getElementById( 'listItemCategories_' + sectionName + id ),
    categoryItem = document.createElement( 'li' );

  categoryItem.textContent = category;
  categoryItem.setAttribute( 'class', 'list-item__category' );

  postItem.appendChild( categoryItem );
};

var getListCategories = function( categories, sectionName, id ) {
  for ( var i = 0; i < categories.length; i++ ) {
    if ( categories[ i ].length > 0 ) {
      Listatron.createListCategory( categories[ i ], sectionName, id );
    }
  }
};

var getList = function( items, sectionName ){
  for ( var i = 0; i < items.length; i++ ) {
    var item = [];

    item.title = items[ i ].title;
    item.id = i;
    item.link = items[ i ].link;

    Listatron.createListItem( item, sectionName, i );
    getListCategories( items[ i ].categories, sectionName, i );
  }
};

var projects = [
  {
    title: 'Backup browser',
    link: 'http://blog.vaultpress.com/2014/03/10/backup-browser/',
    categories: [ 'Design', 'VaultPress', 'WordPress', 'Automattic' ]
  },
  {
    title: 'th_s (Thunderscores!)',
    link: 'https://github.com/MichaelArestad/th_s',
    categories: [ 'Sass', 'WordPress', 'Theme' ]
  },
  {
    title: 'CDLE branding',
    link: 'cdle-brand.html',
    categories: [ 'Identity', 'Website', 'Government' ]
  },
  {
    title: 'Anvil',
    link: 'http://anvil.michaelarestad.com/',
    categories: [ 'Website', 'Tool' ]
  },
  {
    title: 'Better Letters',
    link: 'betterletters.html',
    categories: [ 'Typography', 'Experiments' ]
  },
  {
    title: 'Laced Pattern Typeface',
    link: 'laced.html',
    categories: [ 'Typography', 'Experiments' ]
  },
  {
    title: 'I need space',
    link: 'i-need-space.html',
    categories: [ 'Design', 'Experiments' ]
  }
];

var code = [
  {
    title: 'Replace text with an icon font icon',
    link: 'http://codepen.io/MichaelArestad/pen/wBfeE',
    categories: [ 'CodePen', 'CSS' ]
  },
  {
    title: 'Text input love',
    link: 'http://codepen.io/MichaelArestad/full/ohLIa',
    categories: [ 'CodePen', 'Design', 'Inputs', 'CSS' ]
  }
];

getList( projects, 'projects' );
getList( code, 'code' );

});

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
    if (blogPosts.readyState === 4) {
      if (blogPosts.status === 200) {
        blogPosts = JSON.parse( blogPosts.response );

        for ( var i = 0; i < blogPosts.length; i++ ) {
          var post = [];

          post.title = blogPosts[ i ].title.rendered;
          post.id = blogPosts[ i ].id;
          post.link = blogPosts[ i ].link;

          Listatron.createListItem( post, sectionName, post.id );
          wpapi_getCategories( post, sectionName );
        }
      } else {
        console.error(blogPosts.statusText);
      }
    }
  };
  blogPosts.onerror = function (e) {
    console.error(blogPosts.statusText);
  };
  blogPosts.send();
}

wpapi_getList( blogURL, 'articles' );
});

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

(function($) {
  var $$ = jQuery;
  // Smooooooth scrolling
  $$(window).scroll(function() {
    // find the id with class 'active' and remove it
    $$(".to-top").addClass("do-it");
    // get the amount the window has scrolled
    var scroll = $$(window).scrollTop();
    // add the 'active' class to the correct id based on the scroll amount
    if (scroll <=300) {
      $$(".to-top").removeClass("do-it");
    }
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
       if (target.length) {
         $('html,body').animate({
           scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

  $(window).scroll( function(){ // For use with automattic
    $('.eleven').each( function(){
      var bottom_of_object = $(this).position().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if( bottom_of_window > bottom_of_object ){
        $(this).addClass("all-the-way-up");
      }
    });
  });
})(jQuery);
