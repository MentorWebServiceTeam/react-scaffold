# react-scaffold
React project scaffolding

## Getting Started
```sh
git clone git@github.com:MentorWebServiceTeam/react-scaffold.git

npm install
```

Open two terminal windows, then open http://localhost:8080/home in your browser.
```sh
# Window 1
npm run dev

# Window 2
npm run webpack:watch
```

(Optional) Create a .env file in the project root. This is ignored by default.
```sh
# Example
NODE_ENV=development
PORT=8080
SECRET=shhh
```

## Tests & Coverage
```sh
npm run test
# or
npm run test:watch
# or
npm run test:cov
```

## Additional Features
This project supports the Redux Dev Tools Google Chrome/Firefox extensions. This is a highly recommended state debugging tool.
