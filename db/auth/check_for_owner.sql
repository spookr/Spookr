select * from users 
inner join homeowner on users.id = homeowner.user_id
where username = $1;