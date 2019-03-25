INSERT INTO house
(header, body, rooms, location, remodeled, amenities, owner, living_occupants)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8)
returning *;