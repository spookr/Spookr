INSERT INTO house
(header, body, rooms, remodeled, owner, living_occupants, latitude, longitude)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8)
returning *;