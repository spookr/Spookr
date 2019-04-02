update homeowner
 set first_name = $2,
 last_name = $3,
 bio = $4,
 profile_pic = $5
where user_id = $1;