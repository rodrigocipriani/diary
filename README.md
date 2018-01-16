# Diary

# Tips

- docker build -t hackershall-dev-i -f dev.dockerfile .
- docker run --name hackershall-dev-app -p 7000:7000 -v $(pwd):/var/app hackershall-dev-i

## Todo's

- DO the Docker works for develop
- Verify this security problem: https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
