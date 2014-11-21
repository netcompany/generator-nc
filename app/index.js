'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay'); //nice-to-have: tell the yeoman logo what to say
var chalk = require('chalk'); //nice-to-have: colored text in the console

var NCGenerator = yeoman.generators.Base.extend({

	// General setup
	constructor: function () {
		// Calling the super constructor is important so our generator is correctly set up
		yeoman.generators.Base.apply(this, arguments);

		// Next, add your custom code
		this.option('test'); // This method adds support for a `--test` flag
		
		this.on('end', function () {
			if (!this.options['skip-install']) {
				/*this.installDependencies();*/
				this.installDependencies();
			}
			this.log(chalk.green('\nScaffolding done !!!\n'));
		});
	},
	// Welcome!
	info: function () {
		this.log(yosay(
			chalk.red('Welcome!') + '\n' +
			chalk.yellow('You\'re using the fantastic NC-generator for scaffolding UI! omg omg omg!')
		));
	},
	//TODO: Get all user inputs and configurations
	askFor: function () {
		var done = this.async();

		var prompts = [{
		  name: 'projectName',
		  message: 'What is the name of your project?'
		}];

		this.prompt(prompts, function (props) {
		  this.projectName = props.projectName;
		  this.appNameNoSpace = props.projectName.replace(/[ çãõáà]/g, '');

		  done();
		}.bind(this));
	},
	scaffoldFolders: function(){
		this.mkdir("app");
		this.mkdir("app/shared");
		this.mkdir("app/shared/sidebar");
		this.mkdir("app/components");
		this.mkdir("app/components/home");
		this.mkdir("app/components/dashboard");
		this.mkdir("assets");
		this.mkdir("assets/style");
		this.mkdir("assets/img");
		this.mkdir("assets/fonts");
		this.mkdir("test");
	},
	copyMainFiles: function(){
	    this.copy("_gulpfile.js", "gulpfile.js");
	    this.copy("_package.json", "package.json");
	    this.copy("assets/style/_main.scss", "assets/style/main.scss");
	    this.copy("app/_app.js", "app/app.js");

	    this.copy('_bowerrc', '.bowerrc');
  		this.copy('_bower.json', 'bower.json');

		/*this.copy('_gruntfile.js', 'Gruntfile.js');
		this.copy('_package.json', 'package.json');
		this.copy('_bower.json', 'bower.json');
		this.copy('_bowerrc', '.bowerrc');
		this.copy('_index.html', 'app/index.html');*/
	 
	 /*   var context = { 
	        site_name: this.appName 
	    };
	 
	    this.template("_header.html", "app/header.html", context);*/
	}


/*
	promptUser: function() {
        var done = this.async();
 
        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        }];
 
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;
   
            done();
        }.bind(this));
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