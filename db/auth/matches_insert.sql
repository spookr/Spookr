insert into matches(
    swipping_user,
    matched_user
)values(
    $1,
    $2
);

insert into matches(
    swipping_user,
    matched_user
)values(
    $2,
    $1
);
