import 'whatwg-fetch';

const post = (url: string, data: {}) => (
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json();
    } else {
      return response.json().then(error => { throw error; });
    }
  })
);

export default {
  post,
};
