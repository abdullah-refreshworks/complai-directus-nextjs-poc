export default {
  id: 'custom-endpoint',
  handler: (router) => {
    router.get('/', (req, res) => {
      res.json({ message: 'Hello from custom endpoint!' });
    });
  },
};
