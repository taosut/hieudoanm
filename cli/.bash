#!/bin/bash

function myhelp() {
  echo "aupdate - apt-get update"
  echo "bupdate - brew update"
  echo "gpush - git push"
  echo "greset - git reset"
  echo "gupdatermt - git remote update"
}

function myaupdate() {
  sudo apt-get upgrade
  sudo apt-get update
  sudo apt autoremove
}

function mybupdate() {
  brew upgrade
  brew update
  brew cleanup
  yarn global upgrade --latest
  yarn global list
}

function mygpush() {
	git add .
	git status
	git commit -m $1
	git push
}

function mygreset {
	git reset --hard
	git clean -f -d
}

function mygupdatermt {
	git remote -v
	git remote set-url origin $1
	git remote -v
}