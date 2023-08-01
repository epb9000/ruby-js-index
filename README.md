Build a simple JavaScript search index with Ruby.

Usage:

`build-index.rb <directory>`

Outputs porter-stemmed unique index.

`build-index.rb <directory> [search_function_name]`

Outputs a self-contained search function with the name from `search_function_name`

Example:

`build-index.rb example-directory exampleSearch > example.js`

Outputs a simple JS file to include, once included, `exampleSearch('game drill', 1);` will return something like `[{"document":"drilldozer","score":2},{"document":"longdouble","score":1}]`

The first parameter is the search term, the second is how much "fuzziness" is allowed - effectively how many characters are allowed to be different from a word in the index to count as a match.

