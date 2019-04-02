INSERT INTO house
(header, body, rooms, remodeled, owner, latitude, longitude)
VALUES
($1,$2,$3,$4,(select id from homeowner where user_id = $5), $6, $7)
returning *;

