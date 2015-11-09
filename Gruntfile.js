module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-sass" );
grunt.loadNpmTasks( "grunt-autoprefixer" );
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks( "grunt-contrib-watch" );

grunt.initConfig({
	sass: {
		dist: {
			options: {
				sourceMap: true,
				outputStyle: "compressed"
			},
			files: [ {
				expand: true,
				cwd: "scss",
				src: [ "*.scss" ],
				dest: "css/",
				ext: ".css"
			} ]
		}
	},
	autoprefixer: {
		dist: {
			options: {
				map: true,
				browsers: [
					"> 1%",
					"last 2 versions",
					"safari >= 5.1",
					"ios >= 6.1",
					"android 2.3",
					"android >= 4",
					"ie >= 8"
				]
			},
			src: "css/*.css"
		}
	},
	uglify: {
		my_target: {
			files: {
				'js/main.min.js': [ 'js/main.js' ]
			}
		}
	},
	concat: {
		options: {
			// separator: ';',
		},
		dist: {
			src: [
				'js/src/open.js',
				'js/src/list-generator.js',
				'js/src/wpapi.js',
				'js/src/codepenapi.js',
				'js/src/section-switcher.js',
				'js/src/main.js'
			],
			dest: 'js/main.js',
		},
	},
	watch: {
		sass: {
			files: [ "scss/**/*.scss" ],
			tasks: [ "sass", "autoprefixer" ],
			options: {
				spawn: false
			}
		},
		js: {
			files: [ "js/**/*.js" ],
			tasks: [ "concat", "uglify" ],
			options: {
				spawn: false
			}
		}
	}
});

grunt.registerTask( "default", [ "sass", "autoprefixer", "concat", "uglify", "watch" ] );

};
