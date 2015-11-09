module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-sass" );
grunt.loadNpmTasks( "grunt-autoprefixer" );
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
	watch: {
		sass: {
			files: [ "scss/**/*.scss" ],
			tasks: [ "sass", "autoprefixer" ],
			options: {
				spawn: false
			}
		}
	}
});

grunt.registerTask( "default", [ "watch" ] );

};
