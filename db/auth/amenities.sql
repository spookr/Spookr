insert into amenities(
    spiderwebs,
    basement,
    grandfather_clock,
    dolls,
    electricity,
    pets,
    house_id
)(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
)
returning *