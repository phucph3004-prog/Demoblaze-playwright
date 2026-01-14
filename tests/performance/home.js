import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '20s',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1200'],
  },
};

const BASE = __ENV.BASE_URL || 'https://api.demoblaze.com';

export default function () {
  const res = http.get(`${BASE}/entries`);

  check(res, {
    'status is 200': (res) => res.status === 200,
    'has products': (res) => {
      try {
        const body = JSON.parse(res.body);
        return Array.isArray(body.Items) && body.Items.length > 0;
      } catch(e) {
        return false;
      }
    },
  });

  sleep(1);
}