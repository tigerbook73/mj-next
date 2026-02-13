#!/bin/bash

# Get the project directory (directory where this script is located)
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Execute the copy command
rm -rf "${project_dir}/src/common"
cp -r "${project_dir}/../mj/shared/src/" "${project_dir}/src/common"