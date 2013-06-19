# uptime-gadget-tasks

> Grunt tasks to compress gadgets and commit to a Maven repository.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install uptime-gadget-tasks --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('uptime-gadget-tasks');
```

## Usage Examples
### The "uptime-gadget" tasks

#### "compress" task
_Run this task with the 'grunt uptime-gadget:compress' command_

This will compress everything in the src/ folder into target/[GadgetName].zip

_Run this task with 'grunt uptime-gadget:compress --target=[desired_output_folder]' to output to a specific folder other than target/_

### "mavenDeploy" task
Make sure to have a config file 'mavenOptions.json' present before running this file.  See Maven Options section for more

_Run this task with the 'grunt uptime-gadget:mavenDeploy' command_

Further details can be found in the documentation for the [grunt-maven-tasks](https://github.com/smh/grunt-maven-tasks)

### "mavenRelease" task
Make sure to have a config file 'mavenOptions.json' present before running this file.  See Maven Options section for more

_Run this task with the 'grunt uptime-gadget:mavenRelease' command_

Further details can be found in the documentation for the [grunt-maven-tasks](https://github.com/smh/grunt-maven-tasks)


## Maven Options
'mavenOptions.json' file is expected for the "deploy" and "release" tasks.  Make sure that it includes the following options:
{
	"groupId": "[group_id]",
	"snapshotRepositoryId": "[snapshot repository id used for authentication purposes, as pulled from ~/.m2/settings.xml]",
	"snapshotUrl": "[URL of the snapshot repository]",
	"releaseRepositoryId": "[release repository id used for authentication purposes, as pulled from ~/.m2/settings.xml]",
	"releaseUrl": "[URL of the release repository]"
}
