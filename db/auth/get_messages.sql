select * from messages
where messenger = $1 	where messenger = $2
or messenger = $2	or messenger = $1
order by date; 	and receiver in (
    select receiver from messages
    where receiver = $1
    or receiver = $2
)
order by date;
