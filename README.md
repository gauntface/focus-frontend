# Focus Frontend

![The Focus Logo](default-social.png)

This site is the frontend for [focus.gaunt.dev](https://focus.gaunt.dev).

## Running Locally

1. Create a `.env.local` file with the following:

    ```env
    VITE_PUBLIC_FIREBASE_PROJECT_ID=<Firebase Project ID>
    VITE_PUBLIC_FIREBASE_APP_ID=<Firebase App ID>
    VITE_PUBLIC_FIREBASE_API_KEY=<Firebase API Key>
    VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=<Firebase App>
    VITE_PUBLIC_API_SERVER=http://localhost:3001
    ```

1. Install deps

    ```bash
    pnpm install
    ```

1. Run dev server

    ```bash
    pnpm run dev
    ```

1. Test project for CI

    ```bash
    pnpm run ci
    ```
