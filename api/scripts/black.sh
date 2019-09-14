#!/bin/bash

find . -name "*.py" -print0 | while read -d $'\0' file
do
    black "$file" > /dev/null 2>&1
done

echo "All done! All files have been formatted with Black."
