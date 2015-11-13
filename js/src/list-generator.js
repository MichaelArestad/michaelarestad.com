var Listatron = {};

Listatron.createListItem = function( item, sectionName, customClass ) {
  var container = document.getElementById( sectionName + 'List' );

  var blogPostContainer = document.createElement( 'li' );
  var result = customClass !== undefined ? customClass : '';
  blogPostContainer.setAttribute( 'class', 'list-item__container ' + customClass  );
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
    title: 'WordPress.com',
    link: 'wordpressdotcom/',
    categories: [ 'Design', 'WordPress', 'Automattic' ]
  },
  {
    title: 'Press This',
    link: 'pressthis/',
    categories: [ 'Design', 'WordPress' ]
  },

  {
    title: 'Sensei Logo',
    link: 'sensei/',
    categories: [ 'Design', 'WordPress' ]
  },
  {
    title: 'Jetpack',
    link: 'jetpack/',
    categories: [ 'Design', 'WordPress' ]
  },
  {
    title: 'WordPress.org contributions',
    link: 'sensei/',
    categories: [ 'Design', 'WordPress' ]
  },
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


getList( projects, 'projects' );

