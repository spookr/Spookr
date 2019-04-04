select * from matches
inner join ghosts on ghosts.user_id = matches.matched_user
inner join users on users.id = ghosts.user_id
where swipping_user = $1
