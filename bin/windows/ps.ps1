#Powershell command to download electron-v0.31.0-win32-x64.zip from the web directly
#And Unzip it

#Make an authenticated web request using Powershell commands
$client = new-object System.Net.WebClient

#Downloads the resource with the specified URI to a local file
$client.DownloadFile("https://github.com/atom/electron/releases/download/v0.31.0/electron-v0.31.0-win32-x64.zip", "electron-v0.31.0-win32-x64.zip")

#Get the current path to the $currentPath variable
$currentPath=Split-Path ((Get-Variable MyInvocation -Scope 0).Value).MyCommand.Path

#Create new shell object
$shell = new-object -com shell.application

#Get the zip file
$zip = $shell.NameSpace("$currentPath\electron-v0.31.0-win32-x64.zip")

#Unzip the file ($zip)
foreach($item in $zip.items())
{
$shell.Namespace($currentPath).copyhere($item)
}