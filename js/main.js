(function($) {
  var $$ = jQuery;
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


$( 'document' ).ready( function(){
  // New stuff I wrote all of
  // If you're reading this, I'm sorry... So very sorry...
  var blogURL = 'http://blog.michaelarestad.com/wp-json/wp/v2/',
      blogPostCount = 10;

  var createPostItem = function( post ) {
    var postsContainer = document.getElementById( 'articlesList' ),
      postItemContainer = document.createElement( 'li' ),
      postItem = document.createElement( 'div' ),
      postItemLink = document.createElement( 'a' ),
      postItemName = document.createElement( 'span' ),
      postItemCategories = document.createElement( 'ul' );

    postItemContainer.setAttribute( 'class', 'post-item__container' );

    postItem.setAttribute( 'class', 'post-item' );
    postItem.setAttribute( 'id', 'postItem' + post.id );

    postItemLink.setAttribute( 'rel', 'external' );
    postItemLink.setAttribute( 'href', post.link );
    postItemLink.setAttribute( 'class', 'post-item__link' );

    postItemName.textContent = post.title.rendered;
    postItemName.setAttribute( 'class', 'post-item__name' );

    postItemCategories.setAttribute( 'id', 'postItemCategories' + post.id );
    postItemCategories.setAttribute( 'class', 'post-item__categories' );

    postItem.appendChild( postItemLink );
    postItem.appendChild( postItemCategories );
    postItemLink.appendChild( postItemName );
    postItemContainer.appendChild( postItem );
    postsContainer.appendChild( postItemContainer );
  };

  var getCategories = function( postId ) {
    var categories = new XMLHttpRequest(),
      categoriesURL = blogURL + 'posts/' + postId + '/terms/category';

    categories.open( 'GET', categoriesURL, true );

    categories.onload = function ( e ) {
      if (categories.readyState === 4) {
        if (categories.status === 200) {
          categories = JSON.parse( categories.response );

          for ( var i = 0; i < categories.length; i++ ) {
            if ( categories[ i ].name.length > 0 ) {
              createCategory( postId, categories[ i ].name );
            }
          }
        } else {
          console.error(categories.statusText);
        }
      }
    };
    categories.send();
  };

  var createCategory = function( id, category ) {
    var postItem = document.getElementById( 'postItemCategories' + id ),
      categoryItem = document.createElement( 'li' );

    categoryItem.textContent = category;
    categoryItem.setAttribute( 'class', 'post-item__category' );

    postItem.appendChild( categoryItem );
  };

  var getPosts = function( url ) {
    var blogPosts = new XMLHttpRequest();

    blogPosts.open( 'GET', url + 'posts?filter[posts_per_page]=' + blogPostCount, true );

    blogPosts.onload = function ( e ) {
      if (blogPosts.readyState === 4) {
        if (blogPosts.status === 200) {
          blogPosts = JSON.parse( blogPosts.response );

          for ( var i = 0; i < blogPosts.length; i++ ) {
            if ( blogPosts[ i ].title.rendered.length > 0 ) {
              createPostItem( blogPosts[ i ] );
            }
            getCategories( blogPosts[ i ].id );
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

  // Projects functions
  // basically a duplicate of createPostItem but whatever
  var createListItem = function( section, sectionName, id ){
    var postsContainer = document.getElementById( sectionName + 'List' ),
      postItem = document.createElement( 'li' ),
      postItemLink = document.createElement( 'a' ),
      postItemName = document.createElement( 'span' ),
      postItemCategories = document.createElement( 'ul' );

    postItem.setAttribute( 'class', 'post-item' );
    postItem.setAttribute( 'id', 'postItem' + sectionName + id );

    postItemLink.setAttribute( 'rel', 'external' );
    postItemLink.setAttribute( 'href', section.link );
    postItemLink.setAttribute( 'class', 'post-item__link' );

    postItemName.textContent = section.title;
    postItemName.setAttribute( 'class', 'post-item__name' );

    postItemCategories.setAttribute( 'id', 'postItemCategories' + sectionName + id );
    postItemCategories.setAttribute( 'class', 'post-item__categories' );

    postItem.appendChild( postItemLink );
    postItem.appendChild( postItemCategories );
    postItemLink.appendChild( postItemName );
    postsContainer.appendChild( postItem );
  };

  // another duplicate
  var getListCategories = function( categories, sectionName, id ) {
    for ( var i = 0; i < categories.length; i++ ) {
      if ( categories[ i ].length > 0 ) {
        createListCategory( categories[ i ], sectionName, id );
      }
    }
  };

  // another near duplicate
  var createListCategory = function( category, sectionName, id ) {
    var postItem = document.getElementById( 'postItemCategories' + sectionName + id ),
      categoryItem = document.createElement( 'li' );

    categoryItem.textContent = category;
    categoryItem.setAttribute( 'class', 'post-item__category' );

    postItem.appendChild( categoryItem );
  };

  // another near duplicate
  var getList = function( items, sectionName ){
    for ( var i = 0; i < items.length; i++ ) {
      createListItem( items[ i ], sectionName, i );
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

  var loadingIndicator = function(){
    var indicator = document.getElementById( 'postsLoadingIndicator' );

    window.setTimeout( function(){
      indicator.textContent = 'Sorry for the wait!';
    }, 2000 );
  };

  // My fancy section switching technology!
  var switchSection = function( section ) {
    var clickedLink = document.getElementById( section + 'Link' );

    if ( clickedLink.className == 'current-page-item' ) {
      return false;
    } else {
      var currentLink = document.getElementsByClassName( 'current-page-item' ),
        currentSection = document.getElementsByClassName( 'posts-list--current' );

      [].slice.call( currentLink ).forEach( function( currentLink ) {
        currentLink.className = '';
      } );
      clickedLink.className = 'current-page-item';

      [].slice.call( currentSection ).forEach( function( currentSection ) {
        currentSection.className = 'posts-list';
      } );
      document.getElementById( section + 'List' ).className += ' posts-list--current';
    }
  };

  getList( projects, 'projects' );
  getList( code, 'code' );
  getPosts( blogURL );

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
