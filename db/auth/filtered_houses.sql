SELECT * FROM homeowner
inner join users on users.id = homeowner.user_id
inner join house on homeowner.id = house.owner
left join swiped on users.id = swiped.swiped_id
where users.id not in (
select swiped_id from swiped
where swiped_users = $1
and swiped = false
) and users.id not in (
    select swiped_users from swiped
    where swiped_id = $1
)

