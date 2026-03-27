const http = require('http');

http.get('http://localhost:3000/api/search', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode === 500) {
      console.log('Result body:');
      console.log(data.substring(0, 1000));
    } else {
      console.log('Success!', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
