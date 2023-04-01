# Focus Frontend

![The Focus Logo](default-social.png)

This site is the frontend for [focus.gaunt.dev](https://focus.gaunt.dev).

## Running Locally

1. Create a `.env.local` file with the following:

    ```env
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=<Firebase Project ID>
    NEXT_PUBLIC_FIREBASE_APP_ID=<Firebase App ID>
    NEXT_PUBLIC_FIREBASE_API_KEY=<Firebase API Key>
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<Firebase App>
    NEXT_PUBLIC_API_SERVER=http://localhost:3001
    ```

1. Install deps

    ```bash
    npm install
    ```

1. Run dev server

    ```bash
    npm run dev
    ```

1. Test project for CI

    ```bash
    npm run ci
    ```
