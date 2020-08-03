# Fastify Faux Modules Testing

- [About](#about)
- [Get Started](#get-started)
- [Comments](#comments)

## About

Repository created to address <https://github.com/fastify/fastify/issues/2404>.

## Get Started

1. `cd csj` or `cd esm`
2. `npm i`
3. `npm start`
4. Test **csj** folder build using <http://127.0.0.1:8000>, and <http://127.0.0.1:9000> for the **esm** folder.

## Comments

- I have created two folders to highlight how TypeScript behaves when `esModuleInterop` is either true or false.
  - `esModuleInterop` is set to **FALSE** for the [csj](./csj) (CommonJS) folder and default imports are done using `import * as defaultModule from 'module'`.
  - `esModuleInterop` is set to **TRUE** for the [esm](./esm) (ES Modules) folder and default imports are done using `import defaultModule from 'module'`.
- I locked fastify and plugin versions to versions that match the problem being discussed in afore-mentioned GitHub issue.
- For **csj** folder I copied the types for all 4 plugins used into the **typings** folder and ensured the default export is done using the `export =` form because `export default` does not work when `"esModuleInterop": false`.
  - For `fastify-cookie` I also modified the types to move the named exports into a declared namespace (`declare namespace fastifyCookie {...}`).
  - For `fastify-session` I also had to modify the types (copied from [here](https://github.com/SerayaEryn/fastify-session/pull/119)) because installed types are not compatible with fastify v3.
  - For `fastify-websocket` I copied the types from this pull request: <https://github.com/fastify/fastify-websocket/pull/73>
- For the **esm** folder I used the official types because they use the `export default` form which works with `"esModuleInterop": true`.

**IMPORTANT** to note that the `fastify-session` import in the **esm** folder uses the same types from the **csj** folder (see `paths` property in [./esm/tsconfig.json](./esm/tsconfig.json)). The point of this is to show that `export =` works regardless if `esModuleInterop` is true or false, whilst `export default` works on when `esModuleInterop` is true.
