update house
 set header = $2,
 body = $3
where owner = $1;