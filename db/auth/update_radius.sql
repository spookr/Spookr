update ghosts
set radius = $2
where user_id = $1
returning*;
