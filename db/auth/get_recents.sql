select * from messages
where receiver = $1
or messenger = $1
order by date DESC
limit 1;