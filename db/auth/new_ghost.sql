insert into ghosts
  (name, bio, type, user_id, profile_pic, latitude, longitude)
  values
  ($1, $2, $3, $4, $5, $6, $7)
  returning *
