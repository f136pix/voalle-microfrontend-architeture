#! /bin/bash
if [ -d "../Pgv.root/public/remotes/$npm_package_name" ]; then
  echo Cleaning root project folder...
  rm -r "../Pgv.root/public/remotes/$npm_package_name"
fi

echo Moving build to root project folder...
mkdir -p "../Pgv.root/public/remotes/$npm_package_name"
cp -r "./dist/assets" "../Pgv.Root/public/remotes/$npm_package_name"
cp -r "./dist/index.html" "../Pgv.Root/public/remotes/$npm_package_name"