'use strict';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		uptime_gadget_tasks: {
			default_options: {
				options: {
				}
	  		}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	grunt.registerTask('default', 'uptime-gadget:compress');
};
