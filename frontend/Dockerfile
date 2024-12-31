# Find image versions here: https://gallery.ecr.aws/docker/library/node

# Builder image
FROM public.ecr.aws/docker/library/node:22.7.0-slim AS builder
ENV VITE_MODE=dev
WORKDIR /frontend
COPY . .
RUN ls -l
RUN npm install
RUN ["sh", "-c", "npm run build -- --mode $VITE_MODE"]

# Web image
FROM public.ecr.aws/docker/library/node:22.7.0-slim AS runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3000 NODE_ENV=production
ENV AWS_LWA_ENABLE_COMPRESSION=true
WORKDIR /frontend
COPY --from=builder /frontend/build ./build
COPY --from=builder /frontend/package.json ./package.json
RUN npm install --omit=dev

CMD ["npm", "run", "start"]
