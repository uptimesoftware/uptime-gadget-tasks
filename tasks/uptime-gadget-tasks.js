'use strict';

module.exports = function(grunt) {

	var zipOutputFolder = grunt.option('target') || 'target';
	var fileSet = [ {expand: true, cwd: 'src/', src: ['**'], dest: '/'} ];

	grunt.config.set('pkg', grunt.file.readJSON('package.json'));
	grunt.config.set('compress', {
									main: {
										options: {
											archive: zipOutputFolder + '/<%= pkg.name %>.zip'
										},
										files: fileSet
									}
								});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-maven-tasks');

	grunt.registerTask('uptime-gadget:compress', ["compress"]);
	grunt.registerTask('uptime-gadget:mavenDeploy', ["setMavenTaskOptions", "maven:deploy"]);
	grunt.registerTask('uptime-gadget:mavenRelease', ["setMavenTaskOptions", "maven:release"]);

	grunt.registerTask('setMavenTaskOptions', 'Loads mavenOptions.json and populates config for grunt-maven-tasks plugin', function() {
		var mavenUserConfigFilename = "mavenOptions.json";
		if (!grunt.file.exists(mavenUserConfigFilename)) {
			grunt.fatal("Missing the required " + mavenUserConfigFilename + " config file.");
			return;
		}
		grunt.config.set("mavenUserOptions", grunt.file.readJSON('mavenOptions.json'));
		grunt.config.requires("mavenUserOptions.groupId", "mavenUserOptions.snapshotRepositoryId", "mavenUserOptions.snapshotUrl", 
								"mavenUserOptions.releaseRepositoryId", "mavenUserOptions.releaseUrl");
		grunt.config.set('maven', { 
				options: { 	
					groupId: '<%= mavenUserOptions.groupId %>',
					file: 'target/<%= pkg.name %>.zip',
					injectDestFolder: false
				},
				deploy: {	
					options: { 
						repositoryId: '<%= mavenUserOptions.snapshotRepositoryId %>',
						url: '<%= mavenUserOptions.snapshotUrl %>'
					},
					files: fileSet
				},
				release: {	
					options: { 
						repositoryId: '<%= mavenUserOptions.releaseRepositoryId %>',
						url: '<%= mavenUserOptions.releaseUrl %>'
					},
					files: fileSet
				}
			});
	});

};
