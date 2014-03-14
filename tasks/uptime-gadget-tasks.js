'use strict';

module.exports = function(grunt) {

	var zipOutputFolder = grunt.option('target') || 'target';
	var srcFileSet = [ {
		expand : true,
		cwd : 'src/',
		src : [ '**' ],
		dest : zipOutputFolder + '/dist/'
	} ];
	var distFileSet = [ {
		expand : true,
		cwd : zipOutputFolder + '/dist/',
		src : [ '**' ],
		dest : '/'
	} ];

	grunt.config.set('pkg', grunt.file.readJSON('package.json'));
	var gadgetVersion = grunt.config.get('pkg.version');
	if (!gadgetVersion) {
		gadgetVersion = "0.9";
	}
	gadgetVersion = gadgetVersion.replace(/^(\d+\.\d+).*/, "$1");
	grunt.config.set('pkg.gadget_version', gadgetVersion);
	grunt.config.set('compress', {
		main : {
			options : {
				archive : zipOutputFolder + '/<%= pkg.name %>.zip'
			},
			files : distFileSet
		}
	});
	grunt.config.set('copy', {
		main : {
			options : {
				process : function(content, srcpath) {
					return grunt.template.process(content);
				}
			},
			files : srcFileSet
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-maven-tasks');

	grunt.registerTask('uptime-gadget:compress', [ "copy", "compress" ]);
	grunt.registerTask('uptime-gadget:mavenDeploy', [ "setMavenTaskOptions", "copy", "maven:deploy" ]);
	grunt.registerTask('uptime-gadget:mavenRelease', [ "setMavenTaskOptions", "copy", "maven:release" ]);

	grunt.registerTask('setMavenTaskOptions', 'Loads mavenOptions.json and populates config for grunt-maven-tasks plugin',
			function() {
				var mavenUserConfigFilename = "userOptions/mavenOptions.json";
				if (!grunt.file.exists(mavenUserConfigFilename)) {
					grunt.fatal("Missing the required " + mavenUserConfigFilename + " config file.");
					return;
				}
				grunt.config.set("mavenUserOptions", grunt.file.readJSON(mavenUserConfigFilename));
				grunt.config.requires("mavenUserOptions.groupId", "mavenUserOptions.snapshotRepositoryId",
						"mavenUserOptions.snapshotUrl", "mavenUserOptions.releaseRepositoryId", "mavenUserOptions.releaseUrl");
				grunt.config.set('maven', {
					options : {
						groupId : '<%= mavenUserOptions.groupId %>',
						file : 'target/<%= pkg.name %>.zip',
						injectDestFolder : false
					},
					deploy : {
						options : {
							repositoryId : '<%= mavenUserOptions.snapshotRepositoryId %>',
							url : '<%= mavenUserOptions.snapshotUrl %>'
						},
						files : distFileSet
					},
					release : {
						options : {
							repositoryId : '<%= mavenUserOptions.releaseRepositoryId %>',
							url : '<%= mavenUserOptions.releaseUrl %>'
						},
						files : distFileSet
					}
				});
			});

};
