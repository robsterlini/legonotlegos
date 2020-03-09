const Header = require('./_partials/header.11ty.js');
const Footer = require('./_partials/footer.11ty.js');

module.exports = `<!doctype html>
<html>
<head>
  <title>LEGO not Legos</title>
</head>
  <body>
    ${Header()}
    <main>
      <h1>LEGO not Legos</h1>
    </main>
    ${Footer()}
  </body>
</html>`;
