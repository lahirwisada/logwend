#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <D:\www\kpk\MySQL-UDF\CURL\curl-master\include\curl\curl.h>

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

extern "C" bool lws_http_post_init(UDF_INIT *initid, UDF_ARGS *args, char *message) {
  st_curl_results *container;

  if (args->arg_count != 2)
  {
    strncpy(message,
            "two arguments must be supplied: http_post('<url>','<data>').",
            MYSQL_ERRMSG_SIZE);
    return 1;
  }

  args->arg_type[0]= STRING_RESULT;

  initid->max_length= CURL_UDF_MAX_SIZE;
  container= (st_curl_results *)malloc(sizeof(st_curl_results));

  initid->ptr= (char *)container;

  return 0;
}

extern "C" char *lws_http_post(UDF_INIT *initid, UDF_ARGS *args,
                char *result,
               unsigned long *length,
                char *is_null,
                char *error)
{
    CURLcode retref;
  CURL *curl;
  st_curl_results *res= (st_curl_results *)initid->ptr;

  curl_global_init(CURL_GLOBAL_ALL);
  curl= curl_easy_init();

  res->result= NULL;
  res->size= 0;

  if (curl)
  {
    struct curl_slist *chunk = NULL;
    chunk = curl_slist_append(chunk, "Expect:");  
  
    curl_easy_setopt(curl, CURLOPT_URL, args->args[0]);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, result_cb);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void *)res);
    curl_easy_setopt(curl, CURLOPT_USERAGENT, "mysql-udf-http/1.0");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, chunk);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, args->args[1]);
    retref= curl_easy_perform(curl);
    if (retref) {
      fprintf(stderr, "error\n");
      if (res->result)
        strcpy(res->result,"");
      res->size = 0;
    }
  }
  curl_easy_cleanup(curl);
  *length= res->size;
  return ((char *) res->result);
}

extern "C" void lws_http_post_deinit(UDF_INIT *initid) {
  /* if we allocated initid->ptr, free it here */
  st_curl_results *res= (st_curl_results *)initid->ptr;

  if (res->result)
    free(res->result);
  free(res);
  return;
}