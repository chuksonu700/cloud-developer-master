export const config = {
  "dev": {
    "username": process.env.usernam,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": process.env.dialect,
    "aws_region":process.env.aws_region,
    "aws_profile": process.env.aws_profile,
    "aws_media_bucket": process.env.aws_media_bucket
  },
  "jwt": {
    "secret": " "
  },
  "prod": {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": process.env.dialect,
  }
}
