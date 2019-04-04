select * from messages
where messenger = $2
or messenger = $1
and receiver in (
    select receiver from messages
    where receiver = $1
    or receiver = $2
)
order by date;
