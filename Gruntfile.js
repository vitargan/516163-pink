"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"]
      },

      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    },

    csso: {
    style: {
      options: {
        report: "gzip"
      },
      files: {
        "build/css/style.min.css" : ["source/css/style.css"]
      }
    }
  },

  imagemin: {
    images: {
      options: {
        optimizationLevel: 3,
        progressive: true
      },
      files: [{
        expand: true,
        cwd: 'source/img/',
        src: ["**/*.{png,jpg,svg}"],
        dest: "build/img/"
      }]
     }
    },

    cwebp: {
    images: {
      options: {
        q: 90
      },
      files: [{
        expand: true,
        cwd: 'source/img/',
        src: ["**/*.{png,jpg}"],
        dest: "build/img/"
      }]
    }
  },

  copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts//*.{woff,woff2}",
            "img/",
            "js/",
            "*.html"
          ],
          dest: "build"
        }]
      }
    },

    clean: {
    build: ["build"]
  },
});

  grunt.registerTask("serve", ["browserSync", "watch" ]);
  grunt.registerTask("build",  [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "imagemin",
    "cwebp"
    ]);
};
