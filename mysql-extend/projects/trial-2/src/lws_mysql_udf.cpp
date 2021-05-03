#include <string.h>

/*
#include <D:\www\kpk\MySQL-UDF\CURL\curl-master\include\curl\curl.h>
*/

#include <C:\Program Files\MySQL\MySQL Server 8.0\include\mysql.h>
#include <C:\Program Files\MySQL\MySQL Server 8.0\include\mysql\udf_registration_types.h>

#include <D:\www\kpk\logwend\mysql-extend\projects\trial-2\src\lws_mysql_udf.h>

using namespace std;

static void *myrealloc(void *ptr, size_t size)
{
  /* There might be a realloc() out there that doesn't like reallocing
     NULL pointers, so we take care of it here */
  if (ptr)
    return realloc(ptr, size);
  else
    return malloc(size);
}

static size_t
result_cb(void *ptr, size_t size, size_t nmemb, void *data)
{
  size_t realsize= size * nmemb;
  struct st_curl_results *res= (struct st_curl_results *)data;

  res->result= (char *)myrealloc(res->result, res->size + realsize + 1);
  if (res->result)
  {
    memcpy(&(res->result[res->size]), ptr, realsize);
    res->size += realsize;
    res->result[res->size]= 0;
  }
  return realsize;
}

extern "C" bool lws_mysql_udf_hello_init(UDF_INIT *initid, UDF_ARGS *args, char *message) {
  return false;
}

extern "C" char *lws_mysql_udf_hello(UDF_INIT *initid, UDF_ARGS *args,
                char *result,
               unsigned long *length,
                char *is_null,
                char *error)
{
    return strcat((char *) args->args[0], "hallo ");
}

extern "C" void lws_mysql_udf_hello_deinit(UDF_INIT *initid) {
  if (initid->ptr) free(initid->ptr);
}