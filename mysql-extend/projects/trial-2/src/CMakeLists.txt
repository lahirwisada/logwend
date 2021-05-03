PROJECT(lws_mysql_udf_hello)

# Path for MySQL include directory
INCLUDE_DIRECTORIES("C:\Program Files\MySQL\MySQL Server 8.0\include")

ADD_DEFINITIONS("-DHAVE_DLOPEN")
ADD_LIBRARY(lws_mysql_udf MODULE lws_mysql_udf.cpp lws_mysql_udf.def)
TARGET_LINK_LIBRARIES(lws_mysql_udf wsock32)