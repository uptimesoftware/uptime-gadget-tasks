'use strict';

module.exports = function(grunt) {
	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	grunt.registerTask('default', 'uptime-gadget:compress');
};
