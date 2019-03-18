insert into users(
   username,
   password,
   ghost
)values(
    $1,
    $2,
    $3
)

returning id, ghost;