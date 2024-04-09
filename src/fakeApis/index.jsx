import { createServer, Model } from "miragejs";
const urls = (url) => {
  return `miragejs/api/${url}`;
};
const setupServer = () => {
  let server = createServer({
    models: {
      accounts: Model,
    },
    routes() {
      this.get(urls("accounts"), (schema) => {
        return schema.accounts.all();
      });
      this.post(urls("accounts"), (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        return schema.accounts.create(payload);
      });

      this.post(urls("updateAccount"), (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        const currenAccount = schema.accounts.find(payload.id);
        currenAccount.update(payload);
      });
    },
  });
};
export { urls, setupServer };
