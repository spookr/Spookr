select * from matches
inner join homeowner on homeowner.user_id = matches.matched_user
inner join users on users.id = homeowner.user_id
inner join house on house.owner = homeowner.id
where swipping_user = $1
