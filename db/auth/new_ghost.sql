insert into ghosts(
    name,
    bio,
    type,
    user_id,
    profile_pic,
    latitude, 
    longitude,
    radius,
    town,
    state
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10
)
returning *;
