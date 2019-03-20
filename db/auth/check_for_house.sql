select * from homeowner
inner join house on homeowner.id = house.owner
inner join users on homeowner.user_id = users.id
where users.username = $1;