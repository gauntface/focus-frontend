#!/bin/bash -x

exec cd build && pnpm remix-serve ./server/index.js
