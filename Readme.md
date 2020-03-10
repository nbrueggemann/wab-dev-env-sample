# Build WAB Configs Targeting Specific Environments

This repo contains a portion of a build system that shows how variable substitution in WAB configuration files can be used to build a WAB application for different environments.

In this example the files in \configs and \src are run through the build system and then output to \wab\arcgis-web-appbuilder-2.6\server\apps\2.

Once you clone the code run the following to install the dependencies

```
npm install
```

Then to kickoff the build run:

```
gulp --env=dev
```

You can used dev, staging, or production for the dev environment argument.

## Build Folder

This folder contains the coe for the build system that performs the variable substitution

## Configs Folder

Sample configuration file for a dummy widget we're calling MyCustomWidget

## Src Folder

Our source code for the application.  Just contains the one sample widget.

## Tmp Folder

Intermediate folder.  Only created when the build system runs.

## Wab Folder

The destination of our build.  