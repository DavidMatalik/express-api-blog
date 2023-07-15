# Project Title

API Express Blog

## Description

This project aims to create a backend with a restful api which can be consumed by different frontends.

# Get Started

1. Clone project locally e.g. via ssh.

```bash
git clone git@github.com:DavidMatalik/express-api-blog.git
```

2. Install dependencies.

```bash
npm i
```

3. Setup your own mongo DB, e.g. through [following these instructions.](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database)

4. Create a .env file in the root of your project. Put there the link of your mongoDB. If you instructions from point 3, you can get the link from point 10 - 12. The entry should have the following format.

```
MONGODB_URI='mongodb+srv://<username>:<password>@cluster0.l45nfrv.mongodb.net/?retryWrites=true&w=majority'
```

5. Start the server.

```bash
npm run serverstart
```

6. Test your app via curl or e.g. postman.

```
# GET REQUEST
http://localhost:3000/posts
```
