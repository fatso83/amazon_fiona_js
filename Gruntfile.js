module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            options : { // shared config
                configFile: 'test/karma.conf.js'
            },
            unit : {
                autoWatch: false
            },
            watch: {
                autoWatch: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma:unit']);

};