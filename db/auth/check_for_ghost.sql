select * from users
inner join ghosts on users.id = ghosts.user_id
where username = $1;