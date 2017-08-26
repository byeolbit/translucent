module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner:
`/*
* jQuery translucent <%= pkg.version %>
* Copyright (c) 2017, Yeonwoo Jo
* Lisensed under the MIT
* 
* Dependencies:
*  jQuery >= 1.6
* 
* Contacts
*  Github : github.com/byeolbit
*  Email : info@byeolbit.com
*          yeonwoo.jo.92@gmail.com
*
* You can find this project at https://github.com/byeolbit/translucent
*/`
      },
      build: {
        src: 'src/jquery.<%= pkg.name %>.js',
        dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
}