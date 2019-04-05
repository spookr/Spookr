select * from messages
where messenger = $2
or messenger = $1
and receiver in (
    select receiver from messages
    where receiver = $2
    or receiver = $1
)
order by date;
