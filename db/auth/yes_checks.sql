select * from swiped
where swiped_users = 1
and swiped = true
and swiped_id not in (
select swiped_users from swiped
where swiped = false
and swiped_id = 1 
)