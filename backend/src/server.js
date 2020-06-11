import app from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `⚡️  Server listening on ${process.env.PROTOCOL || 'http'}://${process.env
      .HOST || 'api.mercado-futuro.com'}:${process.env.PORT || '3333'}`
  );
});
