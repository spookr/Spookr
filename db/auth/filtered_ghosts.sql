-- SELECT * FROM ghosts
-- inner join users on users.id = ghosts.user_id
-- left JOIN swiped on users.id = swiped.swiped_id
-- where swiped.swiped is Null;

SELECT * FROM ghosts
inner join users on users.id = ghosts.user_id
left join swiped on users.id = swiped.swiped_id
where users.id not in (
select swiped_users from swiped
    where swiped_id = $1
);