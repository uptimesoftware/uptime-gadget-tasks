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

## The "uptime-gadget" tasks

### "compress" task
> Compresses everything in the `src/` folder into `target/[GadgetName].zip`. 

```shell
grunt uptime-gadget:compress --target=[desired_output_folder]
```
- GadgetName is the name found in package.json
- `--target` flag is optional.  If not specified, output will simply go to a subfolder called `target/` as shown above.

### Maven Deploy and Release tasks
> Compresses the `src/` directory (just as in the `compress` task) and then deploys or releases the zip to a Maven repository.


`mavenOptions.json` file is expected in a folder `userOptions/` for the `mavenDeploy` and `mavenRelease` tasks.  Make sure that it includes the following options:
```js
{
	"groupId": "[group_id]",
	"snapshotRepositoryId": "[snapshot repository id used for authentication purposes, as pulled from ~/.m2/settings.xml]",
	"snapshotUrl": "[URL of the snapshot repository]",
	"releaseRepositoryId": "[release repository id used for authentication purposes, as pulled from ~/.m2/settings.xml]",
	"releaseUrl": "[URL of the release repository]"
}
```

Further details about Maven deploying and releasing can be found in the documentation for the [grunt-maven-tasks](https://github.com/smh/grunt-maven-tasks) plugin.

#### "mavenDeploy" task
```shell
grunt uptime-gadget:mavenDeploy
```

#### "mavenRelease" task
```shell
grunt uptime-gadget:mavenRelease
```
