select * from matches
inner join homeowner on homeowner.user_id = matches.matched_user
inner join house on house.owner = homeowner.id
where logged_user = $1