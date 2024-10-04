@echo off
if exist "../Pgv.root/public/remotes/%npm_package_name%/" (
 echo Cleaning root project folder...
 rmdir "../Pgv.root/public/remotes/%npm_package_name%" /s /q
)
echo Moving build to root project folder...
xcopy "dist\*.*" "../Pgv.root/public/remotes/%npm_package_name%" /C /S /D /Y /I