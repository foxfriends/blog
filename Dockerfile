FROM node:20

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN cargo install outline --features bin

RUN cargo install syncat@3.8.4
RUN syncat install bash
RUN syncat install c
RUN syncat install css
RUN syncat install haskell
RUN syncat install hcl
RUN syncat install html
RUN syncat install javascript
RUN syncat install json
RUN syncat install prolog
RUN syncat install python
RUN syncat install rust
RUN syncat install sql
RUN syncat install swift
RUN syncat install typescript
RUN syncat install yaml

WORKDIR /app

COPY vendor/                            ./vendor/

COPY package.json package-lock.json     ./
RUN npm ci

COPY compile-articles.js bundler.js     ./
COPY fonts.css index.html 404.html      ./
COPY svelte.config.mjs vite.config.js   ./
COPY src/                               ./src/
COPY article/                           ./article/
RUN npm run build
