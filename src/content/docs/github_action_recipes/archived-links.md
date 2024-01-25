---
title: Fixing broken links with archived versions
description: A guide in my new Starlight docs site.
---

[David Gardiner](https://david.gardiner.net.au/) wrote a series of blog posts
about how he used lychee-action to replace broken links on his website with
archived versions. The posts are a great example of how to use lychee-action
together with other actions to achieve a specific goal. Thanks David for the
great write-up!

To achieve this, David used the [Wayback Machine Query Github Action](https://github.com/marketplace/actions/wayback-machine-query) to query
for archived versions of broken websites. The results of the query were then fed
into the [Replace multiple strings in files action](https://github.com/marketplace/actions/replace-multiple-strings-in-files)
to update the files.

Here are the links to the blog posts which explain the process in more detail:

- [Fixing my blog (part 2) - Broken links](https://david.gardiner.net.au/2022/04/blog-fix-part2.html)
- [Fixing my blog (part 3) - Querying the Wayback Machine](https://david.gardiner.net.au/2022/04/blog-fix-part3.html)
- [Fixing my blog (part 4) - Updating the files](https://david.gardiner.net.au/2022/04/blog-fix-part4.html)
