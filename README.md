# reservations

## CRUD API

### Create: User (userId) makes a reservation for listing (roomId)
POST /api/reservations/:roomId/:userId
Content-Type: 'application/json'

### Read/Retrieve: Gets all reversations under listing (roomId)
GET /api/reservations/:roomId
Content-Type: 'application/json'

### Update: Change reversation with reservationId
PUT /api/reservations/:reservationId
Content-Type: 'application/json'

### Delete: Delete reversation with reservationId
DELETE /api/reservations/:reservationId
Content-Type: 'application/json'