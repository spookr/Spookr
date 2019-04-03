select * from messages
where messenger = $1 
or messenger = $2
order by date;