const API_URL_USER = '/api/user';
const API_URL_COURSE = '/api/course';
const API_URL_LESSON = '/api/lesson';
const API_URL_CATEGORY = '/api/category';
const API_URL_PLAN = '/api/plan';

const apiKey = import.meta.env.VITE_API_KEY;

export function LOGIN(body) {
  return {
    url: API_URL_USER + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function LOGIN_VALIDATE_TOKEN(token) {
  return {
    url: API_URL_USER + '/token/validate',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'x-api-key': apiKey,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL_USER,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'x-api-key': apiKey,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL_USER + '/register',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_TEMPORARY_POST() {
  return {
    url: API_URL_USER + '/temporary_account',
    options: {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
    },
  };
}

export function FORGOT_PASSWORD_POST(body) {
  return {
    url: API_URL_USER + '/forgot_password',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function RESET_PASSWORD_POST(key, email, body) {
  return {
    url: API_URL_USER + `/reset_password/?key=${key}&email=${email}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_DATA_PATCH(token, id, body) {
  return {
    url: API_URL_USER + `/edit/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_LAST_LESSON_COURSE_PATCH(token, body) {
  return {
    url: API_URL_USER + '/lastcourse',
    options: {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_COURSES_PROGRESS_PATCH(token, body) {
  return {
    url: API_URL_USER + '/coursesprogress',
    options: {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    },
  };
}

export function COURSES_GET(limit = 0) {
  return {
    url: API_URL_COURSE + `?quantity=${limit}`,
    options: {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    },
  };
}

export function LESSONS_BY_URL_COURSE_GET(courseUrl) {
  return {
    url: API_URL_LESSON + '/' + courseUrl,
    options: {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    },
  };
}

export function CATEGORIES_GET() {
  return {
    url: API_URL_CATEGORY,
    options: {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    },
  };
}

export function PLANS_GET() {
  return {
    url: API_URL_PLAN,
    options: {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    },
  };
}
