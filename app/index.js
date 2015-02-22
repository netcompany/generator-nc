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
		var doneInitial = this.async();
		this.prompt([
		{
			name: 'appName',
            message: 'What is your project\'s name ? \n'
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
		}
		], function (props) {
			this.appName = props.appName;
			this.appNameNoSpace = props.appName.replace(/[ çãõáà]/g, '');

			//bootstrap
			this.bootstrap = props.bootstrap;

			//angular
			this.angularjs = props.angularjs;

			doneInitial();
		}.bind(this));

		//TEST VALUES: TODO DELETE:
		/*
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
		*/
	},
	/*detectVisualStudioProject: function(){
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
	},*/
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
			this.mkdir("content");
			this.mkdir("content/_source");
			this.mkdir("content/images");
			this.mkdir("content/_source/img");
			this.mkdir("content/_source/js");
			this.mkdir("content/_source/scss");
			this.log("Scaffolding folders " + chalk.green("Done"));
		}
	},
	copyMainFiles: function(){
		if(this.doInstall){
			this.log("Copying and customizing files");

			//copy build files
			this.copy("_gulpfile.js", "content/gulpfile.js");
		    this.copy("_package.json", "package.json");
		    this.copy('_bowerrc', '.bowerrc');
	  		this.template('_bower.json', 'bower.json');
	  		this.copy('_jshintrc', 'content/jshintrc');

	  		//copy templates
	  		this.template('app/_index.html', 'index.html');
	  		this.copy('app/content/_source/js/_app.js', 'content/_source/js/app.js');
	  		this.copy('app/content/_source/scss/_app.scss', 'content/_source/scss/app.scss');
	  		this.copy('app/content/images/_favicon.ico', 'content/images/favicon.ico');
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