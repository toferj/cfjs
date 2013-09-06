CFJS 1.3.2
====

This release of CFJS adds two new requested functions: ReReplace and ReReplaceNoCase. There is a caveat though regarding the backslash (\) character. The backslash is used to escape special strings in JavaScript. Now, take for example the Regular Expression Metacharacters \w (find a word character) \s (find a white space character) and others. Given the example:

	$.ReReplace("cfjs rocks","\s","^","all"); // replace all whitespace characters with the carrot (^) character.

we would expect to see:
	
	cfjs^rocks

but instead we would get:

	cfj^ rock^

This is because JavaScript didn't pass "\s" to the ReReplace function. Instead it passed "s" and ignored the escape character. To pass a litteral backslash it has to be escaped like so:

	$.ReReplace("cfjs rocks","\\s","^","all"); // escape the backslash with another backslash fixes our problem.

now we get:
	
	cfjs^rocks

Another point to note is that I allowed both ReReplace and ReReplaceNoCase to accept either a string representation of the RegExp (as in the examples above) or an actual JavaScript RegExp object. This is a deviation from how the CF method works, but I thought this would make it more flexible. So both of the following are valid:

	$.ReReplace(string1,new RegExp('\\s','g'),"^","all")

	$.ReReplace(string1,/\s/,"^","all") // note that because we're using the forward slashes to deliniate the regular expression, there is no need to escape the backslash

