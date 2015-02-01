module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/lib/main.js','js/lib/app.js','js/lib/bing.js','js/lib/google.js','js/lib/mapbox.js','js/lib/mapquest.js','js/lib/bootstrap.js'],
        dest: 'js/main.js',
      },
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
        files: ['js/lib/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['css/lib/*.scss'],
        tasks: ['sass','autoprefixer'],
        options: {
          spawn: false,
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default', ['concat', 'uglify','sass','autoprefixer','watch']);

};
