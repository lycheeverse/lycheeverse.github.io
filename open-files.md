## Too Many Open Files

The number of concurrent network requests (`MAX_CONCURRENCY`) is set to 128 by default.

Every network request maps to an open socket, which is represented as a file on UNIX systems.
If you see error messages like "error trying to connect: tcp open error: Too
many open files (os error 24)" then you ran out of file handles.

You have two options:

1. Lower the concurrency by setting `--max-concurrency` to something more
   conservative like 32. This works, but it also comes with a performance
   penalty.
2. Increase the number of maximum file handles. See instructions
   [here](https://wilsonmar.github.io/maximum-limits/) or
   [here](https://synthomat.de/blog/2020/01/increasing-the-file-descriptor-limit-on-macos/).
