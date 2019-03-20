insert into homeowner(
    first_name,
    last_name,
    user_id
  )VALUES(
    $1,
    $2,
    $3
    )
returning *;