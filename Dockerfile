FROM node:20

RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN cargo install outline --features bin

RUN cargo install syncat@3.6.0
RUN syncat install bash
RUN syncat install css
RUN syncat install haskell
RUN syncat install html
RUN syncat install javascript
RUN syncat install prolog
RUN syncat install python
RUN syncat install rust
RUN syncat install sql
RUN syncat install swift


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
