INSERT INTO house
(header, body, rooms, remodeled, amenities, owner, living_occupants, latitude, longitude)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8,$9)
returning *;