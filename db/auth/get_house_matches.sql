select * from matches
inner join ghosts on ghosts.user_id = matches.matched_user
where logged_user = $1