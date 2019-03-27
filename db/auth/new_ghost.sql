insert into ghosts(
    name,
    bio,
    type,
    user_id,
    profile_pic,
    lat, 
    lng
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
)
returning *
