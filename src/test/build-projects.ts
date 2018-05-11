import * as fs from 'fs';
import * as path from 'path';
var shell = require('shelljs');
var assert = require('assert');
let installOutput = '';
let buildOutput = '';
const failure = 'error';
const stringBuildStart = 'Generate and build ';
const stringBuildSucceeds = 'Install and build succeeds';
const yoOffice = 'yo office';
const output = '--output';
const javascript = '--js';
const space = ' ';

describe('Install and build projects', () => {
    let projectType = '';
    let projectName = '';
    let host = '';
    let projectFolder = '';
    let js = false;

    // Build React Excel Typescript project
    describe(stringBuildStart + 'React Excel Typescript', () => {
        before(function(){
            projectType = 'React'
            projectName = 'ReactExcelTs';
            host = 'Excel';
            projectFolder = path.join(__dirname, '/', projectName);
            js = false;
          });
        it(stringBuildSucceeds,function(done){         
            _generateProject(projectType, projectName, host, projectFolder, js);
            _buildProject(projectFolder);
            done();
          });
      });

    // Build Angular Excel Javascript project
    describe(stringBuildStart + 'React Excel Javascript', () => {
        before(function(){
            projectType = 'Angular'
            host = 'Excel';
            projectName = projectType + host + 'Js';
            projectFolder = path.join(__dirname, '/', projectName);
            js = true;
          });
        it(stringBuildSucceeds,function(done){
            _generateProject(projectType, projectName, host, projectFolder, js);
            _buildProject(projectFolder);
            done();
          });
      });

    // Build Jquery Excel Javascript project
    describe(stringBuildStart + 'JQuery Excel Javascript', () => {
        before(function(){
            projectType = 'Jquery'
            host = 'Excel';
            projectName = projectType + host + 'Js';
            projectFolder = path.join(__dirname, '/', projectName);
            js = true;
          });
        it(stringBuildSucceeds,function(done){
            _generateProject(projectType, projectName, host, projectFolder, js);
            _buildProject(projectFolder);
            done();
          });
      });
    });   

function _generateProject(projectType, projectName, host, projectFolder, js)
{
    if (js){
        installOutput = shell.exec(yoOffice + space + projectType + space + projectName + space + host + space + output + space + projectFolder + space + javascript, {silent: true}).stdout;
    }
    else{
        installOutput = shell.exec(yoOffice + space + projectType + space + projectName + space + host + space + output + space + projectFolder, {silent: true}).stdout;
    }
    console.log('This is the install output' + installOutput);
    assert.equal(installOutput.indexOf(failure), -1, "Install output contained errors");    
}

function _buildProject(projectFolder)
{
    if (_projectFolderExists(projectFolder))
    {
        shell.cd(projectFolder);
        buildOutput = shell.exec('npm run build', {silent: true}).stdout;
        assert.equal(buildOutput.toLowerCase().indexOf(failure), -1, "Build output contained errors");
        shell.cd(__dirname);
        _deleteFolderRecursively(projectFolder);
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