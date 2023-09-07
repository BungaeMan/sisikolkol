#!/bin/bash

# This is a file called "pre-install" in the root of the project

if [[ "$EAS_BUILD_PLATFORM" == "android" ]]; then

  sudo apt-get install -y git-lfs && git lfs install;
elif [[ "$EAS_BUILD_PLATFORM" == "ios" ]]; then
  brew install -f git-lfs && git lfs install;
fi
