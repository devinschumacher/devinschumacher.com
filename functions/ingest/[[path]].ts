type PagesContext = {
  request: Request;
  params: {
    path?: string | string[];
  };
};

const POSTHOG_API_ORIGIN = "https://us.i.posthog.com";
const POSTHOG_ASSET_ORIGIN = "https://us-assets.i.posthog.com";

function normalizePath(path: string | string[] | undefined): string {
  if (Array.isArray(path)) {
    return path.join("/");
  }

  return path ?? "";
}

function buildPostHogUrl(request: Request, path: string): URL {
  const requestUrl = new URL(request.url);
  const upstreamOrigin = path.startsWith("static/")
    ? POSTHOG_ASSET_ORIGIN
    : POSTHOG_API_ORIGIN;
  const upstreamUrl = new URL(`/${path}`, upstreamOrigin);

  upstreamUrl.search = requestUrl.search;

  return upstreamUrl;
}

function buildProxyHeaders(request: Request): Headers {
  const headers = new Headers(request.headers);

  headers.delete("host");

  return headers;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const path = normalizePath(context.params.path);
  const upstreamUrl = buildPostHogUrl(context.request, path);
  const method = context.request.method.toUpperCase();

  return fetch(upstreamUrl, {
    method,
    headers: buildProxyHeaders(context.request),
    body: method === "GET" || method === "HEAD" ? undefined : context.request.body,
    redirect: "manual",
  });
}
