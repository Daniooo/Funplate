Funplate
========

JS Template Engine fun project.

Configuration
=============

- target:
Selector (must be described further) for rendered content to be stored.

- template:
Selector (must be described further) of template to use later

- data:
Source for data to be rendered with template

- source:
Source type for data (default is json) maybe could be something like ajax

- update:
Can be used to refresh template based on an interval. Default is false.
Possible options could be replace (replace full content with new data) or
append (append new data to already rendered content)

- interval:
Interval in secounds to update content if update option is set default is 10

- fallback:
Fallback template or content to display if rendering fails