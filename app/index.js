'use strict';

//JSON.stringify(obj, null, 4);
var yeoman = require('yeoman-generator');
var yosay = require('yosay'); //nice-to-have: tell the yeoman logo what to say
var chalk = require('chalk'); //nice-to-have: colored text in the console
var readdirp = require('readdirp'); //used to find files (e.g, does file xyz exist)

var NCGenerator = yeoman.generators.Base.extend({

	// General setup
	constructor: function () {
		// Calling the super constructor is important so our generator is correctly set up
		yeoman.generators.Base.apply(this, arguments);

		// Next, add your custom code
		this.option('test'); // This method adds support for a `--test` flag
		
		this.on('end', function () {
			if(this.doInstall){
				if (!this.options['skip-install']) {
					this.installDependencies();
				}
				this.log(chalk.green('Scaffolding done !!!\n'));
			}
		});
	},
	// Welcome!
	hello: function () {
		this.log(yosay(
			chalk.red('Welcome!') + '\n' +
			chalk.yellow('You\'re using the fantastic NC-generator for scaffolding UI! omg omg omg!')
		));
	},
	//Get all user inputs and configurations
	questions: function () {
		this.log(chalk.bold('---- Please answer the following questions to customize your install ----'));

		// --- Ask the hard-hitting questions, good-cop/bad-cop style! ---
		/*var doneInitial = this.async();
		this.prompt([
		{
			name: 'appName',
            message: 'What is your project\'s name ? \n'
		},
		{
			name: 'dependencyStorageLocation',
            message: 'Would you like to change the directory where /node_modules/ and /bower_components/ are stored? Default is to create the folders in the current folder. Provide a relative path like: \'/solution items/build/\' to change. Leave blank and press enter to keep the default directory. \n',
            default: ""
		},
		{
			name: 'scriptStorageLocation',
            message: 'By default, generator-nc creates a \'scripts\' folder at the root level and wires gulp to processes the javascript files in this folder. If you already have a scripts folder in a different location, please provide the relative path to this folder (leave blank and enter to keep default). \n',
            default: ""
		},
		{
			name: 'distScriptStorageLocation',
            message: 'By default, Gulp places distribution scripts in a \'/dist/scripts\' folder at the root level, would you like to change this? Provide a relative path to change the location (leave blank and enter to keep default). \n',
            default: ""
		},
		{
			name: 'assetsStorageLocation',
            message: 'By default, generator-nc creates an \'assets\' folder at the root level and wires gulp to processes the font, image and scss files in this folder. If you already have an existing \'assets\' folder in a different location, please provide the relative path to this folder (leave blank and enter to keep default). \n',
            default: ""
		},
		{
			name: 'distAssetsStorageLocation',
            message: 'By default, Gulp places distribution assets (imgs, css, etc.) in a \'/dist/assets\' folder at the root level, would you like to change this? Provide a relative path to change the location (leave blank and enter to keep default). \n',
            default: ""
		},
		{
			name: 'bootstrap',
			type: 'confirm',
			message: 'Would you like to include Bootstrap? \n',
			default: true
		},
		{
			name: 'angularjs',
			type: 'confirm',
			message: 'Would you like to include AngularJS? \n',
			default: true
		}, 
		{
			name: 'angularBootstrap',
			type: 'confirm',
			message: 'Would you like to include Angular-Bootstrap? \n',
			when: function (props) {
		  		return props.angularjs && props.bootstrap;
			},
			default: true
		},
		{
			name: 'extensionsBootstrap',
			type: 'checkbox',
			message: 'Include Bootstrap add-ons? \n',
			when: function (props) {
		  		return props.bootstrap;
			},
			"choices": [
			{
				"value": "bootstrap-datepicker",
				"name": "Bootstrap datepicker",
				checked: false
			},
			{
				"value": "something",
				"name": "Super-awesome bootstrap extension",
				checked: false
			}]
		}, 
		{
			name: 'extensionsAngular',
			type: 'checkbox',
			message: 'Include AngularJS add-ons?',
			when: function (props) {
		  		return props.angularjs;
			},
			"choices": [
			{
				"value": "ng-awesome",
				"name": "ng-awesome",
				checked: false
			},
			{
				"value": "ng-something",
				"name": "Super-awesome angular stuff",
				checked: false
			}]
		}
		], function (props) {
			this.appName = props.appName;
			this.appNameNoSpace = props.appName.replace(/[ çãõáà]/g, '');

			this.dependencyStorageLocation = props.dependencyStorageLocation; //is an empty string if default location, else relative path.

			//dev-scripts and dist-scripts location
			this.scriptStorageLocation = props.scriptStorageLocation; //is an empty string if default location, else relative path.
			this.distScriptStorageLocation = props.distScriptStorageLocation; //is an empty string if default location, else relative path.

			//dev-assets and dist-assets location
			this.assetsStorageLocation = props.assetsStorageLocation;
			this.distAssetsStorageLocation = props.distAssetsStorageLocation;

			//bootstrap
			this.bootstrap = props.bootstrap;
			this.extensionsBootstrap = props.extensionsBootstrap;

			//angular
			this.angularjs = props.angularjs;
			this.extensionsAngular = props.extensionsAngular;

			doneInitial();
		}.bind(this));*/

		//TEST VALUES: TODO DELETE:
		this.appName= "gg";
		this.appNameNoSpace=  "gg";
		this.dependencyStorageLocation = "";
		this.scriptStorageLocation = "";
		this.distScriptStorageLocation = "";
		this.assetsStorageLocation = "";
		this.distAssetsStorageLocation = "";
		this.bootstrap = true;

		this.extensionsBootstrap = [
		    "bootstrap-datepicker"
		];
		this.angularjs = true;
		this.extensionsAngular = [
		    "ng-awesome"
		];
	},
	detectVisualStudioProject: function(){
		// Detect if it's a visual studio project and ask if gulp should be added as pre-build event
		var that = this;
		readdirp({ root: '.', fileFilter: [ '*.csproj'] })
		.on('data', function (entry) {
			console.log(
		      chalk.white(
		        'Visual Studio Project detected!: ' + entry.path + '\n'
		      )
		    );

		    var done = that.async();
	        var csprojPrompts = [{
	        	type: 'confirm',
	            name: 'prebuild',
	            message: 'Would you like to add a pre-build event to this project to have gulp run automatically on project build?',
	            default: true
	        }];
	 
	        this.prompt(csprojPrompts, function (props) {
	            that.prebuild = props.prebuild;
	            done();
	        }.bind(this));
		});
	},
	// show the user whats going to change (files, folders etc.), then ask to proceed or not.
	showPendingChanges: function(){
		this.log(chalk.bold("---- Generator-NC will execute the following changes ---- "));
		this.log(chalk.white(process.cwd()) + chalk.cyan(" (root)"));
		this.log(chalk.white("├──┬"));
		this.log(chalk.white("│  └──"));
		//TODO show whats going to change

		var done = this.async();
		this.prompt({
			type    : 'confirm',
			name    : 'doInstall',
			message : 'Proceed with install?',
			default : true
		}, function (answers) {
			this.doInstall = answers.doInstall;

			if(!this.doInstall){
				this.log("Install aborted" + chalk.cyan(" (no changes will be made)"));
			}

			done();
		}.bind(this));
	},
	scaffoldFolders: function(){
		if(this.doInstall){
			this.log("Scaffolding folders");
			this.mkdir("app");
			this.mkdir("app/controllers");
			this.mkdir("app/style");
			/*this.mkdir("app/shared");
			this.mkdir("app/shared/sidebar");
			this.mkdir("app/components");
			this.mkdir("app/components/home");
			this.mkdir("app/components/dashboard");
			this.mkdir("assets");
			this.mkdir("assets/style");
			this.mkdir("assets/img");
			this.mkdir("assets/fonts");
			this.mkdir("test");*/



			this.log("Scaffolding folders " + chalk.green("Done"));
		}
	},
	copyMainFiles: function(){
		if(this.doInstall){
			this.log("Copying and customizing files");
			this.copy("_gulpfile.js", "gulpfile.js");
		    this.copy("_package.json", "package.json");
		    //this.copy("assets/style/_main.scss", "assets/style/main.scss");
		    //this.copy("app/_app.js", "app/app.js");

		    this.copy('_bowerrc', '.bowerrc');
	  		this.copy('_bower.json', 'bower.json');
	  		this.copy('_jshintrc', 'jshintrc');


	  		this.copy('_index.html', 'index.html');
	  		this.copy('app/_app.js', 'app/app.js');
	  		this.copy('app/_controllers.js', 'app/controllers.js');
	  		this.copy('app/_directives.js', 'app/directives.js');
	  		this.copy('app/_filters.js', 'app/filters.js');
	  		this.copy('app/_main.js', 'app/main.js');
	  		this.copy('app/_partial1.html', 'app/partial1.html');
	  		this.copy('app/_partial2.html', 'app/partial2.html');
	  		this.copy('app/_routes.js', 'app/routes.js');
	  		this.copy('app/_services.js', 'app/services.js');
	  		this.copy('app/controllers/_myctrl2.js', 'app/controllers/myctrl2.js');
	  		this.copy('app/style/_test.scss', 'app/style/test.scss');


			/*this.copy('_gruntfile.js', 'Gruntfile.js');
			this.copy('_package.json', 'package.json');
			this.copy('_bower.json', 'bower.json');
			this.copy('_bowerrc', '.bowerrc');
			this.copy('_index.html', 'app/index.html');*/
		 
		 /*   var context = { 
		        site_name: this.appName 
		    };
		 
		    this.template("_header.html", "app/header.html", context);*/

		    this.log("Copying and customizing files " + chalk.green("Done"));
		}
	},
	//If a Visual Studio project was detected, add the prebuild event
	insertPrebuildEvent: function(){
		/*if(this.doInstall && this.prebuild){
			this.log("Inserting prebuild event");
			//TODO
			this.log("Inserting prebuild event " + chalk.green("Done"));
		}*/
	}


/*
	promptUser: function() {
        
    },
    scaffoldFolders: function(){
		this.mkdir("app");
		this.mkdir("app/style");
		this.mkdir("app/sections");
		this.mkdir("build");
	},
	copyMainFiles: function(){
	    this.copy("_footer.html", "app/footer.html");
	    this.copy("../../gulpfile.js", "gulpfile.js");
	    this.copy("../../package.json", "package.json");
	    this.copy("style/_main.css", "app/style/main.css");  
*/
		/*this.copy('_gruntfile.js', 'Gruntfile.js');
		this.copy('_package.json', 'package.json');
		this.copy('_bower.json', 'bower.json');
		this.copy('_bowerrc', '.bowerrc');
		this.copy('_index.html', 'app/index.html');*/
/*	 
	    var context = { 
	        site_name: this.appName 
	    };
	 
	    this.template("_header.html", "app/header.html", context);
	},
*/
});

module.exports = NCGenerator;