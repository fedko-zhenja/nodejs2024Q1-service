# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---

## Users

### GET All Users:

- **Method:** GET
- **URL:** [http://localhost:4000/user](http://localhost:4000/user)

### GET User by ID:

- **Method:** GET
- **URL:** [http://localhost:4000/user/:id](http://localhost:4000/user/:id)
- **Description:** Replace :id with the ID of the user you want to retrieve.

### Create User:

- **Method:** POST
- **URL:** [http://localhost:4000/user](http://localhost:4000/user)
- **Body (JSON):**
  ```json
  {
    "login": "example_user",
    "password": "password123"
  }
  ```

### Update User Password:

- **Method:** PUT
- **URL:** [http://localhost:4000/user/:id](http://localhost:4000/user/:id)
- **Description:** Replace :id with the ID of the user you want to update.
- **Body (JSON):**
  ```json
  {
    "oldPassword": "old_password",
    "newPassword": "new_password"
  }
  ```

### Delete User:

- **Method:** DELETE
- **URL:** [http://localhost:4000/user/:id](http://localhost:4000/user/:id)
- **Description:** Replace :id with the ID of the user you want to delete.

## Tracks, Artists, Albums

Replace resource with track, artist, or album for the respective endpoints.

### GET All:

- **Method:** GET
- **URL:** [http://localhost:4000/resource](http://localhost:4000/resource)

### GET by ID:

- **Method:** GET
- **URL:** [http://localhost:4000/resource/:id](http://localhost:4000/resource/:id)
- **Description:** Replace :id with the ID of the resource you want to retrieve.

### Create:

- **Method:** POST
- **URL:** [http://localhost:4000/resource](http://localhost:4000/resource)
- **Body (JSON):** Provide the necessary fields for the resource.

### Update:

- **Method:** PUT
- **URL:** [http://localhost:4000/resource/:id](http://localhost:4000/resource/:id)
- **Description:** Replace :id with the ID of the resource you want to update.
- **Body (JSON):** Provide the fields you want to update.

### Delete:

- **Method:** DELETE
- **URL:** [http://localhost:4000/resource/:id](http://localhost:4000/resource/:id)
- **Description:** Replace :id with the ID of the resource you want to delete.

## Favorites

### GET All Favorites:

- **Method:** GET
- **URL:** [http://localhost:4000/favs](http://localhost:4000/favs)

### Add Track to Favorites:

- **Method:** POST
- **URL:** [http://localhost:4000/favs/track/:id](http://localhost:4000/favs/track/:id)
- **Description:** Replace :id with the ID of the track you want to add to favorites.

### Delete Track from Favorites:

- **Method:** DELETE
- **URL:** [http://localhost:4000/favs/track/:id](http://localhost:4000/favs/track/:id)
- **Description:** Replace :id with the ID of the track you want to remove from favorites.

### Add Album to Favorites:

- **Method:** POST
- **URL:** [http://localhost:4000/favs/album/:id](http://localhost:4000/favs/album/:id)
- **Description:** Replace :id with the ID of the album you want to add to favorites.

### Delete Album from Favorites:

- **Method:** DELETE
- **URL:** [http://localhost:4000/favs/album/:id](http://localhost:4000/favs/album/:id)
- **Description:** Replace :id with the ID of the album you want to remove from favorites.

### Add Artist to Favorites:

- **Method:** POST
- **URL:** [http://localhost:4000/favs/artist/:id](http://localhost:4000/favs/artist/:id)
- **Description:** Replace :id with the ID of the artist you want to add to favorites.

### Delete Artist from Favorites:

- **Method:** DELETE
- **URL:** [http://localhost:4000/favs/artist/:id](http://localhost:4000/favs/artist/:id)
- **Description:** Replace :id with the ID of the artist you want to remove from favorites.

---
