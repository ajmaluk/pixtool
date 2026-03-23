const BASE_URL = 'https://www.pixtool.in';

const CHECKS = [
  {
    name: 'Admin route protection',
    url: `${BASE_URL}/pix-admin`,
    required: ['x-robots-tag', 'x-frame-options', 'cache-control', 'x-content-type-options'],
  },
  {
    name: 'Home page baseline security',
    url: `${BASE_URL}/`,
    required: ['x-content-type-options', 'cache-control'],
  },
  {
    name: 'Static asset caching',
    url: `${BASE_URL}/`,
    required: ['cache-control'],
    dynamicAssetCheck: true,
  },
];

const STATIC_FILE_CHECKS = [
  {
    name: 'Sitemap availability',
    url: `${BASE_URL}/sitemap.xml`,
    expectedStatus: 200,
    expectedContentType: 'application/xml',
  },
  {
    name: 'Robots availability',
    url: `${BASE_URL}/robots.txt`,
    expectedStatus: 200,
    expectedContentType: 'text/plain',
  },
  {
    name: 'Security.txt availability',
    url: `${BASE_URL}/.well-known/security.txt`,
    expectedStatus: 200,
    expectedContentType: 'text/plain',
  },
];

async function head(url) {
  const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
  return response;
}

async function run() {
  let hasErrors = false;

  console.log('Checking live deployment headers...\n');

  for (const check of CHECKS) {
    console.log(`Test: ${check.name}`);
    console.log(`URL : ${check.url}`);

    try {
      const response = await head(check.url);
      console.log(`HTTP: ${response.status}`);

      for (const header of check.required) {
        const value = response.headers.get(header);
        if (value) {
          console.log(`  OK  ${header}: ${value}`);
        } else {
          const msg = `  MISS ${header}`;
          if (check.allowFailure) {
            console.warn(msg);
          } else {
            console.error(msg);
            hasErrors = true;
          }
        }
      }

      if (check.dynamicAssetCheck) {
        const homeRes = await fetch(`${BASE_URL}/`, { method: 'GET' });
        const html = await homeRes.text();
        const match = html.match(/\/assets\/[^"']+\.(?:js|css)/i);
        if (!match) {
          console.error('  MISS dynamic asset path in home HTML');
          hasErrors = true;
        } else {
          const assetPath = match[0].startsWith('/') ? match[0] : `/${match[0]}`;
          const assetUrl = `${BASE_URL}${assetPath}`;
          const assetHead = await head(assetUrl);
          const cacheControl = assetHead.headers.get('cache-control') || '';
          console.log(`  Asset: ${assetUrl}`);
          if (/immutable/i.test(cacheControl)) {
            console.log(`  OK  asset cache-control: ${cacheControl}`);
          } else {
            console.error(`  MISS immutable cache-control on asset: ${cacheControl || '(empty)'}`);
            hasErrors = true;
          }
        }
      }
    } catch (error) {
      console.error(`  ERROR request failed: ${error.message}`);
      if (!check.allowFailure) {
        hasErrors = true;
      }
    }

    console.log('');
  }

  console.log('Checking static files...\n');

  for (const check of STATIC_FILE_CHECKS) {
    console.log(`Test: ${check.name}`);
    console.log(`URL : ${check.url}`);

    try {
      const response = await fetch(check.url, { method: 'GET', redirect: 'manual' });
      const contentType = response.headers.get('content-type') || '';

      if (response.status === check.expectedStatus) {
        console.log(`  OK  status: ${response.status}`);
      } else {
        console.error(`  MISS status: ${response.status} (expected ${check.expectedStatus})`);
        hasErrors = true;
      }

      if (contentType.toLowerCase().includes(check.expectedContentType.toLowerCase())) {
        console.log(`  OK  content-type: ${contentType}`);
      } else {
        console.error(`  MISS content-type: ${contentType || '(empty)'} (expected includes ${check.expectedContentType})`);
        hasErrors = true;
      }
    } catch (error) {
      console.error(`  ERROR request failed: ${error.message}`);
      hasErrors = true;
    }

    console.log('');
  }

  if (hasErrors) {
    console.error('Live deployment checks failed.');
    process.exit(1);
  }

  console.log('Live deployment checks passed.');
}

run().catch((error) => {
  console.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});
