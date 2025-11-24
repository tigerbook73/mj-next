#!/bin/bash

# Get the project directory (directory where this script is located)
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Execute the copy command
cp "${project_dir}/../learn/mj/mj-server/src/common/" -r "${project_dir}/src/common"