### 拓展 printf
依照 &lt;printf.h&gt; 中指定的拓展说明可以实现对格式化输出的拓展。
Mac OX 已经对 printf 做了部分拓展。

``` cpp
/* Type of a printf specifier-handler function.
   STREAM is the FILE on which to write output.
   INFO gives information about the format specification.
   ARGS is a vector of pointers to the argument data;
   the number of pointers will be the number returned
   by the associated arginfo function for the same INFO.

   The function should return the number of characters written,
   or -1 for errors.  */

typedef int printf_function (FILE *__stream,
		const struct printf_info *__info,
		const void *const *__args);


/* Type of a printf specifier-arginfo function.
   INFO gives information about the format specification.
   N, ARGTYPES, *SIZE has to contain the size of the parameter for
   user-defined types, and return value are as for parse_printf_format
   except that -1 should be returned if the handler cannot handle
   this case.  This allows to partially overwrite the functionality
   of existing format specifiers.  */

typedef int printf_arginfo_size_function (const struct printf_info *__info,
		size_t __n, int *__argtypes,
		int *__size);



/* Register FUNC to be called to format SPEC specifiers; ARGINFO must be
   specified to determine how many arguments a SPEC conversion requires and
   what their types are.  */

extern int register_printf_specifier (int __spec, printf_function __func,
		printf_arginfo_size_function __arginfo)
	__THROW;
```
