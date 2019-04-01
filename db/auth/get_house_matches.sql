select * from matches
inner join ghost on ghost.user_id = matches.matched_user
where logged_user = $1