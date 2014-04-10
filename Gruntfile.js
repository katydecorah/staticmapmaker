module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
        'js/lib/*.js' // All JS in the libs folder
        ],
        dest: 'js/main.js',
      }
    },

    uglify: {
      build: {
        src: 'js/main.js',
        dest: 'js/main.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/main.css': 'css/lib/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      target: {
        src: 'css/main.css'
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass','autoprefixer'],
        options: {
          spawn: false,
        }
      }
    }

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');



  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify','sass','autoprefixer','watch']);

};
