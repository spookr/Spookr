select * from matches
inner join ghost on ghost.user_id = matches.matched_user
inner join users on users.id = homeowner.user_id
where swipping_user = $1
