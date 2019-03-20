insert into ghosts(
    name,
    bio,
    gender,
    type,
    user_id,
    location
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
returning *