SELECT * FROM ghosts
inner join users on users.id = ghosts.user_id
left JOIN swiped on users.id = swiped.swiped_id
where swiped.swiped is Null;