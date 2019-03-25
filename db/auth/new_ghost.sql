insert into ghosts(
    name,
    bio,
    type,
    user_id,
    location,
    profile_pic
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
returning *