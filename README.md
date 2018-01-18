# Diary

## How to dev

- Create file desenv.config.js on /api/src/config
- Overhide what you want that is in index.js file in this directory (like mongo url, for example)
- On terminal:
    - `cd /api`
    - `npm run dev`
- On Browser:
    - `http://localhost:5000/exchanges` 

## Tips

- docker build -t hackershall-dev-i -f dev.dockerfile .
- docker run --name hackershall-dev-app -p 7000:7000 -v $(pwd):/var/app hackershall-dev-i

## Todo's

- DO the Docker works for develop
- Verify this security problem: https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
