#!/bin/bash

zip_filename="feedback-form-submission.zip"

exclude_patterns=(".vscode/*", ".nx/*" "dist/*" "node_modules/*" "apps/web/.next/*" "*.DS_Store")

zip_command="zip -r \"$zip_filename\" ."
for pattern in "${exclude_patterns[@]}"; do
    zip_command+=" -x \"$pattern\""
done

eval $zip_command