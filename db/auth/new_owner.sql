insert into homeowner(
    first_name,
    last_name,
    user_id,
    profile_pic,
    bio
  )VALUES(
    $1,
    $2,
    $3,
    $4,
    $5
    )
returning *;