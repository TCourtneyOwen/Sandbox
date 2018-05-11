import * as fs from 'fs';
import * as path from 'path';
import * as yo from 'yeoman-generator';
var shell = require('shelljs');
var assert = require('assert');
const stringBuildStart = 'Generate and build ';
const stringBuildSucceeds = 'Install and build succeeds';
const yoOffice = 'yo office';
const output = '--output';
const js = '--js';
const ts = '--ts';
const javascript = 'Javascript';
const typescript = 'Typescript';
const space = ' ';
const angular = 'Angular';
const customFunctions = 'ExcelCustomFunctions';
const jquery = 'Jquery';
const manifest = 'Manifest';
const react = 'React';
let jsTemplates = [angular, jquery, manifest];
let tsTemplates = [angular, customFunctions, jquery, manifest, react];
let hostsTemplates = ['Excel', 'Onenote', 'Outlook','Powerpoint', 'Project', 'Word'];


describe('Setup test environment for Yo Office build tests', () => {
    it ('Install Yeoman Generator and Install local install of Yo Office and link', function(done){
        _setupTestEnvironment();
        done();
    });
}); 

// Build Typescript project types for all supported hosts
for (var i = 0; i < hostsTemplates.length; i++)
{
    for (var j = 0; j < tsTemplates.length; j++)
    {
        // Skip generate and build if the project type is ExcelCustomFunctions but the host isn't Excel
        if (tsTemplates[j] == customFunctions && hostsTemplates [i] != 'Excel')
        {
            continue;
        }
        describe('Install and build projects', () => {
            let projectType = tsTemplates[j];
            let projectName = '';
            let host = hostsTemplates[i];
            let projectFolder = '';
            let scriptType = typescript;
        
            describe(stringBuildStart +  host + space + projectType + space + typescript, () => {
                before(function(){
                    projectName = projectType + host + typescript;
                    projectFolder = path.join(__dirname, '/', projectName);
                  });
                it(stringBuildSucceeds,function(done){  
                    _generateProject(projectType, projectName, host, projectFolder, scriptType);
                    _buildProject(projectFolder, projectType);
                    done();                    
                  });
              }); 
            });
        }
    }

// Build Javascript project types for all supported hosts
for (var i = 0; i < hostsTemplates.length; i++)
{
    for (var j = 0; j < jsTemplates.length; j++)
    {
        describe('Install and build projects', () => {
            let projectType = jsTemplates[j];
            let projectName = '';
            let host = hostsTemplates[i];
            let projectFolder = '';
            let scriptType = javascript;
        
            describe(stringBuildStart +  host + space + projectType + space + javascript, () => {
                before(function(){
                    projectName = projectType + host + javascript;
                    projectFolder = path.join(__dirname, '/', projectName);
                  });
                it(stringBuildSucceeds,function(done){         
                    _generateProject(projectType, projectName, host, projectFolder, js);
                    _buildProject(projectFolder, projectType);
                    done();
                  });
              }); 
            });
        }
    }
    
function _setupTestEnvironment()
{
    shell.exec('npm install -g yo', {silent: true}); 
    shell.exec('npm install', {silent: true});
    shell.exec('npm link', {silent: true});
}

function _generateProject(projectType, projectName, host, projectFolder, scriptType)
{
    if (scriptType == javascript){
        shell.exec(yoOffice + space + projectType + space + projectName + space + host + space + output + space + projectFolder + space + js, {silent: true});
    }
    else{
        shell.exec(yoOffice + space + projectType + space + projectName + space + host + space + output + space + projectFolder + space + ts, {silent: true});
    } 
}

function _buildProject(projectFolder, projectType)
{
    if (_projectFolderExists(projectFolder))
    {
        if (projectType != manifest || projectType != customFunctions)
        {
            const failure = 'error';
            shell.cd(projectFolder);
            let buildOutput = shell.exec('npm run build', {silent: true}).stdout;
            assert.equal(buildOutput.toLowerCase().indexOf(failure), -1, "Build output contained errors");
            shell.cd(__dirname);
        }
        // do clean-up after test runs
        // _deleteFolderRecursively(projectFolder);
    }
    else
    {
        assert(false, projectFolder + " doesn't exist");
    }
}

function _projectFolderExists (projectFolder)
 {      
   if (fs.existsSync(projectFolder))
     {
       if (fs.readdirSync(projectFolder).length > 0)
       {          
         return true;
       }
     }
     return false;
 }

function _deleteFolderRecursively(projectFolder) 
{
    if(fs.existsSync(projectFolder))
    {
        fs.readdirSync(projectFolder).forEach(function(file,index){ 
        var curPath = projectFolder + "/" + file; 
        
        if(fs.lstatSync(curPath).isDirectory())
        {
            _deleteFolderRecursively(curPath);
        }
        else
        {
            fs.unlinkSync(curPath);
        }
    }); 
    fs.rmdirSync(projectFolder); 
    }
};