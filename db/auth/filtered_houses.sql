SELECT * FROM homeowner
inner join users on users.id = homeowner.user_id
inner join house on homeowner.id = house.owner
left JOIN swiped on users.id = swiped.user_id
where swiped = null;